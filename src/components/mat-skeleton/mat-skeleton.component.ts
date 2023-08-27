import { compileStyleAsComponentStyle, Component } from '@lirx/dom';

// @ts-ignore
import style from './mat-skeleton.component.scss?inline';

/**
 * COMPONENT: 'mat-skeleton'
 */



export const MatSkeletonComponent = new Component<HTMLElement, object, object>({
  name: 'mat-skeleton',
  styles: [compileStyleAsComponentStyle(style)],
});
