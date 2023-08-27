import { isElementNode } from '@lirx/dom';

export function getBoundingClientRect(
  node: Node,
): DOMRect {
  if (isElementNode(node)) {
    if (getComputedStyle(node).display === 'contents') {
      const range = new Range();
      range.selectNodeContents(node);
      return range.getBoundingClientRect();
    } else {
      return node.getBoundingClientRect();
    }
  } else {
    const range = new Range();
    range.selectNode(node);
    return range.getBoundingClientRect();
  }
}
