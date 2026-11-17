import { IObserver } from '@lirx/core';
import {
  IGenericVirtualReactiveElementNode,
  VirtualDOMNode,
  VirtualDOMNodeModifier,
  VirtualReactiveElementNodeModifier,
} from '@lirx/dom';

export const NodeReferenceModifier = new VirtualDOMNodeModifier(
  'ref',
  (node: VirtualDOMNode, $destination: IObserver<VirtualDOMNode>): void => {
    $destination(node);
  },
);

export const ElementReferenceModifier = new VirtualReactiveElementNodeModifier(
  'refe',
  (node: IGenericVirtualReactiveElementNode, $destination: IObserver<Element>): void => {
    $destination(node.elementNode);
  },
);
