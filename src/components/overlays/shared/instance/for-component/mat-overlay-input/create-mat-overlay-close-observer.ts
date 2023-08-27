import { VirtualComponentNode } from '@lirx/dom';
import { IObservable, IObserver, map$$ } from '@lirx/core';
import { IHavingMatOverlayInput, getMatOverlayInput, IMatOverlayInputValue } from './mat-overlay-input';

export interface ICreateMatOverlayCloseObserverFilterFunction<GValue> {
  (
    value: GValue,
  ): boolean;
}

export function createMatOverlayCloseObserver<GValue>(
  node: VirtualComponentNode<any, IHavingMatOverlayInput<any, any>>,
  filter: (value: GValue) => boolean = () => true,
): IObservable<IObserver<GValue>> {
  return map$$(getMatOverlayInput(node).subscribe, (matOverlay: IMatOverlayInputValue<any, any>): IObserver<GValue> => {
    return (
      value: GValue,
    ): void => {
      if (filter(value)) {
        matOverlay.close();
      }
    };
  });
}
