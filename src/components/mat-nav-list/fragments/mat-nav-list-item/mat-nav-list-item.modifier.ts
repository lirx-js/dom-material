import { IObservableLike } from '@lirx/core';
import {
  compileStyleAsComponentStyle,
  createVirtualReactiveElementNodeModifier,
  IGenericVirtualReactiveElementNode,
  VirtualDOMNode,
} from '@lirx/dom';
import { matButtonModifierFunction } from '../../../buttons/mat-button/mat-button.modifier';

// @ts-ignore
import style from './mat-nav-list-item.component.scss?inline';

const componentStyle = compileStyleAsComponentStyle(style);

export interface IMatNavListItemOptions {
}

export function matNavListItemModifierFunction(
  node: IGenericVirtualReactiveElementNode,
  options?: IObservableLike<IMatNavListItemOptions>,
): VirtualDOMNode {
  matButtonModifierFunction(node);

  node.setClass('mat-nav-list-item', true);

  componentStyle(node);

  return node;
}

export const MatNavListItemModifier = createVirtualReactiveElementNodeModifier<IMatNavListItemOptions | undefined, VirtualDOMNode>('mat-nav-list-item', matNavListItemModifierFunction);


