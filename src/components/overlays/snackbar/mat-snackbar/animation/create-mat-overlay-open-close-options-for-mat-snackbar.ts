import { VirtualComponentNode } from '@lirx/dom';
import {
  IMatOverlayOpenCloseOptions,
  createMatOverlayOpenCloseOptionsFromReversibleTransitionFactory,
  ICreateMatOverlayOpenCloseOptionsFromReversibleTransitionFactoryFactory,
} from '../../../shared/instance/animation/create-mat-overlay-open-close-options-from-reversible-transition-factory';
import {
  getMatSnackbarAnimationTransitionFromVirtualComponentNode,
  IMatSnackbarAnimationTransitionData,
} from './get-mat-snackbar-animation-transition-from-virtual-custom-element-node';

export interface ICreateMatOverlayOpenCloseOptionsForMatSnackbarOptions {
  animationDuration?: number;
}

export function createMatOverlayOpenCloseOptionsForMatSnackbar<GElement extends Element, GData extends IMatSnackbarAnimationTransitionData>(
  {
    animationDuration = 150,
  }: ICreateMatOverlayOpenCloseOptionsForMatSnackbarOptions = {},
): IMatOverlayOpenCloseOptions<VirtualComponentNode<GElement, GData>> {
  return createMatOverlayOpenCloseOptionsFromReversibleTransitionFactory<VirtualComponentNode<GElement, GData>>({
    transitionFactory: getMatSnackbarAnimationTransitionFromVirtualComponentNode as ICreateMatOverlayOpenCloseOptionsFromReversibleTransitionFactoryFactory<any>,
    duration: animationDuration,
  });
}

