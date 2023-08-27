import { IObservableLike, map$$, IObservable, unknownToObservableAny } from '@lirx/core';
import {
  compileStyleAsComponentStyle,
  createVirtualReactiveElementNodeModifier,
  IGenericVirtualReactiveElementNode,
  VirtualDOMNode,
} from '@lirx/dom';

// @ts-ignore
import style from './mat-badge.component.scss?inline';

const componentStyle = compileStyleAsComponentStyle(style);

export type IMatBadgeContent =
  | string
  | number
  ;

export function matBadgeContentToString(
  content: IMatBadgeContent,
): string {
  return (typeof content === 'number')
    ? content.toString(10)
    : content;
}

export interface IMatBadgeOptions {
  content: IMatBadgeContent;
  // dot?: boolean;
}

export type IMatBadgeParam =
  | IMatBadgeContent
  | IMatBadgeOptions
  ;

export function matBadgeParamToContent(
  params: IMatBadgeParam | undefined = '',
): string {
  return (typeof params === 'object')
    ? matBadgeContentToString(params.content)
    : matBadgeContentToString(params);
}

export function matBadgeModifierFunction(
  node: IGenericVirtualReactiveElementNode,
  params?: IObservableLike<IMatBadgeParam>,
): VirtualDOMNode {
  const params$ = unknownToObservableAny(params) as IObservable<IMatBadgeParam | undefined>;

  const content$ = map$$(params$, matBadgeParamToContent);

  const matBadContentCssVariable$ = map$$(content$, _ => JSON.stringify(_));

  node.setReactiveStyleProperty('--mat-badge-content', matBadContentCssVariable$);

  node.setClass('mat-badge', true);

  componentStyle(node);

  return node;
}

export const MatBadgeModifier = createVirtualReactiveElementNodeModifier<IMatBadgeOptions | undefined, VirtualDOMNode>('mat-badge', matBadgeModifierFunction);


