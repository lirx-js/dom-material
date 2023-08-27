import { IMatFloatingReference } from './mat-floating-reference.type';
import { IMatFloatingOptions } from './options/mat-floating-options.type';
import { IMatFloatingOnCloseFunction } from './mat-floating-on-close-function.type';
import { IObservableLike } from '@lirx/core';
import { IStylePropertiesMapLike } from '@lirx/dom';

export interface IMatFloatingData {
  reference: IObservableLike<IMatFloatingReference>;
  options?: IObservableLike<IMatFloatingOptions>;
  onClose?: IMatFloatingOnCloseFunction;
  cssVariables?: IObservableLike<IStylePropertiesMapLike>;
}
