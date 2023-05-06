import {
  compileStyleAsComponentStyle,
  createVirtualReactiveElementNodeModifier,
  IGenericVirtualReactiveElementNode,
  VirtualDOMNode,
} from '@lirx/dom';
import { IMatButtonOptions, matButtonModifierFunction } from '../../../mat-button.modifier';

// @ts-ignore
import style from './mat-basic-button-secondary.component.scss?inline';

const componentStyle = compileStyleAsComponentStyle(style);

export interface IMatBasicButtonSecondaryOptions extends IMatButtonOptions {
}

export function matBasicButtonSecondaryModifierFunction(
  node: IGenericVirtualReactiveElementNode,
  {}: IMatBasicButtonSecondaryOptions = {},
): VirtualDOMNode {
  matButtonModifierFunction(node);

  node.setClass('mat-basic-button-secondary', true);

  componentStyle(node);

  return node;
}

export const MatBasicButtonSecondaryModifier = createVirtualReactiveElementNodeModifier<IMatBasicButtonSecondaryOptions | undefined, VirtualDOMNode>('mat-basic-button-secondary', matBasicButtonSecondaryModifierFunction);


