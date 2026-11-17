import { IObservableLike, unknownToObservableNotUndefined } from '@lirx/core';
import {
  IGenericVirtualReactiveElementNode,
  IVirtualComponentNodeSlotsMap,
  VirtualDOMNode,
  VirtualReactiveElementNodeModifier,
  VirtualReactiveTextNode,
} from '@lirx/dom';

import { MatTooltipComponent } from '../mat-tooltip/mat-tooltip.component';
import { MatTooltipTriggerModifier } from './mat-tooltip-trigger.modifier';

export const MatTooltipModifier = new VirtualReactiveElementNodeModifier(
  'mat-tooltip',
  (node: IGenericVirtualReactiveElementNode, text: IObservableLike<string>): void => {
    const slots: IVirtualComponentNodeSlotsMap = new Map([
      [
        '*',
        (parentNode: VirtualDOMNode): void => {
          new VirtualReactiveTextNode(unknownToObservableNotUndefined(text)).attach(parentNode);
        },
      ],
    ]);

    MatTooltipTriggerModifier.apply(node, {
      content: (parentNode: VirtualDOMNode): void => {
        MatTooltipComponent.create(slots).attach(parentNode);
      },
    });

    node.setClass('mat-tooltip', true);
  },
);
