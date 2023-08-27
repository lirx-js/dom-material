import { compileStyleAsComponentStyle, Component, INJECT_CONTENT_TEMPLATE } from '@lirx/dom';

// @ts-ignore
import style from './mat-buttons-group.component.scss?inline';

/**
 * COMPONENT: 'mat-buttons-group'
 */

export const MatButtonsGroupComponent = new Component<HTMLElement, object, object>({
  name: 'mat-buttons-group',
  template: INJECT_CONTENT_TEMPLATE,
  styles: [compileStyleAsComponentStyle(style)],
});
