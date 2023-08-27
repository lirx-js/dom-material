import {
  IVoidTransitionFunction,
  createManualStylePropertyTransition,
  mapTransition,
  createNumberTransition,
  parallelTransitions,
} from '@lirx/animations';
import { querySelectorOrThrow } from '@lirx/dom';
import { IMatFloatingPlacement } from '../types/options/mat-floating-placement';

export interface IGetMatFloatingAnimationTransitionOptions {
  element: HTMLElement;
  placement?: IMatFloatingPlacement | undefined;
}

export function getMatFloatingAnimationTransition(
  {
    element,
    placement = 'bottom',
  }: IGetMatFloatingAnimationTransitionOptions,
): IVoidTransitionFunction {

  const containerElement: HTMLElement = querySelectorOrThrow(element, 'mat-floating-container');
  const contentElement: HTMLElement = querySelectorOrThrow(containerElement, 'mat-floating-content');

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

  let origin_x: 'left' | 'center' | 'right';
  let origin_y: 'top' | 'center' | 'bottom';

  const direction: 'ltr' | 'rtl' = getComputedStyle(element).direction as any;

  if (
    placement.startsWith('top')
    || placement.startsWith('bottom')
  ) {
    origin_y = placement.startsWith('top') ? 'bottom' : 'top';

    if (placement.endsWith('start')) {
      origin_x = (direction === 'ltr') ? 'left' : 'right';
    } else if (placement.endsWith('end')) {
      origin_x = (direction === 'ltr') ? 'right' : 'left';
    } else {
      origin_x = 'center';
    }
  } else {
    origin_x = placement.startsWith('left') ? 'right' : 'left';

    if (placement.endsWith('start')) {
      origin_y = 'top';
    } else if (placement.endsWith('end')) {
      origin_y = 'bottom';
    } else {
      origin_y = 'center';
    }
  }

  contentElement.style.transformOrigin = `${origin_x} ${origin_y}`;

  transition(0);

  return transition;
}
