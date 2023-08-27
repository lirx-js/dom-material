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
import {
  compileStyleAsComponentStyle,
  INJECT_CONTENT_TEMPLATE,
  ISetStylePropertyOrStringOrNull,
  VirtualComponentNode,
  Component,
  Input,
  input,
} from '@lirx/dom';
import { INullish, isNullish } from '@lirx/utils';
import { getBoxFromMatGridItemList } from './fragments/mat-grid-item/helpers/get-box-from-mat-grid-item-list';
import { IMatGridItemPosition } from './fragments/mat-grid-item/helpers/mat-grid-item-position.type';

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

export interface IMatGridComponentData {
  readonly columns: Input<IMatGridColumns>;
  readonly rows: Input<IMatGridRows>;
}

export const MatGridComponent = new Component<HTMLElement, IMatGridComponentData, object>({
  name: 'mat-grid',
  template: INJECT_CONTENT_TEMPLATE,
  styles: [compileStyleAsComponentStyle(style)],
  componentData: (): IMatGridComponentData => {
    return {
      columns: input<IMatGridColumns>(void 0),
      rows: input<IMatGridRows>('auto'),
    };
  },
  templateData: (node: VirtualComponentNode<HTMLElement, IMatGridComponentData>): void => {

    /* COLUMNS */

    const columns$ = node.input$('columns');

    const _columns$ = map$$(columns$, (columns: number | INullish): ISetStylePropertyOrStringOrNull => {
      return isNullish(columns)
        ? null
        : String(columns);
    });

    node.setReactiveStyleProperty('--mat-grid-columns', _columns$);

    /* ROWS */

    const rows$ = node.input$('rows');

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
