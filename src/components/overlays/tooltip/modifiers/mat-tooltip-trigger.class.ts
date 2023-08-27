import { IMatFloatingOptions } from '../../floating/mat-floating/types/options/mat-floating-options.type';
import { IMatFloatingTriggerOptions, MatFloatingTrigger } from '../../floating/mat-floating-trigger/mat-floating-trigger.class';
import { ICreateMatFloatingOptions, createMatFloatingOptions } from '../../floating/functions/create-mat-floating-options';

/** CLASS **/

export interface IMatTooltipTriggerOptions extends Omit<IMatFloatingTriggerOptions, 'floatingOptions'>, ICreateMatTooltipOptions {
}

export class MatTooltipTrigger extends MatFloatingTrigger {
  constructor(
    options: IMatTooltipTriggerOptions,
  ) {
    super({
      ...options,
      cssVariables: {
        '--mat-floating-container-backdrop-color': 'transparent',
        ...options.cssVariables,
      },
      floatingOptions: createMatTooltipOptions(options),
    });
  }
}

/** FUNCTIONS **/

export interface ICreateMatTooltipOptions extends ICreateMatFloatingOptions {
}

export function createMatTooltipOptions(
  options?: ICreateMatTooltipOptions,
): IMatFloatingOptions {
  return createMatFloatingOptions({
    placement: 'bottom',
    defaultPlacements: ['bottom', 'top', 'right', 'left'],
    maxWidth: 300,
    maxHeight: 200,
    marginWithContainer: 10,
    offset: {
      mainAxis: 10, // $mat-tooltip-arrow-size
    },
    ...options,
  });
}


