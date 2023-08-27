import { VirtualComponentNode, Input } from '@lirx/dom';
import { IVoidTransitionFunction } from '@lirx/animations';
import {
  getVirtualComponentNodeInputAfterMicroDelay,
} from '../../../../../functions/get-virtual-custom-element-node-input-after-micro-delay';
import { IMatSnackbarComponentHorizontalPosition } from '../types/mat-snackbar-component-horizontal-position.type';
import { IMatSnackbarComponentVerticalPosition } from '../types/mat-snackbar-component-vertical-position.type';
import { getMatSnackbarAnimationTransition } from './get-mat-snackbar-animation-transition';

export interface IMatSnackbarAnimationTransitionData {
  readonly horizontalPosition: Input<IMatSnackbarComponentHorizontalPosition>;
  readonly verticalPosition: Input<IMatSnackbarComponentVerticalPosition>;
}

export function getMatSnackbarAnimationTransitionFromVirtualComponentNode(
  node: VirtualComponentNode<any, IMatSnackbarAnimationTransitionData>,
  signal: AbortSignal,
): Promise<IVoidTransitionFunction> {
  return Promise.all([
    getVirtualComponentNodeInputAfterMicroDelay(node, 'horizontalPosition', { signal }),
    getVirtualComponentNodeInputAfterMicroDelay(node, 'verticalPosition', { signal }),
  ])
    .then((
      [
        horizontalPosition,
        verticalPosition,
      ]:
        [
          IMatSnackbarComponentHorizontalPosition,
          IMatSnackbarComponentVerticalPosition,
        ],
    ): IVoidTransitionFunction => {
      return getMatSnackbarAnimationTransition({
        element: node.elementNode as HTMLElement,
        horizontalPosition,
        verticalPosition,
      });
    });
}
