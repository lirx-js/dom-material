import { compileStyleAsComponentStyle } from '@lirx/dom';
import { createMatButtonModifier } from '../../__shared__/create-met-button-modifier';

// @ts-ignore
import style from './mat-stroked-button-secondary.component.scss?inline';

export const MatStrokedButtonSecondaryModifier = createMatButtonModifier('mat-stroked-button-secondary', compileStyleAsComponentStyle(style));


