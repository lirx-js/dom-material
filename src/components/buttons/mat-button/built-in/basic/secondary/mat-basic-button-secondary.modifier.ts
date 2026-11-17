import { compileStyleAsComponentStyle } from '@lirx/dom';
import { MatButtonSpecializedModifier } from '../../__shared__/create-mat-button-modifier';

// @ts-ignore
import style from './mat-basic-button-secondary.component.scss?inline';

export const MatBasicButtonSecondaryModifier = new MatButtonSpecializedModifier(
  'mat-basic-button-secondary',
  compileStyleAsComponentStyle(style),
);
