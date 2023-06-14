import { compileReactiveHTMLAsComponentTemplate, compileStyleAsComponentStyle, createComponent, VirtualCustomElementNode } from '@lirx/dom';
import { CssVarsSizeModifier } from '../../../modifiers/css-vars-size.modifier';
import { MatDualRingLoaderComponent } from '../mat-dual-ring-loader/mat-dual-ring-loader.component';

// @ts-ignore
import html from './mat-loading.component.html?raw';
// @ts-ignore
import style from './mat-loading.component.scss?inline';

/**
 * COMPONENT: 'mat-loading'
 **/

interface IMatLoadingComponentConfig {
  element: HTMLElement;
  inputs: [
    ['loading', boolean],
  ],
}

export const MatLoadingComponent = createComponent<IMatLoadingComponentConfig>({
  name: 'mat-loading',
  template: compileReactiveHTMLAsComponentTemplate({
    html,
    customElements: [
      MatDualRingLoaderComponent,
    ],
    modifiers: [
      CssVarsSizeModifier,
    ],
  }),
  styles: [compileStyleAsComponentStyle(style)],
  inputs: [
    ['loading', false],
  ],
  init: (node: VirtualCustomElementNode<IMatLoadingComponentConfig>): void => {
    const loading$ = node.inputs.get$('loading');

    node.setReactiveClass('mat--loading', loading$);
  },
});
