import { IObserver } from '@lirx/core';
import { createVirtualReactiveElementNodeModifier, VirtualDOMNode } from '@lirx/dom';
import { MatTooltipTrigger, IMatTooltipTriggerOptions } from './mat-tooltip-trigger.class';
import {
  createMatFloatingTriggerModifierFunction,
  ICreateMatFloatingTriggerFactoryOptions,
  IMatMatFloatingTriggerBaseOptions,
} from '../../floating/mat-floating-trigger/create-mat-floating-trigger-modifier-function';

export interface IMatTooltipTriggerModifierOptions extends Omit<IMatTooltipTriggerOptions, 'reference'>, IMatMatFloatingTriggerBaseOptions<MatTooltipTrigger> {
  matTooltipTrigger?: IObserver<MatTooltipTrigger>;
}

export const matTooltipTriggerModifierFunction = createMatFloatingTriggerModifierFunction<MatTooltipTrigger, IMatTooltipTriggerModifierOptions>(
  'mat-tooltip-trigger',
  (
    {
      matTooltipTrigger: $matTooltipTrigger,
      ...options
    }: ICreateMatFloatingTriggerFactoryOptions<IMatTooltipTriggerModifierOptions>,
  ): MatTooltipTrigger => {
    const matTooltipTrigger = new MatTooltipTrigger(options);

    matTooltipTrigger.openOnMouseOver();

    return matTooltipTrigger;
  },
);

export const MatTooltipTriggerModifier = createVirtualReactiveElementNodeModifier<IMatTooltipTriggerModifierOptions, VirtualDOMNode>('mat-tooltip-trigger', matTooltipTriggerModifierFunction);


