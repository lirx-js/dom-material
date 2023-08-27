import { compileStyleAsComponentStyle, INJECT_CONTENT_TEMPLATE, Component } from '@lirx/dom';

// @ts-ignore
import style from './mat-toolbar.component.scss?inline';

/**
 * COMPONENT: 'mat-toolbar'
 */


export const MatToolbarComponent = new Component<HTMLElement, object, object>({
  name: 'mat-toolbar',
  template: INJECT_CONTENT_TEMPLATE,
  styles: [compileStyleAsComponentStyle(style)],
});
