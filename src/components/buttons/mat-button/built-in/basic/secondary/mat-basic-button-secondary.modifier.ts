import { compileStyleAsComponentStyle } from '@lirx/dom';
import { createMatButtonModifier } from '../../__shared__/create-met-button-modifier';

// @ts-ignore
import style from './mat-basic-button-secondary.component.scss?inline';

export const MatBasicButtonSecondaryModifier = createMatButtonModifier('mat-basic-button-secondary', compileStyleAsComponentStyle(style));


