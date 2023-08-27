import { MatSnackbarComponent, IMatSnackbarVirtualComponentNode, IMatSnackbarComponentData } from '../mat-snackbar.component';
import { IMatSnackbarData } from '../types/mat-snackbar-data.type';
import { IMatOverlayQueueFactoryOptions, IMatOverlayQueueFactory } from '../../../shared/factories/queue/mat-overlay-queue-factory.type';
import { MatOverlay } from '../../../shared/instance/mat-overlay.class';
import { createMatOverlayQueueFactory } from '../../../shared/factories/queue/create/create-mat-overlay-queue-factory';
import {
  createMatOverlayOpenCloseOptionsForMatSnackbar,
  ICreateMatOverlayOpenCloseOptionsForMatSnackbarOptions,
} from '../animation/create-mat-overlay-open-close-options-for-mat-snackbar';
import { IMatOverlayState } from '../../../shared/instance/types/mat-overlay-state.type';
import { unknownToObservableAny, unknownToObservableNotUndefined } from '@lirx/core';

const MAT_SNACKBAR_QUEUE: IMatOverlayQueueFactory = createMatOverlayQueueFactory({
  queueStrategy: 'none',
});

export interface IOpenMatSnackbarOptions extends IMatOverlayQueueFactoryOptions, ICreateMatOverlayOpenCloseOptionsForMatSnackbarOptions {
  displayDuration?: number;
}

export function openMatSnackbar(
  {
    message,
    actionText,
    horizontalPosition,
    verticalPosition,
    width,
    onClickAction,
  }: IMatSnackbarData,
  {
    displayDuration,
    ...options
  }: IOpenMatSnackbarOptions = {},
): Promise<MatOverlay<IMatSnackbarVirtualComponentNode>> {
  return MAT_SNACKBAR_QUEUE<MatOverlay<IMatSnackbarVirtualComponentNode>>(
    (): MatOverlay<IMatSnackbarVirtualComponentNode> => {
      const instance = new MatOverlay<IMatSnackbarVirtualComponentNode>({
        node: MatSnackbarComponent.create(),
        ...createMatOverlayOpenCloseOptionsForMatSnackbar<HTMLElement, IMatSnackbarComponentData>(options),
      });

      instance.node.bindInputWithObservable('message', unknownToObservableAny(message));

      if (actionText !== void 0) {
        instance.node.bindInputWithObservable('actionText', unknownToObservableNotUndefined(actionText));
      }

      if (horizontalPosition !== void 0) {
        instance.node.bindInputWithObservable('horizontalPosition', unknownToObservableNotUndefined(horizontalPosition));
      }

      if (verticalPosition !== void 0) {
        instance.node.bindInputWithObservable('verticalPosition', unknownToObservableNotUndefined(verticalPosition));
      }

      if (width !== void 0) {
        instance.node.bindInputWithObservable('width', unknownToObservableNotUndefined(width));
      }

      if (onClickAction !== void 0) {
        instance.node.bindOutputWithObserver('clickAction', onClickAction);
      }

      if (
        (displayDuration !== void 0)
        && (displayDuration > 0)
      ) {
        let timer: any;

        const end = (): void => {
          if (timer !== void 0) {
            clearTimeout(timer);
            timer = void 0;
          }
          unsubscribe();
        };

        timer = setTimeout((): void => {
          end();
          void instance.close();
        }, displayDuration);

        const unsubscribe = instance.state$((state: IMatOverlayState): void => {
          if (
            (state === 'closing')
            || (state === 'closed')
          ) {
            end();
          }
        });
      }

      return instance;
    },
    options,
  );
}


