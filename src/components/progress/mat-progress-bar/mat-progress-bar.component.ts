import { IObservable, map$$ } from '@lirx/core';
import {
  compileReactiveHTMLAsComponentTemplate,
  compileStyleAsComponentStyle,
  VirtualComponentNode,
  Input,
  Component,
  input,
} from '@lirx/dom';

// @ts-ignore
import html from './mat-progress-bar.component.html?raw';
// @ts-ignore
import style from './mat-progress-bar.component.scss?inline';

/**
 * COMPONENT: 'mat-progress-bar'
 */

export interface IMatProgressBarComponentData {
  readonly progress: Input<number>;
}

interface ITemplateData {
  readonly percent$: IObservable<string>;
  readonly percentText$: IObservable<string>;
}

export const MatProgressBarComponent = new Component<HTMLElement, IMatProgressBarComponentData, object>({
  name: 'mat-progress-bar',
  template: compileReactiveHTMLAsComponentTemplate({
    html,
  }),
  styles: [compileStyleAsComponentStyle(style)],
  componentData: (): IMatProgressBarComponentData => {
    return {
      progress: input<number>(0),
    };
  },
  templateData: (node: VirtualComponentNode<HTMLElement, IMatProgressBarComponentData>): ITemplateData => {
    const progress$ = node.input$('progress');

    const percent$ = map$$(progress$, (progress: number) => `${progress * 100}%`);
    const percentText$ = map$$(progress$, (progress: number) => `${Math.round(progress * 100)}%`);

    return {
      percent$,
      percentText$,
    };
  },
});
