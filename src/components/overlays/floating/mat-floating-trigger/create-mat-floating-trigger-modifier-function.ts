import {
  IObservable,
  IObservableLike,
  IObserver,
  isMaybeObserver,
  unknownToObservableNotUndefined,
} from '@lirx/core';
import { IGenericVirtualReactiveElementNode, VirtualReactiveElementNodeModifier } from '@lirx/dom';
import { IUnsubscribe, mergeUnsubscribeFunctions } from '@lirx/unsubscribe';
import { MatFloatingTrigger } from './mat-floating-trigger.class';

export interface IMatFloatingTriggerBaseOptions<GMatFloatingTrigger extends MatFloatingTrigger> {
  readonly $trigger?: IObserver<GMatFloatingTrigger>;
}

export type IMatFloatingTriggerFactoryOptions<
  GOptions extends IMatFloatingTriggerBaseOptions<any>,
> = GOptions & {
  readonly reference: IGenericVirtualReactiveElementNode;
};

export interface IMatFloatingTriggerFactory<
  GMatFloatingTrigger extends MatFloatingTrigger,
  GOptions extends IMatFloatingTriggerBaseOptions<GMatFloatingTrigger>,
> {
  (options: IMatFloatingTriggerFactoryOptions<GOptions>): GMatFloatingTrigger;
}

export class MatFloatingTriggerModifier<
  GMatFloatingTrigger extends MatFloatingTrigger,
  GOptions extends IMatFloatingTriggerBaseOptions<GMatFloatingTrigger>,
> extends VirtualReactiveElementNodeModifier<
  (node: IGenericVirtualReactiveElementNode, options: IObservableLike<GOptions>) => void
> {
  constructor(name: string, factory: IMatFloatingTriggerFactory<GMatFloatingTrigger, GOptions>) {
    super(
      name,
      (node: IGenericVirtualReactiveElementNode, options: IObservableLike<GOptions>): void => {
        node.setClass(name, true);

        const options$: IObservable<GOptions> = unknownToObservableNotUndefined(
          options,
        ) as IObservable<GOptions>;

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

          return mergeUnsubscribeFunctions([endMatFloatingTrigger, unsubscribeOfOptions]);
        });
      },
    );
  }
}
