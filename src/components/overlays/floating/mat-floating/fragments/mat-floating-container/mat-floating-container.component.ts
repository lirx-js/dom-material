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
  Output,
  Component,
  output,
} from '@lirx/dom';
import { IUnsubscribe } from '@lirx/unsubscribe';
import { MatFocusTrapComponent } from '../../../../../mat-focus-trap/mat-focus-trap.component';

// @ts-ignore
import html from './mat-floating-container.component.html?raw';
// @ts-ignore
import style from './mat-floating-container.component.scss?inline';

/** TYPES **/

export type IMatFloatingContainerComponentCloseType =
  | 'backdrop'
  | 'escape'
  ;

/**
 * COMPONENT: 'mat-floating-container'
 *
 * This is the main container for a floating overlay. It includes a backdrop and a "content" area·
 */

export interface IMatFloatingContainerComponentData {
  readonly close: Output<IMatFloatingContainerComponentCloseType>;
}

export type IMatFloatingContainerVirtualComponentNode = VirtualComponentNode<HTMLElement, IMatFloatingContainerComponentData>;

export const MatFloatingContainerComponent = new Component<HTMLElement, IMatFloatingContainerComponentData, object>({
  name: 'mat-floating-container',
  template: compileReactiveHTMLAsComponentTemplate({
    html,
    components: [
      MatFocusTrapComponent,
    ],
  }),
  styles: [compileStyleAsComponentStyle(style)],
  componentData: (): IMatFloatingContainerComponentData => {
    return {
      close: output<IMatFloatingContainerComponentCloseType>(),
    };
  },
  templateData: (node: IMatFloatingContainerVirtualComponentNode): void => {
    /* CLOSE */

    const $close = node.data.close.emit;

    const backdropClose$ = map$$(
      fromSelfEventTarget<'click', MouseEvent>(node.elementNode, 'click'),
      (): IMatFloatingContainerComponentCloseType => 'backdrop',
    );

    const escapeClose$ = mapFilter$$(
      fromEventTarget<'keydown', KeyboardEvent>(node.elementNode, 'keydown'),
      (event: KeyboardEvent): IMapFilterMapFunctionReturn<IMatFloatingContainerComponentCloseType> => {
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
