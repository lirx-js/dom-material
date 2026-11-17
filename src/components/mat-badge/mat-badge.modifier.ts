import { IObservable, IObservableLike, map$$, unknownToObservableAny } from '@lirx/core';
import {
  IComponentStyle,
  IGenericVirtualReactiveElementNode,
  VirtualReactiveElementNodeModifier,
  compileStyleAsComponentStyle,
} from '@lirx/dom';

// @ts-ignore
import style from './mat-badge.component.scss?inline';

const componentStyle: IComponentStyle = compileStyleAsComponentStyle(style);

export type IMatBadgeContent = string | number;

export function matBadgeContentToString(content: IMatBadgeContent): string {
  return typeof content === 'number' ? content.toString(10) : content;
}

export interface IMatBadgeOptions {
  readonly content: IMatBadgeContent;
  // readonly dot?: boolean;
}

export type IMatBadgeParam = IMatBadgeContent | IMatBadgeOptions;

export function matBadgeParamToContent(params: IMatBadgeParam | undefined = ''): string {
  return typeof params === 'object'
    ? matBadgeContentToString(params.content)
    : matBadgeContentToString(params);
}

export const MatBadgeModifier = new VirtualReactiveElementNodeModifier(
  'mat-badge',
  (node: IGenericVirtualReactiveElementNode, params?: IObservableLike<IMatBadgeParam>): void => {
    const params$ = unknownToObservableAny(params) as IObservable<IMatBadgeParam | undefined>;

    const content$ = map$$(params$, matBadgeParamToContent);

    const matBadContentCssVariable$ = map$$(content$, (_) => JSON.stringify(_));

    node.setReactiveStyleProperty('--mat-badge-content', matBadContentCssVariable$);

    node.setClass('mat-badge', true);

    componentStyle(node);
  },
);
