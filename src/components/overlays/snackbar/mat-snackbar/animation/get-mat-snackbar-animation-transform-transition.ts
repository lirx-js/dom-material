import { ITransitionFunction, mapTransition, createNumberTransition } from '@lirx/animations';
import { IMatSnackbarComponentHorizontalPosition } from '../types/mat-snackbar-component-horizontal-position.type';
import { IMatSnackbarComponentVerticalPosition } from '../types/mat-snackbar-component-vertical-position.type';

export interface IGetMatSnackbarAnimationTransformTransitionOptions {
  horizontalPosition: IMatSnackbarComponentHorizontalPosition;
  verticalPosition: IMatSnackbarComponentVerticalPosition;
}

export function getMatSnackbarAnimationTransformTransition(
  {
    horizontalPosition,
    verticalPosition,
  }: IGetMatSnackbarAnimationTransformTransitionOptions,
): ITransitionFunction<string> {
  if (horizontalPosition === 'left') {
    return mapTransition(createNumberTransition(-120, 0), _ => `translateX(${_}%)`);
  } else if (horizontalPosition === 'right') {
    return mapTransition(createNumberTransition(120, 0), _ => `translateX(${_}%)`);
  } else {
    if (verticalPosition === 'bottom') {
      return mapTransition(createNumberTransition(120, 0), _ => `translateY(${_}%)`);
    } else {
      return mapTransition(createNumberTransition(-120, 0), _ => `translateY(${_}%)`);
    }
  }
}
