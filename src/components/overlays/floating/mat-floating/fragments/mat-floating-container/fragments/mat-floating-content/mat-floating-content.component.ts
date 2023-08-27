import { compileStyleAsComponentStyle, INJECT_CONTENT_TEMPLATE, Component } from '@lirx/dom';

// @ts-ignore
import style from './mat-floating-content.component.scss?inline';

/**
 * COMPONENT: 'mat-floating-content'
 *
 * Represents the "main element" of a floating overlay.
 */

export const MatFloatingContentComponent = new Component<HTMLElement, object, object>({
  name: 'mat-floating-content',
  template: INJECT_CONTENT_TEMPLATE,
  styles: [compileStyleAsComponentStyle(style)],
});
