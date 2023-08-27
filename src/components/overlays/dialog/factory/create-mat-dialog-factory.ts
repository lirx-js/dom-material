import { IVoidTransitionFunction } from '@lirx/animations';
import { VirtualComponentNode, AbstractComponent } from '@lirx/dom';
import { getMatDialogAnimationTransition } from '../animation/get-mat-dialog-animation-transition';
import {
  createMatOverlayFactoryFromComponent,
  IMatOverlayFactoryFromComponent,
} from '../../shared/factories/sync/create/create-mat-overlay-factory-from-component';
import {
  createMatOverlayOpenCloseOptionsFromReversibleTransitionFactory,
} from '../../shared/instance/animation/create-mat-overlay-open-close-options-from-reversible-transition-factory';

export interface IMatDialogFactoryOptions {
  animationDuration?: number;
}

export type IMatDialogFactory<GElement extends HTMLElement, GData extends object> = IMatOverlayFactoryFromComponent<GElement, GData>;

export function createMatDialogFactory<GElement extends HTMLElement, GData extends object>(
  component: AbstractComponent<GElement, GData>,
  {
    animationDuration = 150,
  }: IMatDialogFactoryOptions = {},
): IMatDialogFactory<GElement, GData> {
  return createMatOverlayFactoryFromComponent(
    component,
    createMatOverlayOpenCloseOptionsFromReversibleTransitionFactory({
      transitionFactory: (
        node: VirtualComponentNode<GElement, GData>,
      ): IVoidTransitionFunction => {
        return getMatDialogAnimationTransition({
          element: node.elementNode,
        });
      },
      duration: animationDuration,
    }),
  );
}

