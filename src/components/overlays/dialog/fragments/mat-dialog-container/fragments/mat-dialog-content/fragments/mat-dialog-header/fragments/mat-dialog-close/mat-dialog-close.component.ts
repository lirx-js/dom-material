import { compileReactiveHTMLAsComponentTemplate, compileStyleAsComponentStyle, Component } from '@lirx/dom';
import { IconCloseComponent } from '@lirx/mdi';
import { MatIconButtonModifier } from '../../../../../../../../../../buttons/mat-icon-button/mat-icon-button.modifier';

// @ts-ignore
import html from './mat-dialog-close.component.html?raw';

// @ts-ignore
import style from './mat-dialog-close.component.scss?inline';

/**
 * COMPONENT: 'mat-dialog-close'
 *
 * Represents the close icon of a dialog
 */

export const MatDialogCloseComponent = new Component<HTMLElement, object, object>({
  name: 'mat-dialog-close',
  template: compileReactiveHTMLAsComponentTemplate({
    html,
    components: [
      IconCloseComponent,
    ],
    modifiers: [
      MatIconButtonModifier,
    ],
  }),
  styles: [compileStyleAsComponentStyle(style)],
});
