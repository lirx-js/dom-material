import {
  compileStyleAsComponentStyle,
  createVirtualReactiveElementNodeModifier,
  IGenericVirtualReactiveElementNode,
  VirtualDOMNode,
} from '@lirx/dom';
import { IMatButtonOptions, matButtonModifierFunction } from '../../../mat-button.modifier';

// @ts-ignore
import style from './mat-flat-button-secondary.component.scss?inline';

const componentStyle = compileStyleAsComponentStyle(style);

export interface IMatFlatButtonSecondaryOptions extends IMatButtonOptions {
}

export function matFlatButtonSecondaryModifierFunction(
  node: IGenericVirtualReactiveElementNode,
  {}: IMatFlatButtonSecondaryOptions = {},
): VirtualDOMNode {
  matButtonModifierFunction(node);

  node.setClass('mat-flat-button-secondary', true);

  componentStyle(node);

  return node;
}

export const MatFlatButtonSecondaryModifier = createVirtualReactiveElementNodeModifier<IMatFlatButtonSecondaryOptions | undefined, VirtualDOMNode>('mat-flat-button-secondary', matFlatButtonSecondaryModifierFunction);


