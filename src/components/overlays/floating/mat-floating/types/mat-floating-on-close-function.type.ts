import { IMatFloatingCloseType } from './mat-floating-close-type.type';

export interface IMatFloatingOnCloseFunction {
  (
    type: IMatFloatingCloseType,
  ): void;
}
