import { IFocusControllerFocusErrorResult } from './focus-controller-focus-error-result.type';

export function createFocusControllerFocusErrorResult<GType extends string>(
  type: GType,
): IFocusControllerFocusErrorResult<GType> {
  return {
    success: false,
    type,
  };
}
