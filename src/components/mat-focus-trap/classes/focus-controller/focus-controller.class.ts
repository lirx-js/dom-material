import { createMulticastReplayLastSource, IMulticastReplayLastSource, IObservable, fromActiveElement } from '@lirx/core';
import { createEventListener, noop } from '@lirx/utils';
import { IUnsubscribe, mergeUnsubscribeFunctions } from '@lirx/unsubscribe';
import { isHTMLElementFocusable, isHTMLElementTabbable, getFocusableHTMLElementsSorted, focusHTMLElement } from '@lirx/dom';
import {
  FOCUS_CONTROLLER_FOCUS_ERROR_NOT_FOCUSABLE_RESULT,
} from './methods/focus/result/error/not-focusable/focus-controller-focus-error-not-focusable-result.constant';
import {
  FOCUS_CONTROLLER_FOCUS_ERROR_PREVENTED_RESULT,
} from './methods/focus/result/error/prevented/focus-controller-focus-error-prevented-result.constant';
import { IFocusControllerFocusResult } from './methods/focus/result/focus-controller-focus-result.type';
import { FOCUS_CONTROLLER_FOCUS_SUCCESS_RESULT } from './methods/focus/result/success/focus-controller-focus-success-result.constant';
import { IGetNextTabbableElementOptions } from './methods/get-next-tabbable-element/get-next-tabbable-element-options.type';
import { IFocusControllerOnFocusChangeFunction } from './types/options/focus-controller-on-focus-change-function.type';
import { IFocusControllerOnFocusNextFunction } from './types/options/focus-controller-on-focus-next-function.type';
import { IFocusControllerOptions } from './types/options/focus-controller-options.type';

/*
https://github.com/focus-trap/tabbable/blob/master/src/index.js
https://github.com/focus-trap/focus-trap/blob/master/index.js#L457
 */

export class FocusController {
  static readonly NEXT_LOOP = function(
    this: FocusController,
    backward: boolean,
  ): void {
    this.focus(
      this.getNextTabbableElement({
        element: this.focusedElement,
        loop: true,
        backward,
      }),
    );
  };

  static readonly NEXT_CLAMP = function(
    this: FocusController,
    backward: boolean,
  ): void {
    const next: HTMLElement | null = this.getNextTabbableElement({
      element: this.focusedElement,
      loop: false,
      backward,
    });

    if (next !== null) {
      this.focus(next);
    }
  };

  static readonly NEXT_LOOP_PARENT = function(
    this: FocusController,
    backward: boolean,
  ): void {
    this.focus(
      this.getNextTabbableElement({
        element: this.focusedElement,
        loop: false,
        backward,
      }),
    );
  };

  readonly #container: HTMLElement;
  readonly #change: IFocusControllerOnFocusChangeFunction;
  readonly #next: IFocusControllerOnFocusNextFunction;

  readonly #$focusedElement$: IMulticastReplayLastSource<HTMLElement | null>;
  #stop: IUnsubscribe | undefined;

  constructor(
    {
      container = document.body,
      change = noop,
      next = FocusController.NEXT_LOOP,
    }: IFocusControllerOptions = {},
  ) {
    this.#container = container;
    container.tabIndex = -1;
    this.#change = change;
    this.#next = next;

    this.#$focusedElement$ = createMulticastReplayLastSource<HTMLElement | null>(null);
    this.#stop = void 0;
  }

  get running(): boolean {
    return this.#stop !== void 0;
  }

  get focusedElement(): HTMLElement | null {
    return this.#$focusedElement$.getValue();
  }

  get focusedElement$(): IObservable<HTMLElement | null> {
    return this.#$focusedElement$.subscribe;
  }

  start(): this {
    if (this.#stop === void 0) {
      this.#focusCurrent();

      const unsubscribeOfKeyDown = createEventListener(this.#container, 'keydown', (event: KeyboardEvent): void => {
        if (event.key === 'Tab') {
          event.preventDefault();
          this.#next(event.shiftKey);
        }
      });

      const unsubscribeOfActiveElement = fromActiveElement()((activeElement: Element | null): void => {
        if (
          (activeElement === null)
          || !this.#container.contains(activeElement)
          || (activeElement === this.#container)
        ) {
          this.focus(null);
        } else {
          this.focus(activeElement! as HTMLElement);
        }
      });

      this.#stop = mergeUnsubscribeFunctions([
        unsubscribeOfKeyDown,
        unsubscribeOfActiveElement,
      ]);
    }

    return this;
  }

  stop(): this {
    if (this.#stop !== void 0) {
      this.#stop();
      this.#stop = void 0;
    }

    return this;
  }

  isHTMLElementFocusable(
    element: HTMLElement,
  ): boolean {
    return isHTMLElementFocusable(element);
  }

  isHTMLElementTabbable(
    element: HTMLElement,
  ): boolean {
    return isHTMLElementTabbable(element);
  }

  getFocusableElementsSorted(
    reverse?: boolean,
  ): HTMLElement[] {
    return getFocusableHTMLElementsSorted(
      this.#container,
      reverse,
    );
  }

  getNextTabbableElement(
    {
      element = this.focusedElement,
      loop = false,
      backward = false,
    }: IGetNextTabbableElementOptions = {},
  ): HTMLElement | null {
    if (element === null) {
      const focusableElements: HTMLElement[] = this.getFocusableElementsSorted();
      if (backward) {
        focusableElements.reverse();
      }
      let index: number = 0;
      while (index < focusableElements.length) {
        if (getFocusableHTMLElementsSorted(focusableElements[index])) {
          return focusableElements[index];
        }
        index++;
      }
      return null;
    } else {
      if (
        this.#container.contains(element)
        && !(element === this.#container)
      ) {
        const focusableElements: HTMLElement[] = this.getFocusableElementsSorted();
        if (backward) {
          focusableElements.reverse();
        }
        const index: number = focusableElements.indexOf(element);
        if (index === -1) {
          throw new Error(`Given element is not focusable`);
        } else {
          let nextIndex: number = index + 1;
          while (nextIndex < focusableElements.length) {
            if (getFocusableHTMLElementsSorted(focusableElements[nextIndex])) {
              return focusableElements[nextIndex];
            }
            nextIndex++;
          }
          if (loop) {
            let nextIndex: number = 0;
            while (nextIndex < index) {
              if (getFocusableHTMLElementsSorted(focusableElements[nextIndex])) {
                return focusableElements[nextIndex];
              }
              nextIndex++;
            }
            return null;
          } else {
            return null;
          }
        }
      } else {
        throw new Error(`Given element is not a child of this container`);
      }
    }
  }

  focus(
    element: HTMLElement | null,
  ): IFocusControllerFocusResult {
    if (element === null) {
      if (this.focusedElement === null) {
        if (document.activeElement !== this.#container) {
          if (!focusHTMLElement(this.#container)) {
            throw new Error(`Unable to focus element.`);
          }
        }
        return FOCUS_CONTROLLER_FOCUS_SUCCESS_RESULT;
      } else {
        if (this.#change({ before: this.focusedElement, after: null }) === false) {
          return FOCUS_CONTROLLER_FOCUS_ERROR_PREVENTED_RESULT;
        } else {
          focusHTMLElement(this.#container);
          this.#$focusedElement$.emit(null);
          return FOCUS_CONTROLLER_FOCUS_SUCCESS_RESULT;
        }
      }
    } else {
      if (
        this.#container.contains(element)
        && !(element === this.#container)
      ) {
        if (this.isHTMLElementFocusable(element)) {
          if (element === this.focusedElement) {
            if (document.activeElement !== element) {
              if (!focusHTMLElement(element)) {
                throw new Error(`Unable to focus element.`);
              }
            }
            return FOCUS_CONTROLLER_FOCUS_SUCCESS_RESULT;
          } else {
            if (this.#change({ before: this.focusedElement, after: element }) === false) {
              return FOCUS_CONTROLLER_FOCUS_ERROR_PREVENTED_RESULT;
            } else {
              if (focusHTMLElement(element)) {
                this.#$focusedElement$.emit(element);
                return FOCUS_CONTROLLER_FOCUS_SUCCESS_RESULT;
              } else {
                if (!this.#focusCurrent()) {
                  throw new Error(`Unable to focus element.`);
                }
                return FOCUS_CONTROLLER_FOCUS_ERROR_NOT_FOCUSABLE_RESULT;
              }
            }
          }
        } else {
          return FOCUS_CONTROLLER_FOCUS_ERROR_NOT_FOCUSABLE_RESULT;
        }
      } else {
        throw new Error(`Given element is not a child of this container`);
      }
    }
  }

  /** PRIVATE **/

  #focusCurrent(): boolean {
    if (this.focusedElement === null) {
      return focusHTMLElement(this.#container);
    } else {
      return focusHTMLElement(this.focusedElement);
    }
  }
}
