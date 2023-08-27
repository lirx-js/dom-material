import {
  IFocusControllerFocusErrorNotFocusableResult,
} from './error/not-focusable/focus-controller-focus-error-not-focusable-result.type';
import { IFocusControllerFocusErrorPreventedResult } from './error/prevented/focus-controller-focus-error-prevented-result.type';
import { IFocusControllerFocusSuccessResult } from './success/focus-controller-focus-success-result.type';

export type IFocusControllerFocusResult =
  | IFocusControllerFocusSuccessResult
  | IFocusControllerFocusErrorNotFocusableResult
  | IFocusControllerFocusErrorPreventedResult
  ;
