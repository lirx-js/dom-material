import { IObservableLike, mapDistinct$$, unknownToObservableNotUndefined } from '@lirx/core';
import { IGenericVirtualReactiveElementNode, VirtualReactiveElementNodeModifier } from '@lirx/dom';
import { IMatGridItemPosition } from './helpers/mat-grid-item-position.type';

export const MatGridItemModifier = new VirtualReactiveElementNodeModifier(
  'mat-grid-item',
  (
    node: IGenericVirtualReactiveElementNode,
    position: IObservableLike<IMatGridItemPosition>,
  ): void => {
    const position$ = unknownToObservableNotUndefined(position);

    const left$ = mapDistinct$$(position$, ([left]) => String(left));
    const top$ = mapDistinct$$(position$, ([, top]) => String(top));
    const width$ = mapDistinct$$(position$, ([, , width]) => String(width));
    const height$ = mapDistinct$$(position$, ([, , , height]) => String(height));

    node.setReactiveStyleProperty('--mat-grid-item-left', left$);
    node.setReactiveStyleProperty('--mat-grid-item-top', top$);
    node.setReactiveStyleProperty('--mat-grid-item-width', width$);
    node.setReactiveStyleProperty('--mat-grid-item-height', height$);
  },
);
