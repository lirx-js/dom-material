import { IGenericMatOverlay } from '../../instance/types/generic-mat-overlay.type';

export interface IMatOverlayFactory<GArguments extends readonly any[], GOverlay extends IGenericMatOverlay> {
  (
    ...args: GArguments
  ): GOverlay;
}
