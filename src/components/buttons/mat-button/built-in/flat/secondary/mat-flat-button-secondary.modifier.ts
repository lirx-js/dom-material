import { compileStyleAsComponentStyle } from '@lirx/dom';
import { createMatButtonModifier } from '../../__shared__/create-met-button-modifier';

// @ts-ignore
import style from './mat-flat-button-secondary.component.scss?inline';

export const MatFlatButtonSecondaryModifier = createMatButtonModifier('mat-flat-button-secondary', compileStyleAsComponentStyle(style));


