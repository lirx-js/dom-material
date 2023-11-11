import { IMatFloatingPlacement } from '../mat-floating/types/options/mat-floating-placement';
import { roundByDPR } from '../../../../functions/round-by-dpr';

export interface ISetMatFloatingPositionOptions {
  readonly element: HTMLElement;
  readonly x: number;
  readonly y: number;
  readonly placement: IMatFloatingPlacement;
}

export function setMatFloatingPosition(
  {
    element,
    x,
    y,
    placement,
  }: ISetMatFloatingPositionOptions,
): void {
  const _x: string = `${roundByDPR(x)}px`;
  const _y: string = `${roundByDPR(y)}px`;

  element.style.setProperty('--mat-floating-x', _x);
  element.style.setProperty('--mat-floating-y', _y);
  // element.style.translate = `${_x} ${_y}`;
  element.setAttribute('placement', placement);
}
