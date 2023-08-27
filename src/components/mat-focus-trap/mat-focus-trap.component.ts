import { compileStyleAsComponentStyle, INJECT_CONTENT_TEMPLATE, Component, VirtualComponentNode } from '@lirx/dom';
import { FocusController } from './classes/focus-controller/focus-controller.class';
import { FocusStack } from './classes/focus-stack/focus-stack.class';
import { debounceMicrotask$$ } from '@lirx/core';

// @ts-ignore
import style from './mat-focus-trap.component.scss?inline';

/**
 * COMPONENT: 'mat-focus-trap'
 */


export const MatFocusTrapComponent = new Component<HTMLElement, object, object>({
  name: 'mat-focus-trap',
  template: INJECT_CONTENT_TEMPLATE,
  styles: [compileStyleAsComponentStyle(style)],
  templateData: (node: VirtualComponentNode<HTMLElement, object>): void => {

    const focusStack = FocusStack.controller(
      new FocusController({
        container: node.elementNode,
        next: FocusController.NEXT_LOOP,
      }),
    );

    const isDOMConnected$ = debounceMicrotask$$(node.isConnected$);

    isDOMConnected$((connected: boolean): void => {
      if (connected) {
        focusStack.activate();
      } else {
        focusStack.remove();
      }
    });
  },
});
