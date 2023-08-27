import { createMulticastReplayLastSource, IMulticastReplayLastSource, IObservable, IObservableToPromiseOptions } from '@lirx/core';
import { VirtualNode } from '@lirx/dom';
import { MatOverlayContainer } from '../container/mat-overlay-container.class';
import { IMatOverlayCloseFunction } from './types/mat-overlay-close-function.type';
import { IMatOverlayOptions } from './types/mat-overlay-options.type';
import { IMatOverlayState } from './types/mat-overlay-state.type';
import {
  createEventListener,
  createAbortError,
  noop,
} from '@lirx/utils';
import {
  futureUnsubscribe,
  IUnsubscribe,
  IRunning,
  mergeUnsubscribeFunctions,
} from '@lirx/unsubscribe';

/** CONSTANTS **/


const DEFAULT_MAT_OVERLAY_INSTANCE_OPEN_FUNCTION = () => Promise.resolve();
const DEFAULT_MAT_OVERLAY_INSTANCE_CLOSE_FUNCTION = () => Promise.resolve();

const STATE_ORDER: Record<IMatOverlayState, number> = {
  'opening': 0,
  'opened': 1,
  'closing': 2,
  'closed': 3,
};

/** CLASS **/

/**
 * This class controls the state of an overlay.
 */
export class MatOverlay<GNode extends VirtualNode> {
  readonly #node: GNode;
  readonly #$state$: IMulticastReplayLastSource<IMatOverlayState>;
  readonly #controller: AbortController;
  readonly #close: IMatOverlayCloseFunction<GNode>;
  #stateUpdatingPromise: Promise<void>;

  constructor(
    {
      node,
      open = DEFAULT_MAT_OVERLAY_INSTANCE_OPEN_FUNCTION,
      close = DEFAULT_MAT_OVERLAY_INSTANCE_CLOSE_FUNCTION,
    }: IMatOverlayOptions<GNode>,
  ) {
    this.#node = node;
    this.#$state$ = createMulticastReplayLastSource<IMatOverlayState>('opening');
    this.#controller = new AbortController();
    this.#close = close;

    node.attach(MatOverlayContainer.node);

    this.#stateUpdatingPromise = open(node, this.#controller.signal)
      .then(
        (): void => {
          this.#$state$.emit('opened');
        },
        (error: unknown): void => {
          if (!this.#controller.signal.aborted) {
            throw error;
          }
        },
      );
  }

  get node(): GNode {
    return this.#node;
  }

  get state(): IMatOverlayState {
    return this.#$state$.getValue();
  }

  get state$(): IObservable<IMatOverlayState> {
    return this.#$state$.subscribe;
  }

  untilState<GState extends IMatOverlayState>(
    state: GState,
    {
      signal,
    }: IObservableToPromiseOptions = {},
  ): Promise<void> {
    return new Promise<void>((
      resolve: () => void,
      reject: (reason?: any) => void,
    ): void => {
      if (signal?.aborted) {
        throw createAbortError({ signal });
      } else {
        futureUnsubscribe((
          unsubscribe: IUnsubscribe,
          running: IRunning,
        ): IUnsubscribe => {

          const unsubscribeOfAbort = (signal === void 0)
            ? noop
            : createEventListener(signal, 'abort', (): void => {
              if (running()) {
                reject(createAbortError({ signal }));
                unsubscribe();
              }
            });

          return mergeUnsubscribeFunctions([
            this.state$((_state: IMatOverlayState): void => {
              if (running()) {
                if (_state === state) {
                  resolve();
                  unsubscribe();
                } else if (
                  STATE_ORDER[_state] > STATE_ORDER[state]
                ) {
                  reject(new Error(`Cannot reach state "${state}" because the overlay is already in a "${_state}" state.`));
                  unsubscribe();
                }
              }
            }),
            unsubscribeOfAbort,
          ]);
        });
      }
    });
  }

  close(): Promise<void> {
    if (
      (this.state === 'opening')
      || (this.state === 'opened')
    ) {
      this.#controller.abort();
      this.#$state$.emit('closing');
      this.#stateUpdatingPromise = this.#stateUpdatingPromise
        .then((): Promise<void> => {
          return this.#close(this.#node);
        })
        .then((): void => {
          this.#node.detach();
          this.#$state$.emit('closed');
        });
    }
    return this.#stateUpdatingPromise;
  }
}
