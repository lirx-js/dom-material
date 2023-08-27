import {
  combineLatestSpread,
  createUnicastReplayLastSource,
  debounceMicrotask$$,
  IObservable,
  IObserver,
  map$$,
  switchMap$$,
  take$$,
} from '@lirx/core';
import {
  compileReactiveHTMLAsComponentTemplate,
  compileStyleAsComponentStyle,
  VirtualComponentNode,
  Input,
  Output,
  Component,
  input,
  output,
} from '@lirx/dom';
import {
  MatFloatingContentComponent,
} from './fragments/mat-floating-container/fragments/mat-floating-content/mat-floating-content.component';
import {
  IMatFloatingContainerComponentCloseType,
  MatFloatingContainerComponent,
} from './fragments/mat-floating-container/mat-floating-container.component';
import { createFloatingElementObservable, IFloatingElementPosition } from '../functions/create-floating-element-observable';
import { IUnsubscribe } from '@lirx/unsubscribe';
import { IMatFloatingReference } from './types/mat-floating-reference.type';
import { IMatFloatingOptions } from './types/options/mat-floating-options.type';
import { IMatFloatingCloseType } from './types/mat-floating-close-type.type';
import { setMatFloatingPosition } from '../functions/set-mat-floating-position';
import { ElementReferenceModifier } from '../../../../modifiers/node-reference.modifier';
import {
  IHavingMatOverlayInput,
  matOverlayInput,
  getMatOverlayInput,
} from '../../shared/instance/for-component/mat-overlay-input/mat-overlay-input';
import { IVirtualComponentMatOverlayInput } from '../../shared/instance/for-component/types/virtual-component-mat-overlay.type';

// @ts-ignore
import html from './mat-floating.component.html?raw';
// @ts-ignore
import style from './mat-floating.component.scss?inline';

/**
 * COMPONENT: 'mat-floating'
 */

export interface IMatFloatingComponentData extends IHavingMatOverlayInput<HTMLElement, IMatFloatingComponentData> {
  readonly reference: Input<IMatFloatingReference>;
  readonly options: Input<IMatFloatingOptions | undefined>;
  readonly close: Output<IMatFloatingCloseType>;
}

interface ITemplateData {
  readonly $onMatFloatingContainerClose: IObserver<IMatFloatingContainerComponentCloseType>;
  readonly $matFloatingContentElement: IObserver<HTMLElement>;
  readonly matOverlayReady$: IObservable<boolean>;
  readonly getMatOverlay: () => IVirtualComponentMatOverlayInput<HTMLElement, IMatFloatingComponentData>;
  // readonly matOverlay$: IObservable<IVirtualComponentMatOverlayInput<HTMLElement, IMatFloatingComponentData>>;
}

export type IMatFloatingVirtualComponentNode = VirtualComponentNode<HTMLElement, IMatFloatingComponentData>;

export const MatFloatingComponent = new Component<HTMLElement, IMatFloatingComponentData, ITemplateData>({
  name: 'mat-floating',
  template: compileReactiveHTMLAsComponentTemplate({
    html,
    components: [
      MatFloatingContainerComponent,
      MatFloatingContentComponent,
    ],
    modifiers: [
      ElementReferenceModifier,
    ],
  }),
  styles: [compileStyleAsComponentStyle(style)],
  componentData: (): IMatFloatingComponentData => {
    return {
      ...matOverlayInput(),
      reference: input<IMatFloatingReference>(),
      options: input<IMatFloatingOptions | undefined>(void 0),
      close: output<IMatFloatingCloseType>(),
    };
  },
  templateData: (node: IMatFloatingVirtualComponentNode): ITemplateData => {
    // INPUTS
    const reference$ = node.input$('reference');
    const options$ = node.input$('options');
    const matOverlay$ = getMatOverlayInput(node).subscribe;

    // OUTPUTS
    const $close = node.$output('close');

    // CLOSE
    const $onMatFloatingContainerClose = $close;

    // POSITION

    const {
      emit: $matFloatingContentElement,
      subscribe: matFloatingContentElement$,
    } = createUnicastReplayLastSource<HTMLElement>();

    const position$ = switchMap$$(
      debounceMicrotask$$(combineLatestSpread(reference$, matFloatingContentElement$, options$)),
      ([reference, matFloatingContentElement, options]): IObservable<IFloatingElementPosition> => {
        return createFloatingElementObservable(reference, matFloatingContentElement, options);
      },
    );

    node.onConnected((): IUnsubscribe => {
      return position$(({ x, y, floating, placement }: IFloatingElementPosition): void => {
        setMatFloatingPosition({
          element: floating,
          x,
          y,
          placement,
        });
      });
    });

    // MAT OVERLAY

    const matOverlayReady$ = take$$(map$$(matOverlay$, () => true), 1);

    const getMatOverlay = (): IVirtualComponentMatOverlayInput<HTMLElement, IMatFloatingComponentData> => {
      return getMatOverlayInput(node).value;
    };

    return {
      $onMatFloatingContainerClose,
      $matFloatingContentElement,
      matOverlayReady$,
      getMatOverlay,
    };
  },
});

