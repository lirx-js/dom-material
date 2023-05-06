import { IObservableLike, map$$, mapObservableToObserver, toObservable } from '@lirx/core';
import {
  createVirtualReactiveElementNodeModifier,
  IGenericVirtualElementNode, IGenericVirtualReactiveElementNode,
  VirtualDOMNode,
  VirtualReactiveElementNode,
} from '@lirx/dom';

export interface IMatClickableOnClickFunction {
  (
    event: MouseEvent,
  ): void;
}

export interface IMatClickableOptions {
  readonly href?: string;
  readonly onClick?: IMatClickableOnClickFunction;
}

export function matClickableModifierFunction(
  node: IGenericVirtualReactiveElementNode,
  options?: IObservableLike<IMatClickableOptions>,
): VirtualDOMNode {
  const options$ = toObservable(options);

  const element: Element = node.elementNode;

  node.setClass('mat-clickable', true);

  /* HREF */

  if (element instanceof HTMLAnchorElement) {
    const href$ = map$$(options$, (options: IMatClickableOptions | undefined): string | undefined => {
      return options?.href;
    });

    node.onConnected$(href$)((href: string | undefined): void => {
      element.href = href ?? '';
    });
  }

  /* ONCLICK */

  const onClick$ = map$$(options$, (options: IMatClickableOptions | undefined): IMatClickableOnClickFunction | undefined => {
    return options?.onClick;
  });

  const [onClick] = mapObservableToObserver(node.onConnected$(onClick$), (onClick: IMatClickableOnClickFunction | undefined): IMatClickableOnClickFunction => {
    return onClick ?? (() => {
    });
  });

  node.on$<MouseEvent>('click')(onClick);

  return node;
}

export const MatClickableModifier = createVirtualReactiveElementNodeModifier<IMatClickableOptions | undefined, VirtualDOMNode>('mat-clickable', matClickableModifierFunction);


