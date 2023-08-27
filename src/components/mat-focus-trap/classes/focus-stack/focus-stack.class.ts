import { noop } from '@lirx/utils';
import { FocusController } from '../focus-controller/focus-controller.class';
import { IFocusControllerOptions } from '../focus-controller/types/options/focus-controller-options.type';

export interface IFocusStackOnActivateFunction {
  (): void;
}

export interface IFocusStackOnDeactivateFunction {
  (): void;
}

let MAT_FOCUS_STACK_ROOT_INSTANCE: FocusStack;

export class FocusStack {
  static #stack: readonly FocusStack[] = [];

  static get root(): FocusStack {
    return this.init();
  }

  static init(
    options?: IFocusControllerOptions,
  ): FocusStack {
    if (MAT_FOCUS_STACK_ROOT_INSTANCE === void 0) {
      MAT_FOCUS_STACK_ROOT_INSTANCE = FocusStack.controller(
        new FocusController(options),
      );
      MAT_FOCUS_STACK_ROOT_INSTANCE.activate();
    }
    return MAT_FOCUS_STACK_ROOT_INSTANCE;
  }

  static controller(
    controller: FocusController,
  ): FocusStack {
    return new FocusStack(
      (): void => {
        controller.start();
      },
      (): void => {
        controller.stop();
      },
    );
  }

  readonly #onActivate: IFocusStackOnActivateFunction;
  readonly #onDeactivate: IFocusStackOnDeactivateFunction;

  constructor(
    onActivate: IFocusStackOnActivateFunction,
    onDeactivate: IFocusStackOnDeactivateFunction = noop,
  ) {
    this.#onActivate = onActivate;
    this.#onDeactivate = onDeactivate;
  }

  get active(): boolean {
    return (FocusStack.#stack.length > 0)
      && (FocusStack.#stack[FocusStack.#stack.length - 1] === this);
  }

  activate(): boolean {
    if (this.active) { // already activated
      return false;
    } else {
      const index: number = FocusStack.#stack.indexOf(this);

      if (index === -1) { // new in the stack
        FocusStack.#stack = [
          ...FocusStack.#stack,
          this,
        ];
      } else { // change position in the stack
        FocusStack.#stack = [
          ...FocusStack.#stack.slice(0, index),
          ...FocusStack.#stack.slice(index + 1),
          this,
        ];
      }

      if (FocusStack.#stack.length > 1) { // we have a previously activated one
        FocusStack.#stack[FocusStack.#stack.length - 2].#onDeactivate();
      }
      this.#onActivate();

      return true;
    }
  }

  remove(): boolean {
    const index: number = FocusStack.#stack.indexOf(this);

    if (index === -1) { // not in the stack
      return false;
    } else {
      if (index === FocusStack.#stack.length - 1) { // it's the active one
        FocusStack.#stack = FocusStack.#stack.slice(0, index);
        this.#onDeactivate();

        if (FocusStack.#stack.length > 0) {
          FocusStack.#stack[FocusStack.#stack.length - 1].#onActivate();
        }
      } else {
        FocusStack.#stack = [
          ...FocusStack.#stack.slice(0, index),
          ...FocusStack.#stack.slice(index + 1),
        ];
      }
      return true;
    }
  }
}
