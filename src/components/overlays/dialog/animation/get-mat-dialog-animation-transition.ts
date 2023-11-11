import {
  IVoidTransitionFunction,
  createManualStylePropertyTransition,
  mapTransition,
  createNumberTransition,
  parallelTransitions,
} from '@lirx/animations';
import { querySelectorOrThrow } from '@lirx/dom';

export interface IGetMatDialogAnimationTransitionOptions {
  readonly element: HTMLElement;
}

export function getMatDialogAnimationTransition(
  {
    element,
  }: IGetMatDialogAnimationTransitionOptions,
): IVoidTransitionFunction {

  const containerElement: HTMLElement = querySelectorOrThrow(element, 'mat-dialog-container');
  const contentElement: HTMLElement = querySelectorOrThrow(containerElement, 'mat-dialog-content');

  const opacityTransition = createManualStylePropertyTransition(
    containerElement,
    'opacity',
    mapTransition(createNumberTransition(0, 1), String),
  );

  const scaleTransition = createManualStylePropertyTransition(
    contentElement,
    'scale',
    mapTransition(createNumberTransition(0.75, 1), String),
  );

  const transition = parallelTransitions([
    opacityTransition,
    scaleTransition,
  ]);

  containerElement.style.willChange = 'opacity';
  contentElement.style.willChange = 'scale';

  transition(0);

  return transition;
}
