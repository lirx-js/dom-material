import { IObserver } from '@lirx/core';
import { createVirtualReactiveElementNodeModifier, VirtualDOMNode } from '@lirx/dom';
import { MatMenuTrigger, IMatMenuTriggerOptions } from './mat-menu-trigger.class';
import {
  createMatFloatingTriggerModifierFunction,
  ICreateMatFloatingTriggerFactoryOptions,
  IMatMatFloatingTriggerBaseOptions,
} from '../../floating/mat-floating-trigger/create-mat-floating-trigger-modifier-function';

export interface IMatMenuTriggerModifierOptions extends Omit<IMatMenuTriggerOptions, 'reference'>, IMatMatFloatingTriggerBaseOptions<MatMenuTrigger> {
  matMenuTrigger?: IObserver<MatMenuTrigger>;
}

export const matMenuTriggerModifierFunction = createMatFloatingTriggerModifierFunction<MatMenuTrigger, IMatMenuTriggerModifierOptions>(
  'mat-menu-trigger',
  (
    {
      matMenuTrigger: $matMenuTrigger,
      ...options
    }: ICreateMatFloatingTriggerFactoryOptions<IMatMenuTriggerModifierOptions>,
  ): MatMenuTrigger => {
    const matMenuTrigger = new MatMenuTrigger(options);

    matMenuTrigger.openOnClick();

    return matMenuTrigger;
  },
);

export const MatMenuTriggerModifier = createVirtualReactiveElementNodeModifier<IMatMenuTriggerModifierOptions, VirtualDOMNode>('mat-menu-trigger', matMenuTriggerModifierFunction);


