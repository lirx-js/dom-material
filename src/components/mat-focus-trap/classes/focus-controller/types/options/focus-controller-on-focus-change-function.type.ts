export interface IFocusControllerOnFocusChangeOptions {
  before: HTMLElement | null;
  after: HTMLElement | null;
}

export interface IFocusControllerOnFocusChangeFunction {
  (
    options: IFocusControllerOnFocusChangeOptions,
  ): boolean | void;
}
