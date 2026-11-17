import { IObserver } from '@lirx/core';
import {
  IMatFloatingTriggerBaseOptions,
  IMatFloatingTriggerFactoryOptions,
  MatFloatingTriggerModifier,
} from '../../floating/mat-floating-trigger/create-mat-floating-trigger-modifier-function';
import { IMatMenuTriggerOptions, MatMenuTrigger } from './mat-menu-trigger.class';

export interface IMatMenuTriggerModifierOptions
  extends Omit<IMatMenuTriggerOptions, 'reference'>,
    IMatFloatingTriggerBaseOptions<MatMenuTrigger> {
  readonly matMenuTrigger?: IObserver<MatMenuTrigger>;
}

export const MatMenuTriggerModifier = new MatFloatingTriggerModifier<
  MatMenuTrigger,
  IMatMenuTriggerModifierOptions
>(
  'mat-menu-trigger',
  ({
    matMenuTrigger: $matMenuTrigger,
    ...options
  }: IMatFloatingTriggerFactoryOptions<IMatMenuTriggerModifierOptions>): MatMenuTrigger => {
    const matMenuTrigger = new MatMenuTrigger(options);

    matMenuTrigger.openOnClick();

    return matMenuTrigger;
  },
);
