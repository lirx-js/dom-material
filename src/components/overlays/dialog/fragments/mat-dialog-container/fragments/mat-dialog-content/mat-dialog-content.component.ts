import { compileStyleAsComponentStyle, INJECT_CONTENT_TEMPLATE, Component } from '@lirx/dom';

// @ts-ignore
import style from './mat-dialog-content.component.scss?inline';

/**
 * COMPONENT: 'mat-dialog-content'
 *
 * Represents the "main element" of a dialog
 */

export const MatDialogContentComponent = new Component<HTMLElement, object, object>({
  name: 'mat-dialog-content',
  template: INJECT_CONTENT_TEMPLATE,
  styles: [compileStyleAsComponentStyle(style)],
});
