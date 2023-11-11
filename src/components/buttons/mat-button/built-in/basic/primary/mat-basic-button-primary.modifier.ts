import { compileStyleAsComponentStyle } from '@lirx/dom';
import { createMatButtonModifier } from '../../__shared__/create-met-button-modifier';

// @ts-ignore
import style from './mat-basic-button-primary.component.scss?inline';

export const MatBasicButtonPrimaryModifier = createMatButtonModifier('mat-basic-button-primary', compileStyleAsComponentStyle(style));


