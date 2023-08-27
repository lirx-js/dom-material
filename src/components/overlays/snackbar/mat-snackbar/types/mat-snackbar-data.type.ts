import { IMatSnackbarComponentHorizontalPosition } from './mat-snackbar-component-horizontal-position.type';
import { IMatSnackbarComponentVerticalPosition } from './mat-snackbar-component-vertical-position.type';
import { IMatSnackbarComponentWidth } from './mat-snackbar-component-width.type';
import { IMatSnackbarOnClickAction } from './mat-snackbar-on-click-action.type';
import { IObservableLike } from '@lirx/core';

// export interface IMatSnackbarData {
//   message: string;
//   actionText?: string | undefined;
//   horizontalPosition?: IMatSnackbarComponentHorizontalPosition | undefined;
//   verticalPosition?: IMatSnackbarComponentVerticalPosition | undefined;
//   width?: IMatSnackbarComponentWidth | undefined;
//   onClickAction?: IMatSnackbarOnClickAction;
// }

export interface IMatSnackbarData {
  message: IObservableLike<string>;
  actionText?: IObservableLike<string | undefined>;
  horizontalPosition?: IObservableLike<IMatSnackbarComponentHorizontalPosition | undefined>;
  verticalPosition?: IObservableLike<IMatSnackbarComponentVerticalPosition | undefined>;
  width?: IObservableLike<IMatSnackbarComponentWidth | undefined>;
  onClickAction?: IMatSnackbarOnClickAction;
}
