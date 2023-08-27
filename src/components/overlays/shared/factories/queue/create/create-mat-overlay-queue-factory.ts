import {
  IMatOverlayQueueFactory,
  IMatOverlayQueueFactoryFactory,
  IMatOverlayQueueFactoryOptions,
} from '../mat-overlay-queue-factory.type';
import { IGenericMatOverlay } from '../../../instance/types/generic-mat-overlay.type';
import { noop } from '@lirx/utils';

export type ICreateMatOverlayQueueFactoryOptions = Required<IMatOverlayQueueFactoryOptions>;

export function createMatOverlayQueueFactory(
  {
    queueStrategy: defaultQueueStrategy,
  }: ICreateMatOverlayQueueFactoryOptions,
): IMatOverlayQueueFactory {
  let queue: Promise<IGenericMatOverlay> | undefined;

  return <GOverlay extends IGenericMatOverlay>(
    factory: IMatOverlayQueueFactoryFactory<GOverlay>,
    {
      queueStrategy = defaultQueueStrategy,
    }: IMatOverlayQueueFactoryOptions = {},
  ): Promise<GOverlay> => {
    const _queue: Promise<void> = (queue === void 0)
      ? Promise.resolve()
      : queue!
        .then((overlay: IGenericMatOverlay) => overlay.close(), noop);

    const overlayPromise: Promise<GOverlay> = _queue
      .then(factory);

    switch (queueStrategy) {
      case 'none':
        queue = overlayPromise;
        break;
      case 'until-closed':
        queue = overlayPromise
          .then((instance: GOverlay): Promise<GOverlay> => {
            return instance.untilState('closed')
              .then((): GOverlay => instance);
          });
        break;
      default:
        throw new Error(`Unknown queueStrategy: ${queueStrategy}`);
    }

    return overlayPromise;
  };
}
