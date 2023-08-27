import { compileStyleAsComponentStyle, INJECT_CONTENT_TEMPLATE, Component } from '@lirx/dom';

// @ts-ignore
import style from './mat-dialog-body.component.scss?inline';

/**
 * COMPONENT: 'mat-dialog-body'
 *
 * Represents the "body" of a dialog
 */

export const MatDialogBodyComponent = new Component<HTMLElement, object, object>({
  name: 'mat-dialog-body',
  template: INJECT_CONTENT_TEMPLATE,
  styles: [compileStyleAsComponentStyle(style)],
});
