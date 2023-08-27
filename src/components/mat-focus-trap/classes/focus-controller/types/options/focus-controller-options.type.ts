import { IFocusControllerOnFocusChangeFunction } from './focus-controller-on-focus-change-function.type';
import { IFocusControllerOnFocusNextFunction } from './focus-controller-on-focus-next-function.type';

export interface IFocusControllerOptions {
  container?: HTMLElement;
  change?: IFocusControllerOnFocusChangeFunction;
  next?: IFocusControllerOnFocusNextFunction;
}
