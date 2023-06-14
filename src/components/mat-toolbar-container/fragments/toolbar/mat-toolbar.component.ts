import { compileStyleAsComponentStyle, createComponent, INJECT_CONTENT_TEMPLATE } from '@lirx/dom';

// @ts-ignore
import style from './mat-toolbar.component.scss?inline';

/**
 * COMPONENT: 'mat-toolbar'
 */

interface IMatToolbarComponentConfig {
}

export const MatToolbarComponent = createComponent<IMatToolbarComponentConfig>({
  name: 'mat-toolbar',
  template: INJECT_CONTENT_TEMPLATE,
  styles: [compileStyleAsComponentStyle(style)],
});
