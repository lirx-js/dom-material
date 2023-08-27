import { compileStyleAsComponentStyle, INJECT_CONTENT_TEMPLATE, Component } from '@lirx/dom';

// @ts-ignore
import style from './mat-column-item.component.scss?inline';

/**
 * COMPONENT: 'mat-column-item'
 */

export const MatColumnItemComponent = new Component<HTMLElement, object, object>({
  name: 'mat-column-item',
  template: INJECT_CONTENT_TEMPLATE,
  styles: [compileStyleAsComponentStyle(style)],
});
