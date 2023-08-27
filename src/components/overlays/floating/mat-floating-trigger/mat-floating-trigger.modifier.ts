import { createVirtualReactiveElementNodeModifier, VirtualDOMNode } from '@lirx/dom';
import {
  createMatFloatingTriggerModifierFunction,
  ICreateMatFloatingTriggerFactoryOptions,
  IMatMatFloatingTriggerBaseOptions,
} from './create-mat-floating-trigger-modifier-function';
import { MatMenuTrigger } from '../../menu/mat-menu-trigger/mat-menu-trigger.class';
import { MatFloatingTrigger, IMatFloatingTriggerOptions } from './mat-floating-trigger.class';

/**
 * INFO: should only be used as example
 */

/**
 * @deprecated
 */
export interface IMatMatFloatingTriggerOptions extends Omit<IMatFloatingTriggerOptions, 'reference'>, IMatMatFloatingTriggerBaseOptions<MatFloatingTrigger> {
}

/**
 * @deprecated
 */
export const matFloatingTriggerModifierFunction = createMatFloatingTriggerModifierFunction<MatFloatingTrigger, IMatMatFloatingTriggerOptions>(
  'mat-floating-trigger',
  (
    options: ICreateMatFloatingTriggerFactoryOptions<IMatMatFloatingTriggerOptions>,
  ): MatMenuTrigger => {
    return new MatFloatingTrigger(options);
  },
);

/**
 * @deprecated
 */
export const MatFloatingTriggerModifier = createVirtualReactiveElementNodeModifier<IMatMatFloatingTriggerOptions, VirtualDOMNode>('mat-floating-trigger', matFloatingTriggerModifierFunction);
