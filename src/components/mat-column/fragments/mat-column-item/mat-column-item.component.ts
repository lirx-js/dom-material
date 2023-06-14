import { compileStyleAsComponentStyle, createComponent, INJECT_CONTENT_TEMPLATE } from '@lirx/dom';

// @ts-ignore
import style from './mat-column-item.component.scss?inline';

/**
 * COMPONENT: 'mat-column-item'
 */

interface IMatColumnItemComponentConfig {
  element: HTMLElement;
}

export const MatColumnItemComponent = createComponent<IMatColumnItemComponentConfig>({
  name: 'mat-column-item',
  template: INJECT_CONTENT_TEMPLATE,
  styles: [compileStyleAsComponentStyle(style)],
});
