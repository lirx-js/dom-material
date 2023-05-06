import { IObservableLike } from '@lirx/core';
import {
  compileStyleAsComponentStyle,
  createVirtualReactiveElementNodeModifier,
  IGenericVirtualReactiveElementNode,
  VirtualDOMNode,
} from '@lirx/dom';
import { IMatButtonOptions, matButtonModifierFunction } from '../mat-button/mat-button.modifier';

// @ts-ignore
import style from './mat-icon-button.component.scss?inline';

const componentStyle = compileStyleAsComponentStyle(style);

export interface IMatIconButtonOptions extends IMatButtonOptions {
}

export function matIconButtonModifierFunction(
  node: IGenericVirtualReactiveElementNode,
  options?: IObservableLike<IMatIconButtonOptions>,
): VirtualDOMNode {
  matButtonModifierFunction(node, options);

  node.setClass('mat-icon-button', true);

  componentStyle(node);

  return node;
}

export const MatIconButtonModifier = createVirtualReactiveElementNodeModifier<IMatIconButtonOptions | undefined, VirtualDOMNode>('mat-icon-button', matIconButtonModifierFunction);


