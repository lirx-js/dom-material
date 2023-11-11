import { compileStyleAsComponentStyle } from '@lirx/dom';
import { createMatButtonModifier } from '../../__shared__/create-met-button-modifier';

// @ts-ignore
import style from './mat-flat-button-primary.component.scss?inline';

export const MatFlatButtonPrimaryModifier = createMatButtonModifier('mat-flat-button-primary', compileStyleAsComponentStyle(style));


