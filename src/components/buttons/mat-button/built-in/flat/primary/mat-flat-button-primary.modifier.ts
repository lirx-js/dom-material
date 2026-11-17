import { compileStyleAsComponentStyle } from '@lirx/dom';
import { MatButtonSpecializedModifier } from '../../__shared__/create-mat-button-modifier';

// @ts-ignore
import style from './mat-flat-button-primary.component.scss?inline';

export const MatFlatButtonPrimaryModifier = new MatButtonSpecializedModifier(
  'mat-flat-button-primary',
  compileStyleAsComponentStyle(style),
);
