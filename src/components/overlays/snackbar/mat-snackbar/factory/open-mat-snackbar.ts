import {
  MatSnackbarComponent,
  IMatSnackbarVirtualComponentNode,
  IMatSnackbarComponentData,
  IMatSnackbarVirtualComponent,
} from '../mat-snackbar.component';
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
import { MatVirtualComponentOverlay } from '../../../shared/instance/for-component/mat-virtual-component-overlay.class';

const MAT_SNACKBAR_QUEUE: IMatOverlayQueueFactory = createMatOverlayQueueFactory({
  queueStrategy: 'none',
});

export interface IOpenMatSnackbarOptions extends IMatOverlayQueueFactoryOptions, ICreateMatOverlayOpenCloseOptionsForMatSnackbarOptions {
  readonly displayDuration?: number;
}

// TODO
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
      const overlay = new MatVirtualComponentOverlay<IMatSnackbarVirtualComponent>({
        component: MatSnackbarComponent,
        ...createMatOverlayOpenCloseOptionsForMatSnackbar<HTMLElement, IMatSnackbarComponentData>(options),
      });

      overlay.node.bindInputWithObservable('message', unknownToObservableAny(message));

      if (actionText !== void 0) {
        overlay.node.bindInputWithObservable('actionText', unknownToObservableNotUndefined(actionText));
      }

      if (horizontalPosition !== void 0) {
        overlay.node.bindInputWithObservable('horizontalPosition', unknownToObservableNotUndefined(horizontalPosition));
      }

      if (verticalPosition !== void 0) {
        overlay.node.bindInputWithObservable('verticalPosition', unknownToObservableNotUndefined(verticalPosition));
      }

      if (width !== void 0) {
        overlay.node.bindInputWithObservable('width', unknownToObservableNotUndefined(width));
      }

      if (onClickAction !== void 0) {
        overlay.node.bindOutputWithObserver('clickAction', onClickAction);
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
          void overlay.close();
        }, displayDuration);

        const unsubscribe = overlay.state$((state: IMatOverlayState): void => {
          if (
            (state === 'closing')
            || (state === 'closed')
          ) {
            end();
          }
        });
      }

      return overlay;
    },
    options,
  );
}


