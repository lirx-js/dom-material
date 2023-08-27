import { mapDistinct$$ } from '@lirx/core';
import { compileStyleAsComponentStyle, INJECT_CONTENT_TEMPLATE, VirtualComponentNode, Input, Component, input } from '@lirx/dom';
import { IMatGridItemPosition } from './helpers/mat-grid-item-position.type';

// @ts-ignore
import style from './mat-grid-item.component.scss?inline';

/**
 * COMPONENT: 'app-grid-item'
 **/

export interface IGridItemComponentData {
  readonly position: Input<IMatGridItemPosition>;
}

export const MatGridItemComponent = new Component<HTMLElement, IGridItemComponentData, object>({
  name: 'mat-grid-item',
  template: INJECT_CONTENT_TEMPLATE,
  styles: [compileStyleAsComponentStyle(style)],
  componentData: (): IGridItemComponentData => {
    return {
      position: input<IMatGridItemPosition>(),
    };
  },
  templateData: (node: VirtualComponentNode<HTMLElement, IGridItemComponentData>): void => {
    const position$ = node.input$('position');

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
