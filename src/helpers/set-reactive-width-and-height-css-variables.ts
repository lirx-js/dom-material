import { fromResizeObserver, map$$, shareRL$$ } from '@lirx/core';
import { IGenericVirtualReactiveElementNode } from '@lirx/dom';

export function setReactiveWidthAndHeightCSSVariables(
  node: IGenericVirtualReactiveElementNode,
): void {
  const resizeObserver$ = shareRL$$(fromResizeObserver(node.elementNode));

  const width$ = map$$(resizeObserver$, (entry: ResizeObserverEntry): string => {
    return `${entry.contentRect.width}px`;
  });

  const height$ = map$$(resizeObserver$, (entry: ResizeObserverEntry): string => {
    return `${entry.contentRect.height}px`;
  });

  node.setReactiveStyleProperty('--mat-element-width-px', width$);
  node.setReactiveStyleProperty('--mat-element-height-px', height$);
}
