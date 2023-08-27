import { IObservableLike, unknownToObservableNotUndefined } from '@lirx/core';
import {
  createVirtualReactiveElementNodeModifier,
  IGenericVirtualReactiveElementNode,
  VirtualDOMNode,
  VirtualReactiveTextNode,
  IVirtualComponentNodeSlotsMap,
} from '@lirx/dom';

import { matTooltipTriggerModifierFunction } from './mat-tooltip-trigger.modifier';
import { MatTooltipComponent } from '../mat-tooltip/mat-tooltip.component';

export function matTooltipModifierFunction(
  node: IGenericVirtualReactiveElementNode,
  text: IObservableLike<string>,
): VirtualDOMNode {
  const slots: IVirtualComponentNodeSlotsMap = new Map([
    ['*', (
      parentNode: VirtualDOMNode,
    ): void => {
      new VirtualReactiveTextNode(unknownToObservableNotUndefined(text)).attach(parentNode);
    }],
  ]);

  matTooltipTriggerModifierFunction(node, {
    content: (
      parentNode: VirtualDOMNode,
    ): void => {
      MatTooltipComponent.create(slots).attach(parentNode);
    },
  });

  node.setClass('mat-tooltip', true);

  return node;
}

export const MatTooltipModifier = createVirtualReactiveElementNodeModifier<IObservableLike<string>, VirtualDOMNode>('mat-tooltip', matTooltipModifierFunction);


