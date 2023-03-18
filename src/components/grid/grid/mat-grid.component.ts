import {
  debounceFrame$$,
  distinct$$,
  fromMutationObserver,
  interval,
  IObservable,
  map$$,
  merge,
  single,
  switchMap$$,
  toString$$,
} from '@lirx/core';
import { compileReactiveHTMLAsComponentTemplate, compileStyleAsComponentStyle, createComponent, VirtualCustomElementNode } from '@lirx/dom';
import { ISetStylePropertyOrStringOrNull } from '@lirx/dom/src/virtual-node/dom/nodes/static/element/style/style-property.type';
import { INullish, isNullish } from '@lirx/utils';
import { getBoxFromMatGridItemList } from '../grid-item/helpers/get-box-from-mat-grid-item-list';
import { IMatGridItemPosition } from '../grid-item/helpers/mat-grid-item-position.type';

// @ts-ignore
import html from './mat-grid.component.html?raw';
// @ts-ignore
import style from './mat-grid.component.scss?inline';

/**
 * COMPONENT: 'mat-grid'
 */

export type IMatGridColumns =
  | number
  | INullish
  ;

export type IMatGridRows =
  | number
  | INullish
  | 'auto'
  ;

interface IMatGridComponentConfig {
  element: HTMLElement;
  inputs: [
    ['columns', IMatGridColumns],
    ['rows', IMatGridRows],
  ],
}

export const MatGridComponent = createComponent<IMatGridComponentConfig>({
  name: 'mat-grid',
  template: compileReactiveHTMLAsComponentTemplate({
    html,
  }),
  styles: [compileStyleAsComponentStyle(style)],
  inputs: [
    ['columns', void 0],
    ['rows', 'auto'],
  ],
  init: (node: VirtualCustomElementNode<IMatGridComponentConfig>): void => {

    /* COLUMNS */

    const columns$ = node.inputs.get$('columns');

    const _columns$ = map$$(columns$, (columns: number | INullish): ISetStylePropertyOrStringOrNull => {
      return isNullish(columns)
        ? null
        : String(columns);
    });

    node.setReactiveStyleProperty('--mat-grid-columns', _columns$);

    /* ROWS */

    const rows$ = node.inputs.get$('rows');

    const childrenChange$ = debounceFrame$$(
      merge([
        single(void 0),
        fromMutationObserver(node.elementNode, {
          childList: true,
        }),
      ]),
    );

    const positionMayHaveChanged$ = debounceFrame$$(
      switchMap$$(childrenChange$, () => {
        return merge([
          single(void 0),
          interval(2000),
          ...Array.from(node.elementNode.children, (childElement: Element): IObservable<any> => {
            return fromMutationObserver(childElement, {
              attributes: true,
              attributeFilter: ['style'],
            });
          }),
        ]);
      }),
    );

    const box$ = map$$(positionMayHaveChanged$, (): IMatGridItemPosition => {
      return getBoxFromMatGridItemList(node.elementNode.children as unknown as ArrayLike<HTMLElement>);
    });

    const automaticComputedRows$ = map$$(box$, ([, top, , height]): number => {
      return top + height;
    });

    const _rows$ = distinct$$(
      switchMap$$(rows$, (rows: IMatGridRows): IObservable<ISetStylePropertyOrStringOrNull> => {
        if (rows === 'auto') {
          return toString$$(automaticComputedRows$);
        } else {
          return single(
            isNullish(rows)
              ? null
              : String(rows),
          );
        }
      }),
    );

    node.setReactiveStyleProperty('--mat-grid-rows', _rows$);
  },
});
