import { IGenericMatOverlay } from '../../instance/types/generic-mat-overlay.type';

export interface IMatOverlayQueueFactoryFactory<GOverlay extends IGenericMatOverlay> {
  (): PromiseLike<GOverlay> | GOverlay;
}

export type IMatOverlayQueueFactoryStrategy =
  | 'none'
  | 'until-closed'
  ;

export interface IMatOverlayQueueFactoryOptions {
  queueStrategy?: IMatOverlayQueueFactoryStrategy;
}

export interface IMatOverlayQueueFactory {
  <GOverlay extends IGenericMatOverlay>(
    factory: IMatOverlayQueueFactoryFactory<GOverlay>,
    options?: IMatOverlayQueueFactoryOptions,
  ): Promise<GOverlay>;
}
