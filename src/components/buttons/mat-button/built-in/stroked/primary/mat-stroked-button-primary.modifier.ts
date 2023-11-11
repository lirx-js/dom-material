import { compileStyleAsComponentStyle } from '@lirx/dom';
import { createMatButtonModifier } from '../../__shared__/create-met-button-modifier';

// @ts-ignore
import style from './mat-stroked-button-primary.component.scss?inline';

export const MatStrokedButtonPrimaryModifier = createMatButtonModifier('mat-stroked-button-primary', compileStyleAsComponentStyle(style));


