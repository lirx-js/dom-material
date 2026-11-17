import { compileStyleAsComponentStyle } from '@lirx/dom';
import { MatButtonSpecializedModifier } from '../../__shared__/create-mat-button-modifier';

// @ts-ignore
import style from './mat-basic-button-primary.component.scss?inline';

export const MatBasicButtonPrimaryModifier = new MatButtonSpecializedModifier(
  'mat-basic-button-primary',
  compileStyleAsComponentStyle(style),
);
