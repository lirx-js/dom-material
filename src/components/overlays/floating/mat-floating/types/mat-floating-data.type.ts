import { IMatFloatingReference } from './mat-floating-reference.type';
import { IMatFloatingComputePositionConfig } from './options/mat-floating-compute-position-config.type';
import { IMatFloatingOnCloseFunction } from './mat-floating-on-close-function.type';
import { IObservableLike } from '@lirx/core';
import { IStylePropertiesMapLike } from '@lirx/dom';

export interface IMatFloatingData {
  readonly reference: IObservableLike<IMatFloatingReference>;
  readonly computePositionConfig?: IObservableLike<IMatFloatingComputePositionConfig>;
  readonly onClose?: IMatFloatingOnCloseFunction;
  readonly cssVariables?: IObservableLike<IStylePropertiesMapLike>;
}
