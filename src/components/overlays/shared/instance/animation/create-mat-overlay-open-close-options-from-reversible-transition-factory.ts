import { animate, IAnimateResult, ITransitionProgress, IVoidTransitionFunction } from '@lirx/animations';
import { VirtualNode } from '@lirx/dom';
import { noop } from '@lirx/utils';
import { IMatOverlayOptions } from '../types/mat-overlay-options.type';

export type IMatOverlayOpenCloseOptions<GNode extends VirtualNode> = Required<Pick<IMatOverlayOptions<GNode>, 'open' | 'close'>>;

export interface ICreateMatOverlayOpenCloseOptionsFromReversibleTransitionFactoryFactory<GNode extends VirtualNode> {
  (
    node: GNode,
    signal: AbortSignal,
  ): IVoidTransitionFunction | Promise<IVoidTransitionFunction>;
}

export interface ICreateMatOverlayFactoryOptionsFromReversibleTransitionFactoryOptions<GNode extends VirtualNode> {
  readonly transitionFactory: ICreateMatOverlayOpenCloseOptionsFromReversibleTransitionFactoryFactory<GNode>;
  readonly duration: number;
}

export function createMatOverlayOpenCloseOptionsFromReversibleTransitionFactory<GNode extends VirtualNode>(
  {
    transitionFactory,
    duration,
  }: ICreateMatOverlayFactoryOptionsFromReversibleTransitionFactoryOptions<GNode>,
): IMatOverlayOpenCloseOptions<GNode> {

  let _transition: IVoidTransitionFunction;
  let _progress: ITransitionProgress = 0;

  return {
    open: (
      node: GNode,
      signal: AbortSignal,
    ): Promise<void> => {
      return new Promise<IVoidTransitionFunction>(resolve => resolve(transitionFactory(node, signal)))
        .then((transition: IVoidTransitionFunction): Promise<IAnimateResult> => {
          if (signal.aborted) {
            throw signal.reason;
          } else {
            _transition = transition;
            return animate({
              transition,
              duration,
              signal,
            });
          }
        })
        .then((progress: IAnimateResult): void => {
          _progress = progress;
          if (signal.aborted) {
            throw signal.reason;
          }
        });
    },
    close: (): Promise<void> => {
      if (_transition === void 0) { // closed before transitionFactory finished
        return Promise.resolve();
      } else {
        const currentTime: number = (_progress === 1)
          ? 0
          : (1 - _progress) * duration;

        return animate({
          transition: (
            progress: ITransitionProgress,
          ): void => {
            return _transition(1 - progress);
          },
          duration,
          currentTime,
        })
          .then(noop);
      }
    },
  };
}
