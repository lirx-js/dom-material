import { IVoidTransitionFunction } from '@lirx/animations';
import { IGenericAbstractComponent, InferAbstractComponentVirtualComponentNode } from '@lirx/dom';
import { getMatDialogAnimationTransition } from '../animation/get-mat-dialog-animation-transition';
import {
  createMatOverlayOpenCloseOptionsFromReversibleTransitionFactory,
} from '../../shared/instance/animation/create-mat-overlay-open-close-options-from-reversible-transition-factory';
import {
  MatVirtualComponentOverlayFactory,
} from '../../shared/factories/sync/built-in/for-component/mat-virtual-component-overlay-factory.class';

/** TYPES **/

export interface IMatDialogFactoryOptions {
  readonly animationDuration?: number;
}

/** CLASS **/

export class MatDialogFactory<GComponent extends IGenericAbstractComponent> extends MatVirtualComponentOverlayFactory<GComponent> {
  constructor(
    component: GComponent,
    {
      animationDuration = 150,
    }: IMatDialogFactoryOptions = {},
  ) {
    super(
      component,
      createMatOverlayOpenCloseOptionsFromReversibleTransitionFactory({
        transitionFactory: (
          node: InferAbstractComponentVirtualComponentNode<GComponent>,
        ): IVoidTransitionFunction => {
          return getMatDialogAnimationTransition({
            element: node.elementNode,
          });
        },
        duration: animationDuration,
      }),
    );
  }
}
