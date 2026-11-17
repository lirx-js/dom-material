import { compileStyleAsComponentStyle } from '@lirx/dom';
import { MatButtonSpecializedModifier } from '../../__shared__/create-mat-button-modifier';

// @ts-ignore
import style from './mat-stroked-button-secondary.component.scss?inline';

export const MatStrokedButtonSecondaryModifier = new MatButtonSpecializedModifier(
  'mat-stroked-button-secondary',
  compileStyleAsComponentStyle(style),
);
