import { IObserver } from '@lirx/core';
import {
  compileReactiveHTMLAsComponentTemplate,
  compileStyleAsComponentStyle,
  VirtualComponentNode,
  Output,
  Component,
  output,
} from '@lirx/dom';
import {
  MatDialogBodyComponent,
} from '../../fragments/mat-dialog-container/fragments/mat-dialog-content/fragments/mat-dialog-body/mat-dialog-body.component';
import {
  MatDialogFooterComponent,
} from '../../fragments/mat-dialog-container/fragments/mat-dialog-content/fragments/mat-dialog-footer/mat-dialog-footer.component';
import {
  MatDialogCloseComponent,
} from '../../fragments/mat-dialog-container/fragments/mat-dialog-content/fragments/mat-dialog-header/fragments/mat-dialog-close/mat-dialog-close.component';
import {
  MatDialogTitleComponent,
} from '../../fragments/mat-dialog-container/fragments/mat-dialog-content/fragments/mat-dialog-header/fragments/mat-dialog-title/mat-dialog-title.component';
import {
  MatDialogHeaderComponent,
} from '../../fragments/mat-dialog-container/fragments/mat-dialog-content/fragments/mat-dialog-header/mat-dialog-header.component';
import { MatDialogContentComponent } from '../../fragments/mat-dialog-container/fragments/mat-dialog-content/mat-dialog-content.component';
import {
  IMatDialogContainerComponentCloseType,
  MatDialogContainerComponent,
} from '../../fragments/mat-dialog-container/mat-dialog-container.component';

// @ts-ignore
import html from './mat-dialog.component.html?raw';
// @ts-ignore
import style from './mat-dialog.component.scss?inline';

/** TYPES **/

export type IMatDialogComponentCloseType =
  | IMatDialogContainerComponentCloseType
  | 'close-icon'
  ;

/**
 * COMPONENT: 'mat-dialog'
 */

export interface IMatDialogComponentData {
  readonly close: Output<IMatDialogComponentCloseType>;
}

interface ITemplateData {
  readonly $matDialogContainerClose: IObserver<IMatDialogContainerComponentCloseType>;
  readonly $onClickCloseIcon: IObserver<MouseEvent>;
}

export const MatDialogComponent = new Component<HTMLElement, IMatDialogComponentData, object>({
  name: 'mat-dialog',
  template: compileReactiveHTMLAsComponentTemplate({
    html,
    components: [
      MatDialogContainerComponent,
      MatDialogContentComponent,
      MatDialogHeaderComponent,
      MatDialogTitleComponent,
      MatDialogCloseComponent,
      MatDialogBodyComponent,
      MatDialogFooterComponent,
    ],
  }),
  styles: [compileStyleAsComponentStyle(style)],
  componentData: (): IMatDialogComponentData => {
    return {
      close: output<IMatDialogComponentCloseType>(),
    };
  },
  templateData: (node: VirtualComponentNode<HTMLElement, IMatDialogComponentData>): ITemplateData => {
    const $close = node.$output('close');

    const $matDialogContainerClose = $close;

    const $onClickCloseIcon = (): void => {
      $close('close-icon');
    };

    return {
      $matDialogContainerClose,
      $onClickCloseIcon,
    };
  },
});
