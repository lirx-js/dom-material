import {
  compileReactiveHTMLAsComponentTemplate,
  compileStyleAsComponentStyle,
  Component,
  Input,
  input,
  VirtualComponentNode,
} from '@lirx/dom';

// @ts-ignore
import html from './app-story.component.html?raw';
// @ts-ignore
import style from './app-story.component.scss?inline';

/**
 * COMPONENT: 'app-story'
 **/

export interface IAppStoryComponentData {
  readonly loading: Input<boolean>;
}

export const AppStoryComponent = new Component<HTMLElement, IAppStoryComponentData, object>({
  name: 'app-story',
  template: compileReactiveHTMLAsComponentTemplate({
    html,
    components: [],
  }),
  styles: [compileStyleAsComponentStyle(style)],
  componentData: (): IAppStoryComponentData => {
    return {
      loading: input<boolean>(false),
    };
  },
  templateData: (node: VirtualComponentNode<HTMLElement, IAppStoryComponentData>): void => {
    const loading$ = node.input$('loading');

    node.setReactiveClass('mat--loading', loading$);
  },
});
