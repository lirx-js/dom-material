import { IObservableLike } from '@lirx/core';
import {
  compileStyleAsComponentStyle,
  createVirtualReactiveElementNodeModifier,
  IGenericVirtualReactiveElementNode,
  VirtualDOMNode,
} from '@lirx/dom';
import { matRippleModifierFunction } from '../mat-ripple/mat-ripple.modifier';

// @ts-ignore
import style from './mat-button.component.scss?inline';

const componentStyle = compileStyleAsComponentStyle(style);

export interface IMatButtonOptions {
}

export function matButtonModifierFunction(
  node: IGenericVirtualReactiveElementNode,
  options?: IObservableLike<IMatButtonOptions>,
): VirtualDOMNode {
  matRippleModifierFunction(node);

  node.setClass('mat-button', true);

  componentStyle(node);

  return node;
}

export const MatButtonModifier = createVirtualReactiveElementNodeModifier<IMatButtonOptions | undefined, VirtualDOMNode>('mat-button', matButtonModifierFunction);


