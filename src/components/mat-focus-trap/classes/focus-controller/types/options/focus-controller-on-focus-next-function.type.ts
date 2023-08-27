import { FocusController } from '../../focus-controller.class';

export interface IFocusControllerOnFocusNextFunction {
  (
    this: FocusController,
    backward: boolean,
  ): void;
}
