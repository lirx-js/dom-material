import { IMatFloatingComputePositionConfig } from '../../floating/mat-floating/types/options/mat-floating-compute-position-config.type';
import { IMatFloatingTriggerOptions, MatFloatingTrigger } from '../../floating/mat-floating-trigger/mat-floating-trigger.class';
import { createMatFloatingOptions, ICreateMatFloatingOptions } from '../../floating/functions/create-mat-floating-options';

/** CLASS **/

export interface IMatMenuTriggerOptions extends Omit<IMatFloatingTriggerOptions, 'computePositionConfig'>, ICreateMatMenuOptions {
}

export class MatMenuTrigger extends MatFloatingTrigger {
  constructor(
    options: IMatMenuTriggerOptions,
  ) {
    super({
      ...options,
      cssVariables: {
        '--mat-floating-container-backdrop-color': 'transparent',
        ...options.cssVariables,
      },
      computePositionConfig: createMatMenuOptions(options),
    });
  }
}

/** FUNCTIONS **/

export interface ICreateMatMenuOptions extends ICreateMatFloatingOptions {
}

export function createMatMenuOptions(
  options?: ICreateMatMenuOptions,
): IMatFloatingComputePositionConfig {
  return createMatFloatingOptions({
    placement: 'bottom-start',
    defaultPlacements: ['bottom-start', 'top-start'],
    maxWidth: 300,
    maxHeight: 46 * 8,
    marginWithContainer: 10,
    ...options,
  });
}
