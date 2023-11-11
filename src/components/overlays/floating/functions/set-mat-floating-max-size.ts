import { floorByDPR } from '../../../../functions/round-by-dpr';

export interface ISetMatFloatingMaxSizeOptions {
  readonly element: HTMLElement;
  readonly maxWidth: number;
  readonly maxHeight: number;
}

export function setMatFloatingMaxSize(
  {
    element,
    maxWidth,
    maxHeight,
  }: ISetMatFloatingMaxSizeOptions,
): void {
  const _maxWidth: string = (maxWidth === Number.POSITIVE_INFINITY)
    ? 'none'
    : `${floorByDPR(maxWidth)}px`;

  const _maxHeight: string = (maxHeight === Number.POSITIVE_INFINITY)
    ? 'none'
    : `${floorByDPR(maxHeight)}px`;

  element.style.setProperty('--mat-floating-max-width', _maxWidth);
  element.style.setProperty('--mat-floating-max-height', _maxHeight);

  // Object.assign(element.style, {
  //   maxWidth: _maxWidth,
  //   maxHeight: _maxHeight,
  // });
}
