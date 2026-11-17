import {
  IComponentStyle,
  IGenericVirtualReactiveElementNode,
  VirtualReactiveElementNodeModifier,
} from '@lirx/dom';
import { MatButtonModifier } from '../../mat-button.modifier';

export class MatButtonSpecializedModifier extends VirtualReactiveElementNodeModifier<
  (node: IGenericVirtualReactiveElementNode) => void
> {
  constructor(name: string, componentStyle: IComponentStyle) {
    super(name, (node: IGenericVirtualReactiveElementNode): void => {
      node = MatButtonModifier.apply(node);

      node.setClass(name, true);

      componentStyle(node);
    });
  }
}
