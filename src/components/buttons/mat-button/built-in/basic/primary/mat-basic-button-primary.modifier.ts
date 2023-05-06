import {
  compileStyleAsComponentStyle,
  createVirtualReactiveElementNodeModifier,
  IGenericVirtualReactiveElementNode,
  VirtualDOMNode,
} from '@lirx/dom';
import { IMatButtonOptions, matButtonModifierFunction } from '../../../mat-button.modifier';

// @ts-ignore
import style from './mat-basic-button-primary.component.scss?inline';

const componentStyle = compileStyleAsComponentStyle(style);

export interface IMatBasicButtonPrimaryOptions extends IMatButtonOptions {
}

export function matBasicButtonPrimaryModifierFunction(
  node: IGenericVirtualReactiveElementNode,
  {}: IMatBasicButtonPrimaryOptions = {},
): VirtualDOMNode {
  matButtonModifierFunction(node);

  node.setClass('mat-basic-button-primary', true);

  componentStyle(node);

  return node;
}

export const MatBasicButtonPrimaryModifier = createVirtualReactiveElementNodeModifier<IMatBasicButtonPrimaryOptions | undefined, VirtualDOMNode>('mat-basic-button-primary', matBasicButtonPrimaryModifierFunction);


