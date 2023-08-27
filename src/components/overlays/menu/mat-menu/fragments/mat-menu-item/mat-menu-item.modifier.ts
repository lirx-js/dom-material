import { IObservableLike } from '@lirx/core';
import {
  compileStyleAsComponentStyle,
  createVirtualReactiveElementNodeModifier,
  IGenericVirtualReactiveElementNode,
  VirtualDOMNode,
} from '@lirx/dom';

// @ts-ignore
import style from './mat-menu-item.component.scss?inline';
import { matButtonModifierFunction } from '../../../../../buttons/mat-button/mat-button.modifier';

const componentStyle = compileStyleAsComponentStyle(style);

export interface IMatMenuItemOptions {
}

export function matMenuItemModifierFunction(
  node: IGenericVirtualReactiveElementNode,
  options?: IObservableLike<IMatMenuItemOptions>,
): VirtualDOMNode {
  matButtonModifierFunction(node);

  node.setClass('mat-menu-item', true);

  componentStyle(node);

  return node;
}

export const MatMenuItemModifier = createVirtualReactiveElementNodeModifier<IMatMenuItemOptions | undefined, VirtualDOMNode>('mat-menu-item', matMenuItemModifierFunction);


