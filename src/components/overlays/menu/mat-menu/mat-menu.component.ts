import { compileStyleAsComponentStyle, Component, INJECT_CONTENT_TEMPLATE } from '@lirx/dom';

// @ts-ignore
import style from './mat-menu.component.scss?inline';

/**
 * COMPONENT: 'mat-menu'
 */

export const MatMenuComponent = new Component<HTMLElement, object, object>({
  name: 'mat-menu',
  template: INJECT_CONTENT_TEMPLATE,
  styles: [compileStyleAsComponentStyle(style)],
});
