import { compileStyleAsComponentStyle } from '@lirx/dom';
import { MatButtonSpecializedModifier } from '../../__shared__/create-mat-button-modifier';

// @ts-ignore
import style from './mat-flat-button-secondary.component.scss?inline';

export const MatFlatButtonSecondaryModifier = new MatButtonSpecializedModifier(
  'mat-flat-button-secondary',
  compileStyleAsComponentStyle(style),
);
