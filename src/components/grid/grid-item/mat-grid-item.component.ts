import { mapDistinct$$ } from '@lirx/core';
import {
  compileReactiveHTMLAsComponentTemplate,
  compileStyleAsComponentStyle,
  createComponent,
  VirtualCustomElementNode,
} from '@lirx/dom';
import { IMatGridItemPosition } from './helpers/mat-grid-item-position.type';

// @ts-ignore
import html from './mat-grid-item.component.html?raw';
// @ts-ignore
import style from './mat-grid-item.component.scss?inline';

/**
 * COMPONENT: 'app-grid-item'
 **/

interface IGridItemComponentConfig {
  element: HTMLElement;
  inputs: [
    ['position', IMatGridItemPosition],
  ];
}

export const MatGridItemComponent = createComponent<IGridItemComponentConfig>({
  name: 'mat-grid-item',
  template: compileReactiveHTMLAsComponentTemplate({
    html,
  }),
  styles: [compileStyleAsComponentStyle(style)],
  inputs: [
    ['position'],
  ],
  init: (node: VirtualCustomElementNode<IGridItemComponentConfig>): void => {
    const position$ = node.inputs.get$('position');

    const left$ = mapDistinct$$(position$, ([left]) => String(left));
    const top$ = mapDistinct$$(position$, ([, top]) => String(top));
    const width$ = mapDistinct$$(position$, ([, , width]) => String(width));
    const height$ = mapDistinct$$(position$, ([, , , height]) => String(height));

    node.setReactiveStyleProperty('--mat-grid-item-left', left$);
    node.setReactiveStyleProperty('--mat-grid-item-top', top$);
    node.setReactiveStyleProperty('--mat-grid-item-width', width$);
    node.setReactiveStyleProperty('--mat-grid-item-height', height$);
  },
});
