import { IMatFloatingReference } from '../types/mat-floating-reference.type';
import { IMatFloatingComputePositionConfig } from '../types/options/mat-floating-compute-position-config.type';
import { VirtualComponentNode, Input } from '@lirx/dom';
import { IVoidTransitionFunction } from '@lirx/animations';
import { ComputePositionConfig, computePosition, FloatingElement } from '@floating-ui/dom';
import { getMatFloatingAnimationTransition } from './get-mat-floating-animation-transition';
import {
  getVirtualComponentNodeInputAfterMicroDelay,
} from '../../../../../functions/get-virtual-custom-element-node-input-after-micro-delay';

export interface IMatFloatingAnimationTransitionData {
  readonly reference: Input<IMatFloatingReference>;
  readonly computePositionConfig: Input<IMatFloatingComputePositionConfig | undefined>;
}

export function getMatFloatingAnimationTransitionFromVirtualComponentNode(
  node: VirtualComponentNode<any, IMatFloatingAnimationTransitionData>,
  signal: AbortSignal,
): Promise<IVoidTransitionFunction> {
  return Promise.all([
    getVirtualComponentNodeInputAfterMicroDelay(node, 'reference', { signal }),
    getVirtualComponentNodeInputAfterMicroDelay(node, 'computePositionConfig', { signal }),
  ])
    .then((
      [
        reference,
        computePositionConfig,
      ]:
        [
          IMatFloatingReference,
            IMatFloatingComputePositionConfig | undefined,
        ],
    ): Promise<ComputePositionConfig> => {
      const floating: FloatingElement = node.elementNode.querySelector('mat-floating-content') ?? document.createElement('div');
      return computePosition(reference, floating, computePositionConfig);
    })
    .then(({ placement }: ComputePositionConfig): IVoidTransitionFunction => {
      return getMatFloatingAnimationTransition({
        element: node.elementNode as HTMLElement,
        placement,
      });
    });
}
