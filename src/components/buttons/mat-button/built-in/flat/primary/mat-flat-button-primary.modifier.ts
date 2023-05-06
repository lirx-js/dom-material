import {
  compileStyleAsComponentStyle,
  createVirtualReactiveElementNodeModifier,
  IGenericVirtualReactiveElementNode,
  VirtualDOMNode,
} from '@lirx/dom';
import { IMatButtonOptions, matButtonModifierFunction } from '../../../mat-button.modifier';

// @ts-ignore
import style from './mat-flat-button-primary.component.scss?inline';

const componentStyle = compileStyleAsComponentStyle(style);

export interface IMatFlatButtonPrimaryOptions extends IMatButtonOptions {
}

export function matFlatButtonPrimaryModifierFunction(
  node: IGenericVirtualReactiveElementNode,
  {}: IMatFlatButtonPrimaryOptions = {},
): VirtualDOMNode {
  matButtonModifierFunction(node);

  node.setClass('mat-flat-button-primary', true);

  componentStyle(node);

  return node;
}

export const MatFlatButtonPrimaryModifier = createVirtualReactiveElementNodeModifier<IMatFlatButtonPrimaryOptions | undefined, VirtualDOMNode>('mat-flat-button-primary', matFlatButtonPrimaryModifierFunction);


