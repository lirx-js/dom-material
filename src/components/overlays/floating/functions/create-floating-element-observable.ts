import { computePosition, ComputePositionReturn, FloatingElement, ReferenceElement } from '@floating-ui/dom';
import { IObservable, IObserver, IUnsubscribeOfObservable } from '@lirx/core';
import { IMatFloatingComputePositionConfig } from '../mat-floating/types/options/mat-floating-compute-position-config.type';

export interface IFloatingElementPosition extends ComputePositionReturn {
  readonly reference: ReferenceElement;
  readonly floating: FloatingElement;
}

export function createFloatingElementObservable(
  reference: ReferenceElement,
  floating: FloatingElement,
  {
    updateInterval = 100,
    ...options
  }: IMatFloatingComputePositionConfig = {},
): IObservable<IFloatingElementPosition> {
  return (emit: IObserver<IFloatingElementPosition>): IUnsubscribeOfObservable => {
    let running: boolean = true;

    const loop = (): Promise<void> => {
      const startTime: number = Date.now();
      return computePosition(reference, floating, options)
        .then((result: ComputePositionReturn): void => {
          if (running) {
            emit({
              ...result,
              reference,
              floating,
            });
          }
        })
        .then((): Promise<void> | void => {
          if (running) {
            const remainingTime: number = Math.max(0, updateInterval - (Date.now() - startTime));
            return new Promise<void>(resolve => setTimeout(resolve, remainingTime));
          }
        })
        .then((): Promise<void> | void => {
          if (running) {
            return loop();
          }
        });
    };

    void loop();

    return (): void => {
      if (running) {
        running = false;
      }
    };
  };
}
