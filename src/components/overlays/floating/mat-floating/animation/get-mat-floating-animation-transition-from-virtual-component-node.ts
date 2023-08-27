import { IMatFloatingReference } from '../types/mat-floating-reference.type';
import { IMatFloatingOptions } from '../types/options/mat-floating-options.type';
import { VirtualComponentNode, Input } from '@lirx/dom';
import { IVoidTransitionFunction } from '@lirx/animations';
import { ComputePositionConfig, computePosition } from '@floating-ui/dom';
import { getMatFloatingAnimationTransition } from './get-mat-floating-animation-transition';
import {
  getVirtualComponentNodeInputAfterMicroDelay,
} from '../../../../../functions/get-virtual-custom-element-node-input-after-micro-delay';

export interface IMatFloatingAnimationTransitionData {
  readonly reference: Input<IMatFloatingReference>;
  readonly options: Input<IMatFloatingOptions | undefined>;
}

export function getMatFloatingAnimationTransitionFromVirtualComponentNode(
  node: VirtualComponentNode<any, IMatFloatingAnimationTransitionData>,
  signal: AbortSignal,
): Promise<IVoidTransitionFunction> {
  return Promise.all([
    getVirtualComponentNodeInputAfterMicroDelay(node, 'reference', { signal }),
    getVirtualComponentNodeInputAfterMicroDelay(node, 'options', { signal }),
  ])
    .then((
      [
        reference,
        options,
      ]:
        [
          IMatFloatingReference,
            IMatFloatingOptions | undefined,
        ],
    ): Promise<ComputePositionConfig> => {
      // TODO improve by selecting the right element
      return computePosition(reference, document.createElement('div'), options);
    })
    .then(({ placement }: ComputePositionConfig): IVoidTransitionFunction => {
      return getMatFloatingAnimationTransition({
        element: node.elementNode as HTMLElement,
        placement,
      });
    });
}
