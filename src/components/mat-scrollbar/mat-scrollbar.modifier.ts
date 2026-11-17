import {
  compileStyleAsComponentStyle,
  IComponentStyle,
  IGenericVirtualReactiveElementNode,
  VirtualReactiveElementNodeModifier,
} from '@lirx/dom';

// @ts-ignore
import style from './mat-scrollbar.component.scss?inline';

const componentStyle: IComponentStyle = compileStyleAsComponentStyle(style);

export const MatScrollbarModifier = new VirtualReactiveElementNodeModifier(
  'mat-scrollbar',
  (node: IGenericVirtualReactiveElementNode): void => {
    node.setClass('mat-scrollbar', true);

    componentStyle(node);
  },
);
