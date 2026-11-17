import {
  compileStyleAsComponentStyle,
  IComponentStyle,
  IGenericVirtualReactiveElementNode,
  VirtualReactiveElementNodeModifier,
} from '@lirx/dom';

import { MatButtonModifier } from '../../../../../buttons/mat-button/mat-button.modifier';

// @ts-ignore
import style from './mat-menu-item.component.scss?inline';

const componentStyle: IComponentStyle = compileStyleAsComponentStyle(style);

export const MatMenuItemModifier = new VirtualReactiveElementNodeModifier(
  'mat-menu-item',
  (node: IGenericVirtualReactiveElementNode): IGenericVirtualReactiveElementNode => {
    node = MatButtonModifier.apply(node);

    node.setClass('mat-menu-item', true);

    componentStyle(node);

    return node;
  },
);
