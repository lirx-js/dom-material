import { function$$, IObservable, map$$ } from '@lirx/core';
import {
  compileReactiveHTMLAsComponentTemplate,
  compileStyleAsComponentStyle,
  ISetStylePropertyOrStringOrNull,
  VirtualComponentNode,
  Input,
  Component,
  input,
} from '@lirx/dom';

// @ts-ignore
import html from './mat-progress-ring.component.html?raw';
// @ts-ignore
import style from './mat-progress-ring.component.scss?inline';

// https://css-tricks.com/building-progress-ring-quickly/
// https://css-tricks.com/transforms-on-svg-elements/

/**
 * COMPONENT: 'mat-progress-ring'
 */

export interface IMatProgressRingComponentData {
  readonly progress: Input<number>;
  readonly radius: Input<number>;
  readonly stroke: Input<number>;
}

interface ITemplateData {
  readonly strokeWidth$: IObservable<number>;
  readonly strokeDashOffset$: IObservable<ISetStylePropertyOrStringOrNull>;
  readonly strokeDashArray$: IObservable<string>;
  readonly radius$: IObservable<number>;
  readonly diameter$: IObservable<number>;
  readonly innerRadius$: IObservable<number>;
  readonly transform$: IObservable<string>;
}

export const MatProgressRingComponent = new Component<HTMLElement, IMatProgressRingComponentData, ITemplateData>({
  name: 'mat-progress-ring',
  template: compileReactiveHTMLAsComponentTemplate({
    html,
  }),
  styles: [compileStyleAsComponentStyle(style)],
  componentData: (): IMatProgressRingComponentData => {
    return {
      progress: input<number>(0),
      radius: input<number>(0),
      stroke: input<number>(0),
    };
  },
  templateData: (node: VirtualComponentNode<HTMLElement, IMatProgressRingComponentData>): ITemplateData => {
    const progress$ = node.input$('progress');
    const radius$ = node.input$('radius');
    const stroke$ = node.input$('stroke');

    /** SETUP SUBSCRIBE FUNCTIONS **/

    const strokeWidth$ = function$$(
      [stroke$, radius$],
      (stroke: number, radius: number): number => {
        return Math.min(stroke, radius);
      },
    );

    const innerRadius$ = function$$(
      [radius$, strokeWidth$],
      (radius: number, stroke: number): number => {
        return Math.max(0, radius - (stroke / 2));
      },
    );

    const circumference$ = map$$(innerRadius$, (radius: number): number => (radius * 2 * Math.PI));

    const strokeDashOffset$ = function$$(
      [circumference$, progress$],
      (circumference: number, progress: number): ISetStylePropertyOrStringOrNull => {
        return (circumference * (1 - progress)).toString(10);
      },
    );

    const strokeDashArray$ = map$$(circumference$, (circumference: number): string => `${circumference} ${circumference}`);

    const diameter$ = map$$(radius$, (radius: number): number => (radius * 2));

    const transform$ = map$$(radius$, (radius: number): string => `rotate(-90 ${radius} ${radius})`);

    return {
      strokeWidth$,
      strokeDashOffset$,
      strokeDashArray$,
      radius$,
      diameter$,
      innerRadius$,
      transform$,
    };
  },
});

