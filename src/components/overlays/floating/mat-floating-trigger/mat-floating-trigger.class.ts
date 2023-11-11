import { IGenericVirtualReactiveElementNode, IVirtualComponentNodeSlotTemplate, IStylePropertiesMapAsRecord } from '@lirx/dom';
import { IMatFloatingVirtualComponentNode } from '../mat-floating/mat-floating.component';
import {
  IMulticastReplayLastSource,
  IObservable,
  createMulticastReplayLastSource,
  single,
  switchMap$$,
  readObservableValue,
  UNABLE_TO_READ_OBSERVABLE,
  isMouseOverElementObservable, timeout, distinct$$,
} from '@lirx/core';
import { MatFloating } from '../mat-floating/factory/mat-floating.class';
import { IMatFloatingComputePositionConfig } from '../mat-floating/types/options/mat-floating-compute-position-config.type';
import { IUnsubscribe } from '@lirx/unsubscribe';
import { createMatFloatingReferenceFromVirtualElementNode } from '../functions/create-mat-floating-reference-from-virtual-element.node';
import { MatOverlay } from '../../shared/instance/mat-overlay.class';
import { IMatOverlayState } from '../../shared/instance/types/mat-overlay-state.type';

/** TYPES **/

export type IMatFloatingTriggerTemplate = IVirtualComponentNodeSlotTemplate<{ overlay: MatOverlay<IMatFloatingVirtualComponentNode>; }>;

export interface IMatFloatingTriggerOptions {
  readonly reference: IGenericVirtualReactiveElementNode;
  readonly content: IMatFloatingTriggerTemplate;
  readonly computePositionConfig: IMatFloatingComputePositionConfig;
  readonly cssVariables?: IStylePropertiesMapAsRecord;
}

export interface IMatFloatingTriggerOpenOnMouseOverOptions {
  readonly displayDelay?: number;
  readonly hideDelay?: number;
}

/** CLASS **/

export class MatFloatingTrigger {
  readonly #reference: IGenericVirtualReactiveElementNode;
  readonly #content: IMatFloatingTriggerTemplate;
  readonly #computePositionConfig: IMatFloatingComputePositionConfig;
  readonly #cssVariables: IStylePropertiesMapAsRecord | undefined;

  #overlay: MatOverlay<IMatFloatingVirtualComponentNode> | undefined;
  readonly #$state$: IMulticastReplayLastSource<IObservable<IMatOverlayState>>;
  readonly #state$: IObservable<IMatOverlayState>;

  #stopOpenOnClick: IUnsubscribe | undefined;
  #stopOpenOnMouseOver: IUnsubscribe | undefined;

  constructor(
    {
      reference,
      content,
      computePositionConfig,
      cssVariables,
    }: IMatFloatingTriggerOptions,
  ) {
    this.#reference = reference;
    this.#content = content;
    this.#computePositionConfig = computePositionConfig;
    this.#cssVariables = cssVariables;

    this.#overlay = void 0;
    this.#$state$ = createMulticastReplayLastSource<IObservable<IMatOverlayState>>(single<IMatOverlayState>('closed'));
    this.#state$ = switchMap$$(this.#$state$.subscribe, _ => _);

    this.#stopOpenOnClick = void 0;
    this.#stopOpenOnMouseOver = void 0;
  }

  get overlay(): MatOverlay<IMatFloatingVirtualComponentNode> | undefined {
    return this.#overlay;
  }

  get state(): IMatOverlayState {
    return readObservableValue<IMatOverlayState>(this.#state$, UNABLE_TO_READ_OBSERVABLE);
  }

  get state$(): IObservable<IMatOverlayState> {
    return this.#state$;
  }

  openOnClick(): void {
    if (this.#stopOpenOnClick === void 0) {
      this.#stopOpenOnClick = this.#reference.setEventListener('click', (): void => {
        this.open();
      });
    }
  }

  stopOpenOnClick(): void {
    if (this.#stopOpenOnClick !== void 0) {
      this.#stopOpenOnClick();
      this.#stopOpenOnClick = void 0;
    }
  }

  openOnMouseOver(
    {
      displayDelay = 0,
      hideDelay = 0,
    }: IMatFloatingTriggerOpenOnMouseOverOptions = {},
  ): void {
    if (this.#stopOpenOnMouseOver === void 0) {
      const mouseOver$ = distinct$$(
        switchMap$$(isMouseOverElementObservable(this.#reference.elementNode), (mouseOver: boolean): IObservable<boolean> => {
          return timeout(
            mouseOver
              ? displayDelay
              : hideDelay,
            () => mouseOver,
          );
        }),
      );

      this.#stopOpenOnMouseOver = this.#reference.onConnected((): IUnsubscribe => {
        return mouseOver$((mouseOver: boolean): void => {
          if (mouseOver) {
            const overlay = this.open();
            overlay.node.elementNode.querySelector<HTMLElement>('mat-floating-container')!.style.setProperty('pointer-events', 'none');
          } else {
            this.close();
          }
        });
      });
    }
  }

  stopOpenOnMouseOver(): void {
    if (this.#stopOpenOnMouseOver !== void 0) {
      this.#stopOpenOnMouseOver();
      this.#stopOpenOnMouseOver = void 0;
    }
  }

  open(): MatOverlay<IMatFloatingVirtualComponentNode> {
    if (this.#overlay === void 0) {
      const instance = MatFloating.open({
        reference: createMatFloatingReferenceFromVirtualElementNode(this.#reference),
        computePositionConfig: this.#computePositionConfig,
        cssVariables: this.#cssVariables,
        slots: new Map([
          ['*', this.#content],
        ]),
      });

      this.#$state$.emit(instance.state$);

      instance.node.bindOutputWithObserver('close', (): void => {
        this.close();
      });

      this.#overlay = instance;
    }

    return this.#overlay!;
  }

  close(): void {
    if (this.#overlay !== void 0) {
      this.#overlay!.close();
      this.#overlay = void 0;
    }
  }
}

