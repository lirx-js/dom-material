import { fromResizeObserver, function$$ } from '@lirx/core';
import { compileReactiveHTMLAsComponentTemplate, compileStyleAsComponentStyle, createComponent, VirtualCustomElementNode } from '@lirx/dom';

// @ts-ignore
import html from './mat-column.component.html?raw';
// @ts-ignore
import style from './mat-column.component.scss?inline';

/**
 * COMPONENT: 'mat-column'
 */

interface IMatColumnComponentConfig {
  element: HTMLElement;
  inputs: [
    ['minColumnWidth', number],
  ],
}

export const MatColumnComponent = createComponent<IMatColumnComponentConfig>({
  name: 'mat-column',
  template: compileReactiveHTMLAsComponentTemplate({
    html,
  }),
  styles: [compileStyleAsComponentStyle(style)],
  inputs: [
    ['minColumnWidth'],
  ],
  init: (node: VirtualCustomElementNode<IMatColumnComponentConfig>): void => {

    const minColumnWidth$ = node.inputs.get$('minColumnWidth');

    const size$ = fromResizeObserver(node.elementNode);

    const columnWidth$ = function$$(
      [minColumnWidth$, size$],
      (minColumnWidth: number, size: ResizeObserverEntry): string => {
        const columnCount: number = Math.max(1, Math.floor(size.contentRect.width / minColumnWidth));
        const columnWidth: number = size.contentRect.width / columnCount;
        return `${columnWidth}px`;
      }
    );

    node.setReactiveStyleProperty('--mat-column-width', columnWidth$);
  },
});
