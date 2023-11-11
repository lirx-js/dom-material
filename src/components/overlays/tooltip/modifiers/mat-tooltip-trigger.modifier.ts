import { IObserver } from '@lirx/core';
import { createVirtualReactiveElementNodeModifier, VirtualDOMNode } from '@lirx/dom';
import { MatTooltipTrigger, IMatTooltipTriggerOptions } from './mat-tooltip-trigger.class';
import {
  createMatFloatingTriggerModifierFunction,
  ICreateMatFloatingTriggerFactoryOptions,
  IMatMatFloatingTriggerBaseOptions,
} from '../../floating/mat-floating-trigger/create-mat-floating-trigger-modifier-function';
import { IMatFloatingTriggerOpenOnMouseOverOptions } from '../../floating/mat-floating-trigger/mat-floating-trigger.class';

export interface IMatTooltipTriggerModifierOptions extends //
  Omit<IMatTooltipTriggerOptions, 'reference'>,
  IMatMatFloatingTriggerBaseOptions<MatTooltipTrigger>,
  IMatFloatingTriggerOpenOnMouseOverOptions
//
{
  readonly matTooltipTrigger?: IObserver<MatTooltipTrigger>;
}

export const matTooltipTriggerModifierFunction = createMatFloatingTriggerModifierFunction<MatTooltipTrigger, IMatTooltipTriggerModifierOptions>(
  'mat-tooltip-trigger',
  (
    {
      matTooltipTrigger: $matTooltipTrigger,
      displayDelay = 0,
      hideDelay = 0,
      ...options
    }: ICreateMatFloatingTriggerFactoryOptions<IMatTooltipTriggerModifierOptions>,
  ): MatTooltipTrigger => {
    const matTooltipTrigger = new MatTooltipTrigger(options);

    matTooltipTrigger.openOnMouseOver({
      displayDelay,
      hideDelay,
    });

    return matTooltipTrigger;
  },
);

export const MatTooltipTriggerModifier = createVirtualReactiveElementNodeModifier<IMatTooltipTriggerModifierOptions, VirtualDOMNode>('mat-tooltip-trigger', matTooltipTriggerModifierFunction);


