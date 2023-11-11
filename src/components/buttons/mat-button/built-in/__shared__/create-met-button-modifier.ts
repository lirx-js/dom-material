import {
  createVirtualReactiveElementNodeModifier,
  IGenericVirtualReactiveElementNode,
  VirtualDOMNode,
  IComponentStyle,
  IVirtualDOMNodeModifier,
} from '@lirx/dom';
import { IMatButtonOptions, matButtonModifierFunction } from '../../mat-button.modifier';

export interface IMatButtonModifierOptions extends IMatButtonOptions {
}

export function createMatButtonModifier(
  name: string,
  componentStyle: IComponentStyle,
): IVirtualDOMNodeModifier<IMatButtonModifierOptions | undefined, VirtualDOMNode> {
  return createVirtualReactiveElementNodeModifier<IMatButtonModifierOptions | undefined, VirtualDOMNode>(name, (
    node: IGenericVirtualReactiveElementNode,
    {}: IMatButtonOptions = {},
  ): VirtualDOMNode => {
    matButtonModifierFunction(node);

    node.setClass(name, true);

    componentStyle(node);

    return node;
  });
}

