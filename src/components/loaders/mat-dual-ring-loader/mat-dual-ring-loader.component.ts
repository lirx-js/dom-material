import { compileStyleAsComponentStyle, Component } from '@lirx/dom';

// @ts-ignore
import style from './mat-dual-ring-loader.component.scss?inline';

/**
 * COMPONENT: 'mat-dual-ring-loader'
 */


export const MatDualRingLoaderComponent = new Component<HTMLElement, object, object>({
  name: 'mat-dual-ring-loader',
  styles: [compileStyleAsComponentStyle(style)],
});
