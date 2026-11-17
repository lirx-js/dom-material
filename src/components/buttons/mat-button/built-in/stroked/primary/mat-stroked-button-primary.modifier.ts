import { compileStyleAsComponentStyle } from '@lirx/dom';
import { MatButtonSpecializedModifier } from '../../__shared__/create-mat-button-modifier';

// @ts-ignore
import style from './mat-stroked-button-primary.component.scss?inline';

export const MatStrokedButtonPrimaryModifier = new MatButtonSpecializedModifier(
  'mat-stroked-button-primary',
  compileStyleAsComponentStyle(style),
);
