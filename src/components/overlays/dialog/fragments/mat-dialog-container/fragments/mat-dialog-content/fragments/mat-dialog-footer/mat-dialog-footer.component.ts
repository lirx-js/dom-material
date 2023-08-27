import { compileStyleAsComponentStyle, INJECT_CONTENT_TEMPLATE, Component } from '@lirx/dom';

// @ts-ignore
import style from './mat-dialog-footer.component.scss?inline';

/**
 * COMPONENT: 'mat-dialog-footer'
 *
 * Represents the "footer area" of a dialog
 */

export const MatDialogFooterComponent = new Component<HTMLElement, object, object>({
  name: 'mat-dialog-footer',
  template: INJECT_CONTENT_TEMPLATE,
  styles: [compileStyleAsComponentStyle(style)],
});
