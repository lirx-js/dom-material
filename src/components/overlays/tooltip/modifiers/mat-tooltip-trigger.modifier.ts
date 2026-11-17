import { IObserver } from '@lirx/core';
import {
  IMatFloatingTriggerBaseOptions,
  IMatFloatingTriggerFactoryOptions,
  MatFloatingTriggerModifier,
} from '../../floating/mat-floating-trigger/create-mat-floating-trigger-modifier-function';
import { IMatFloatingTriggerOpenOnMouseOverOptions } from '../../floating/mat-floating-trigger/mat-floating-trigger.class';
import { IMatTooltipTriggerOptions, MatTooltipTrigger } from './mat-tooltip-trigger.class';

export interface IMatTooltipTriggerModifierOptions //
  extends Omit<IMatTooltipTriggerOptions, 'reference'>,
    IMatFloatingTriggerBaseOptions<MatTooltipTrigger>,
    IMatFloatingTriggerOpenOnMouseOverOptions {
  //
  readonly matTooltipTrigger?: IObserver<MatTooltipTrigger>;
}

export const MatTooltipTriggerModifier = new MatFloatingTriggerModifier<
  MatTooltipTrigger,
  IMatTooltipTriggerModifierOptions
>(
  'mat-tooltip-trigger',
  ({
    matTooltipTrigger: $matTooltipTrigger,
    displayDelay = 0,
    hideDelay = 0,
    ...options
  }: IMatFloatingTriggerFactoryOptions<IMatTooltipTriggerModifierOptions>): MatTooltipTrigger => {
    const matTooltipTrigger = new MatTooltipTrigger(options);

    matTooltipTrigger.openOnMouseOver({
      displayDelay,
      hideDelay,
    });

    return matTooltipTrigger;
  },
);
