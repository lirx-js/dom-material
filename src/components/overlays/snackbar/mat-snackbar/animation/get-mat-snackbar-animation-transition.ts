import {
  IGetMatSnackbarAnimationTransformTransitionOptions,
  getMatSnackbarAnimationTransformTransition,
} from './get-mat-snackbar-animation-transform-transition';
import {
  IVoidTransitionFunction,
  createManualStylePropertyTransition,
  mapTransition,
  createNumberTransition,
  parallelTransitions,
} from '@lirx/animations';

export interface IGetMatSnackbarAnimationTransitionOptions extends IGetMatSnackbarAnimationTransformTransitionOptions {
  element: HTMLElement;
}

export function getMatSnackbarAnimationTransition(
  {
    element,
    ...options
  }: IGetMatSnackbarAnimationTransitionOptions,
): IVoidTransitionFunction {

  const opacityTransition = createManualStylePropertyTransition(
    element,
    'opacity',
    mapTransition(createNumberTransition(0, 1), String),
  );

  const transformTransition = createManualStylePropertyTransition(
    element,
    'transform',
    getMatSnackbarAnimationTransformTransition(options),
  );

  const transition = parallelTransitions([
    opacityTransition,
    transformTransition,
  ]);

  element.style.willChange = 'transform, opacity';

  transition(0);

  return transition;
}
