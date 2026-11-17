import {
  IComponentStyle,
  IGenericVirtualReactiveElementNode,
  VirtualReactiveElementNodeModifier,
  compileStyleAsComponentStyle,
} from '@lirx/dom';
import { MatRippleModifier } from '../mat-ripple/mat-ripple.modifier';

// @ts-ignore
import style from './mat-button.component.scss?inline';

const componentStyle: IComponentStyle = compileStyleAsComponentStyle(style);

export const MatButtonModifier = new VirtualReactiveElementNodeModifier(
  'mat-button',
  (node: IGenericVirtualReactiveElementNode): void => {
    node = MatRippleModifier.apply(node);

    node.setClass('mat-button', true);

    componentStyle(node);
  },
);
