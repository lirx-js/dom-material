import { $$map, ISource } from '@lirx/core';
import {
  VirtualDOMNode,
  VirtualReactiveElementNode,
  VirtualReactiveElementNodeModifier,
} from '@lirx/dom';

/**
 * @deprecated
 */
export const INPUT_VALUE_MODIFIER = new VirtualReactiveElementNodeModifier(
  'input-value',
  (node: VirtualDOMNode, { emit, subscribe }: ISource<string>): void => {
    if (
      node instanceof VirtualReactiveElementNode &&
      node.elementNode instanceof HTMLInputElement
    ) {
      node.on$('input')($$map(emit, () => node.elementNode.value));
      node.setReactiveProperty('value', subscribe);
    } else {
      throw new Error(`Not an input element`);
    }
  },
);
