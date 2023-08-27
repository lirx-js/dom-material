import { IVirtualReactiveElementNodeModifierFunction, VirtualDOMNode, IGenericVirtualReactiveElementNode } from '@lirx/dom';
import { IObservableLike, IObservable, unknownToObservableNotUndefined, IObserver, isMaybeObserver } from '@lirx/core';
import { IUnsubscribe, mergeUnsubscribeFunctions } from '@lirx/unsubscribe';
import { MatFloatingTrigger } from './mat-floating-trigger.class';

export interface IMatMatFloatingTriggerBaseOptions<GMatFloatingTrigger extends MatFloatingTrigger> {
  $trigger?: IObserver<GMatFloatingTrigger>;
}

export type ICreateMatFloatingTriggerFactoryOptions<GOptions extends IMatMatFloatingTriggerBaseOptions<any>> =
  GOptions
  & {
  reference: IGenericVirtualReactiveElementNode;
};

export interface ICreateMatFloatingTriggerFactory<GMatFloatingTrigger extends MatFloatingTrigger, GOptions extends IMatMatFloatingTriggerBaseOptions<GMatFloatingTrigger>> {
  (
    options: ICreateMatFloatingTriggerFactoryOptions<GOptions>,
  ): GMatFloatingTrigger;
}

export function createMatFloatingTriggerModifierFunction<GMatFloatingTrigger extends MatFloatingTrigger, GOptions extends IMatMatFloatingTriggerBaseOptions<GMatFloatingTrigger>>(
  name: string,
  factory: ICreateMatFloatingTriggerFactory<GMatFloatingTrigger, GOptions>,
): IVirtualReactiveElementNodeModifierFunction<GOptions, VirtualDOMNode> {
  return (
    node: IGenericVirtualReactiveElementNode,
    options: IObservableLike<GOptions>,
  ): VirtualDOMNode => {
    node.setClass(name, true);

    const options$: IObservable<GOptions> = unknownToObservableNotUndefined(options) as IObservable<GOptions>;

    node.onConnected((): IUnsubscribe => {
      let matFloatingTrigger: MatFloatingTrigger;

      const endMatFloatingTrigger = (): void => {
        if (matFloatingTrigger !== void 0) {
          matFloatingTrigger.close();
        }
      };

      const unsubscribeOfOptions = options$((options: GOptions): void => {
        endMatFloatingTrigger();

        matFloatingTrigger = factory({
          ...options,
          reference: node,
        });

        if (isMaybeObserver(options.$trigger)) {
          options.$trigger(matFloatingTrigger);
        }
      });

      return mergeUnsubscribeFunctions([
        endMatFloatingTrigger,
        unsubscribeOfOptions,
      ]);
    });

    return node;
  };
}
