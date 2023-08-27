import { function$$ } from '@lirx/core';
import {
  compileReactiveHTMLAsComponentTemplate,
  compileStyleAsComponentStyle,
  IClassNamesList,
  VirtualComponentNode,
  Input,
  Component,
  input,
} from '@lirx/dom';

// @ts-ignore
import html from './mat-toolbar-container.component.html?raw';
// @ts-ignore
import style from './mat-toolbar-container.component.scss?inline';

/** TYPES **/

// https://material.angular.io/components/toolbar/overview

export type IMatToolbarComponentPosition =
  | 'top'
  | 'bottom'
  ;

/**
 * COMPONENT: 'mat-toolbar-container'
 */

export interface IMatToolbarContainerComponentData {
  readonly position: Input<IMatToolbarComponentPosition>;
}

export const MatToolbarContainerComponent = new Component<HTMLElement, IMatToolbarContainerComponentData, object>({
  name: 'mat-toolbar-container',
  template: compileReactiveHTMLAsComponentTemplate({ html }),
  styles: [compileStyleAsComponentStyle(style)],
  componentData: (): IMatToolbarContainerComponentData => {
    return {
      position: input<IMatToolbarComponentPosition>('top'),
    };
  },
  templateData: (node: VirtualComponentNode<HTMLElement, IMatToolbarContainerComponentData>): void => {
    const position$ = node.input$('position');

    const classList$ = function$$(
      [position$],
      (position): IClassNamesList => {
        return new Set([
          `mat--position-${position}`,
        ]);
      },
    );

    node.setReactiveClassNamesList(classList$);
  },
});
