import { compileStyleAsComponentStyle, Component, INJECT_CONTENT_TEMPLATE, VirtualComponentNode } from '@lirx/dom';

// @ts-ignore
import style from './mat-nav-list.component.scss?inline';

/**
 * COMPONENT: 'mat-nav-list'
 */

export const MatNavListComponent = new Component<HTMLElement, object, object>({
  name: 'mat-nav-list',
  template: INJECT_CONTENT_TEMPLATE,
  styles: [compileStyleAsComponentStyle(style)],
  templateData: (node: VirtualComponentNode<HTMLElement, object>): void => {
    node.elementNode.role = 'navigation';
  },
});
