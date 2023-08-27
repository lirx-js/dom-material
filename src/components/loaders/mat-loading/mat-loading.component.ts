import {
  compileReactiveHTMLAsComponentTemplate,
  compileStyleAsComponentStyle,
  Component,
  Input,
  input,
  VirtualComponentNode,
} from '@lirx/dom';
import { CssVarsSizeModifier } from '../../../modifiers/css-vars-size.modifier';
import { MatDualRingLoaderComponent } from '../mat-dual-ring-loader/mat-dual-ring-loader.component';

// @ts-ignore
import html from './mat-loading.component.html?raw';
// @ts-ignore
import style from './mat-loading.component.scss?inline';

/**
 * COMPONENT: 'mat-loading'
 **/

export interface IMatLoadingComponentData {
  readonly loading: Input<boolean>;
}

export const MatLoadingComponent = new Component<HTMLElement, IMatLoadingComponentData, object>({
  name: 'mat-loading',
  template: compileReactiveHTMLAsComponentTemplate({
    html,
    components: [
      MatDualRingLoaderComponent,
    ],
    modifiers: [
      CssVarsSizeModifier,
    ],
  }),
  styles: [compileStyleAsComponentStyle(style)],
  componentData: (): IMatLoadingComponentData => {
    return {
      loading: input<boolean>(false),
    };
  },
  templateData: (node: VirtualComponentNode<HTMLElement, IMatLoadingComponentData>): void => {
    const loading$ = node.input$('loading');

    node.setReactiveClass('mat--loading', loading$);
  },
});
