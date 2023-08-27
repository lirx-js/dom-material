import {
  fromEventTarget,
  fromSelfEventTarget,
  IMapFilterMapFunctionReturn,
  map$$,
  MAP_FILTER_DISCARD,
  mapFilter$$,
  merge,
} from '@lirx/core';
import {
  compileReactiveHTMLAsComponentTemplate,
  compileStyleAsComponentStyle,
  VirtualComponentNode,
  Component,
  Output,
  output,
} from '@lirx/dom';
import { MatFocusTrapComponent } from '../../../../mat-focus-trap/mat-focus-trap.component';
import { IUnsubscribe } from '@lirx/unsubscribe';

// @ts-ignore
import html from './mat-dialog-container.component.html?raw';
// @ts-ignore
import style from './mat-dialog-container.component.scss?inline';

/** TYPES **/

export type IMatDialogContainerComponentCloseType =
  | 'backdrop'
  | 'escape'
  ;

/**
 * COMPONENT: 'mat-dialog-container'
 *
 * This is the main container for a dialog. It includes a backdrop and a "content" area (white middle space)
 */

export interface IMatDialogContainerComponentData {
  readonly close: Output<IMatDialogContainerComponentCloseType>;
}

export type IMatDialogContainerVirtualComponentNode = VirtualComponentNode<HTMLElement, IMatDialogContainerComponentData>;

export const MatDialogContainerComponent = new Component<HTMLElement, IMatDialogContainerComponentData, object>({
  name: 'mat-dialog-container',
  template: compileReactiveHTMLAsComponentTemplate({
    html,
    components: [
      MatFocusTrapComponent,
    ],
  }),
  styles: [compileStyleAsComponentStyle(style)],
  componentData: (): IMatDialogContainerComponentData => {
    return {
      close: output<IMatDialogContainerComponentCloseType>(),
    };
  },
  templateData: (node: IMatDialogContainerVirtualComponentNode): void => {
    /* CLOSE */

    const $close = node.$output('close');

    const backdropClose$ = map$$(
      fromSelfEventTarget<'click', MouseEvent>(node.elementNode, 'click'),
      (): IMatDialogContainerComponentCloseType => 'backdrop',
    );

    const escapeClose$ = mapFilter$$(
      fromEventTarget<'keydown', KeyboardEvent>(node.elementNode, 'keydown'),
      (event: KeyboardEvent): IMapFilterMapFunctionReturn<IMatDialogContainerComponentCloseType> => {
        return (event.key === 'Escape')
          ? 'escape'
          : MAP_FILTER_DISCARD;
      },
    );

    const close$ = merge([
      backdropClose$,
      escapeClose$,
    ]);

    node.onConnected((): IUnsubscribe => {
      return close$($close);
    });
  },
});
