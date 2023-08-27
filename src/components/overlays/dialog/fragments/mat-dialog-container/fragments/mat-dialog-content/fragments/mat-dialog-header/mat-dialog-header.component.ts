import { compileStyleAsComponentStyle, INJECT_CONTENT_TEMPLATE, Component } from '@lirx/dom';

// @ts-ignore
import style from './mat-dialog-header.component.scss?inline';

/**
 * COMPONENT: 'mat-dialog-header'
 *
 * Represents the "header area" of a dialog
 */

export const MatDialogHeaderComponent = new Component<HTMLElement, object, object>({
  name: 'mat-dialog-header',
  template: INJECT_CONTENT_TEMPLATE,
  styles: [compileStyleAsComponentStyle(style)],
});
