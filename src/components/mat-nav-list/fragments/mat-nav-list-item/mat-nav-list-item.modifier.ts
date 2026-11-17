import {
  compileStyleAsComponentStyle,
  IComponentStyle,
  IGenericVirtualReactiveElementNode,
  VirtualReactiveElementNodeModifier,
} from '@lirx/dom';
import { MatButtonModifier } from '../../../buttons/mat-button/mat-button.modifier';

// @ts-ignore
import style from './mat-nav-list-item.component.scss?inline';

const componentStyle: IComponentStyle = compileStyleAsComponentStyle(style);

export const MatNavListItemModifier = new VirtualReactiveElementNodeModifier(
  'mat-nav-list-item',
  (node: IGenericVirtualReactiveElementNode): void => {
    MatButtonModifier.apply(node);

    node.setClass('mat-nav-list-item', true);

    componentStyle(node);
  },
);
