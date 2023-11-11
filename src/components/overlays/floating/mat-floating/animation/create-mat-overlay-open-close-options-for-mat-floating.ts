import {
  IMatFloatingAnimationTransitionData,
  getMatFloatingAnimationTransitionFromVirtualComponentNode,
} from './get-mat-floating-animation-transition-from-virtual-component-node';
import { VirtualComponentNode } from '@lirx/dom';
import {
  createMatOverlayOpenCloseOptionsFromReversibleTransitionFactory,
  IMatOverlayOpenCloseOptions,
} from '../../../shared/instance/animation/create-mat-overlay-open-close-options-from-reversible-transition-factory';

export interface ICreateMatOverlayOpenCloseOptionsForMatFloatingOptions {
  readonly animationDuration?: number;
}

export function createMatOverlayOpenCloseOptionsForMatFloating<GElement extends Element, GData extends IMatFloatingAnimationTransitionData>(
  {
    animationDuration = 150,
  }: ICreateMatOverlayOpenCloseOptionsForMatFloatingOptions = {},
): IMatOverlayOpenCloseOptions<VirtualComponentNode<GElement, GData>> {
  return createMatOverlayOpenCloseOptionsFromReversibleTransitionFactory<VirtualComponentNode<GElement, GData>>({
    transitionFactory: getMatFloatingAnimationTransitionFromVirtualComponentNode as any,
    duration: animationDuration,
  });
}
