import { compileStyleAsComponentStyle, INJECT_CONTENT_TEMPLATE, Component } from '@lirx/dom';

// @ts-ignore
import style from './mat-dialog-title.component.scss?inline';

/**
 * COMPONENT: 'mat-dialog-title'
 *
 * Represents the "title" of a dialog (in the title area)
 */

export const MatDialogTitleComponent = new Component<HTMLElement, object, object>({
  name: 'mat-dialog-title',
  template: INJECT_CONTENT_TEMPLATE,
  styles: [compileStyleAsComponentStyle(style)],
});
