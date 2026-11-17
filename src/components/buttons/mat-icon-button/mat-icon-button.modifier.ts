import {
  compileStyleAsComponentStyle,
  IComponentStyle,
  IGenericVirtualReactiveElementNode,
  VirtualReactiveElementNodeModifier,
} from '@lirx/dom';
import { MatButtonModifier } from '../mat-button/mat-button.modifier';

// @ts-ignore
import style from './mat-icon-button.component.scss?inline';

const componentStyle: IComponentStyle = compileStyleAsComponentStyle(style);

export const MatIconButtonModifier = new VirtualReactiveElementNodeModifier(
  'mat-icon-button',
  (node: IGenericVirtualReactiveElementNode): void => {
    MatButtonModifier.apply(node);

    node.setClass('mat-icon-button', true);

    componentStyle(node);
  },
);
