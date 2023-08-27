import { conditional$$, fromEventTarget, IObservableLike, map$$, IObservable, unknownToObservableAny } from '@lirx/core';
import {
  compileStyleAsComponentStyle,
  createVirtualReactiveElementNodeModifier,
  getElementCSSVariableValueOrDefault,
  IGenericVirtualReactiveElementNode,
  IStyleProperty,
  VirtualDOMNode,
  VirtualReactiveElementNode,
} from '@lirx/dom';
import { createRippleFromElementAndPointerEvent } from './functions/create-ripple-from-element-and-pointer-event';

// @ts-ignore
import style from './mat-ripple.component.scss?inline';

const componentStyle = compileStyleAsComponentStyle(style);

export interface IMatRippleOptions {
  enabled?: boolean;
}

export function matRippleModifierFunction(
  node: IGenericVirtualReactiveElementNode,
  options?: IObservableLike<IMatRippleOptions>,
): VirtualDOMNode {
  const options$ = unknownToObservableAny(options) as IObservable<IMatRippleOptions | undefined>;

  const element: HTMLElement = node.elementNode as HTMLElement;

  node.setClass('mat-ripple', true);

  componentStyle(node);

  const ripplesContainer = VirtualReactiveElementNode.createHTML<HTMLSpanElement>('span');
  ripplesContainer.setAttribute('class', 'mat-ripples-container');
  const ripplesContainerElement: HTMLElement = ripplesContainer.elementNode;

  let computedStylePosition!: IStyleProperty;
  let stylePosition!: IStyleProperty;

  const onPointerDown = (event: PointerEvent): void => {
    const isDisabled: boolean = node.getProperty('disabled' as any) ?? false;

    if ((event.button === 0) && !isDisabled) {
      ripplesContainer.attach(node);

      if (ripplesContainerElement.childElementCount === 0) {
        computedStylePosition = node.getStyleProperty('position', { computed: true });

        if (computedStylePosition.value === 'static') {
          stylePosition = node.getStyleProperty('position');
          node.setStyleProperty('position', 'relative');
        }
      }

      const color: string = getElementCSSVariableValueOrDefault(element, '--mat-ripple-color', 'rgb(0 0 0 / 0.1)');
      const openDuration: number = Number(getElementCSSVariableValueOrDefault(element, '--mat-ripple-open-duration', '200'));
      const closeDuration: number = Number(getElementCSSVariableValueOrDefault(element, '--mat-ripple-close-duration', '200'));

      const {
        element: rippleElement,
        open,
        close,
      } = createRippleFromElementAndPointerEvent({
        element,
        event,
        color,
        openDuration,
        closeDuration,
      });

      ripplesContainerElement.appendChild(rippleElement);

      const unsubscribePointerUp = pointerUp$(() => {
        unsubscribePointerUp();
        openPromise.then(() => {
          return close()
            .then(() => {
              rippleElement.remove();

              if (ripplesContainerElement.childElementCount === 0) {
                ripplesContainer.detach();

                if (computedStylePosition.value === 'static') {
                  node.setStyleProperty('position', stylePosition);
                }
              }
            });
        });
      });

      const openPromise = open();
    }
  };

  const enabled$ = map$$(options$, (options: IMatRippleOptions | undefined): boolean => {
    return options?.enabled ?? true;
  });

  const pointerDown$ = conditional$$(
    fromEventTarget<'pointerdown', PointerEvent>(element, 'pointerdown'),
    enabled$,
  );

  const pointerUp$ = fromEventTarget(window, 'pointerup');

  pointerDown$(onPointerDown);

  return node;
}

export const MatRippleModifier = createVirtualReactiveElementNodeModifier<IMatRippleOptions | undefined, VirtualDOMNode>('mat-ripple', matRippleModifierFunction);


