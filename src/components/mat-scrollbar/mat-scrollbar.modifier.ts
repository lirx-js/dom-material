import { IObservableLike } from '@lirx/core';
import {
  compileStyleAsComponentStyle,
  createVirtualReactiveElementNodeModifier,
  IGenericVirtualReactiveElementNode,
  VirtualDOMNode,
} from '@lirx/dom';

// @ts-ignore
import style from './mat-scrollbar.component.scss?inline';

const componentStyle = compileStyleAsComponentStyle(style);

export interface IMatScrollbarOptions {
}

export function matScrollbarModifierFunction(
  node: IGenericVirtualReactiveElementNode,
  options?: IObservableLike<IMatScrollbarOptions>,
): VirtualDOMNode {
  node.setClass('mat-scrollbar', true);

  componentStyle(node);

  return node;
}

export const MatScrollbarModifier = createVirtualReactiveElementNodeModifier<IMatScrollbarOptions | undefined, VirtualDOMNode>('mat-scrollbar', matScrollbarModifierFunction);


