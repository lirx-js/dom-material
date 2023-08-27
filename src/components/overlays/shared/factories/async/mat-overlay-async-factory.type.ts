import { IGenericMatOverlay } from '../../instance/types/generic-mat-overlay.type';

export interface IMatOverlayAsyncFactory<GArguments extends readonly any[], GOverlay extends IGenericMatOverlay> {
  (
    ...args: GArguments
  ): Promise<GOverlay>;
}
