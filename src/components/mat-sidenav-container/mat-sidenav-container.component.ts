import { function$$, IObservable, IObserver, let$$ } from '@lirx/core';
import {
  compileReactiveHTMLAsComponentTemplate,
  compileStyleAsComponentStyle,
  querySelectorOrThrow,
  VirtualComponentNode,
  Component,
  Input,
  Output,
  input,
  output,
} from '@lirx/dom';
import { IUnsubscribe } from '@lirx/unsubscribe';

// @ts-ignore
import html from './mat-sidenav-container.component.html?raw';
// @ts-ignore
import style from './mat-sidenav-container.component.scss?inline';

/** TYPES **/

// https://material.angular.io/components/sidenav/examples

export type IMatSidenavComponentMode =
  | 'over'
  | 'push'
  ;

export type IMatSidenavComponentPosition =
  | 'left'
  | 'right'
  ;

// export type IMatSidenavComponentUserCloseEvent = CustomEvent<'backdrop' | 'escape'>;
export type IMatSidenavComponentUserCloseType =
  | 'backdrop'
  | 'escape'
  ;

/**
 * COMPONENT: 'mat-sidenav-container'
 */

export interface IMatSidenavContainerComponentData {
  readonly mode: Input<IMatSidenavComponentMode>;
  readonly position: Input<IMatSidenavComponentPosition>;
  readonly hasBackdrop: Input<boolean>;
  readonly enableUserClose: Input<boolean>;
  readonly opened: Input<boolean>;
  readonly userClose: Output<IMatSidenavComponentUserCloseType>;
}

interface ITemplateData {
  readonly hasBackdrop$: IObservable<boolean>;
  readonly $onClickBackdrop: IObserver<MouseEvent>;
  readonly $onClickDrag: IObserver<MouseEvent>;
  readonly $onKeyDownSidenav: IObserver<KeyboardEvent>;
}

export const MatSidenavContainerComponent = new Component<HTMLElement, IMatSidenavContainerComponentData, ITemplateData>({
  name: 'mat-sidenav-container',
  template: compileReactiveHTMLAsComponentTemplate({ html }),
  styles: [compileStyleAsComponentStyle(style)],
  componentData: (): IMatSidenavContainerComponentData => {
    return {
      mode: input<IMatSidenavComponentMode>('over'),
      position: input<IMatSidenavComponentPosition>('left'),
      hasBackdrop: input<boolean>(true),
      enableUserClose: input<boolean>(false),
      opened: input<boolean>(false),
      userClose: output<IMatSidenavComponentUserCloseType>(),
    };
  },
  templateData: (node: VirtualComponentNode<HTMLElement, IMatSidenavContainerComponentData>): ITemplateData => {
    const element: HTMLElement = node.elementNode;

    const enableUserClose = () => node.inputValue('enableUserClose');
    const mode$ = node.input$('mode');
    const position$ = node.input$('position');
    const hasBackdrop$ = node.input$('hasBackdrop');

    const [$opened, opened$, opened] = let$$<boolean>();

    node.input$('opened')($opened);

    // const {
    //   emit: $opened,
    //   subscribe: opened$,
    //   getValue: opened,
    // } = node.inputs.get$('opened');

    const $userClose = node.$output('userClose');

    node.setReactiveClass('mat--opened', opened$);
    node.setReactiveClass('mat-has-backdrop', hasBackdrop$);

    const classList$ = function$$(
      [mode$, position$],
      (mode, position) => {
        return new Set([
          `mat-mode-${mode}`,
          `mat-position-${position}`,
        ]);
      },
    );
    node.setReactiveClassNamesList(classList$);

    const $onClickBackdrop = (): void => {
      $userClose('backdrop');

      if (enableUserClose()) {
        $opened(false);
      }
    };

    const $onClickDrag = (): void => {
      $opened(!opened());
    };

    const $onKeyDownSidenav = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        $userClose('escape');

        if (enableUserClose()) {
          $opened(false);
          (document.activeElement as HTMLElement)?.blur?.();
        }
      }
    };

    // TODO improve later
    node.onConnected((): IUnsubscribe => {
      return opened$((opened: boolean): void => {
        if (opened) {
          queueMicrotask(() => {
            querySelectorOrThrow<HTMLElement>(element, `:scope > .sidenav > .content`).focus();
          });
        }
      });
    });

    return {
      hasBackdrop$,

      $onClickBackdrop,
      $onClickDrag,
      $onKeyDownSidenav,
    };
  },
});

