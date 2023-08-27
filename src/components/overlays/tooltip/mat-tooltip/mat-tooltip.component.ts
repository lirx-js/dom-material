import { compileStyleAsComponentStyle, Component, INJECT_CONTENT_TEMPLATE } from '@lirx/dom';

// @ts-ignore
import style from './mat-tooltip.component.scss?inline';

/**
 * COMPONENT: 'mat-tooltip'
 */

export const MatTooltipComponent = new Component<HTMLElement, object, object>({
  name: 'mat-tooltip',
  template: INJECT_CONTENT_TEMPLATE,
  styles: [compileStyleAsComponentStyle(style)],
});
