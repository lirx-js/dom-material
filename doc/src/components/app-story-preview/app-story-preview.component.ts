import {
  fromSignal,
  idle,
  IObservable,
  IObserver,
  IReadonlySignal,
  mapDistinct$$,
  signal,
} from '@lirx/core';
import {
  compileReactiveHTMLAsComponentTemplate,
  compileStyleAsComponentStyle,
  Component,
  VirtualComponentNode,
} from '@lirx/dom';

// @ts-ignore
import html from './app-story-preview.component.html?raw';
// @ts-ignore
import style from './app-story-preview.component.scss?inline';

/**
 * COMPONENT: 'app-story-preview'
 **/

export interface IAppStoryPreviewComponentData {}

interface ITemplateData {
  readonly showCode: IReadonlySignal<boolean>;
  readonly $toggleShowCode: IObserver<any>;
  readonly code$: IObservable<string>;
}

export const AppStoryPreviewComponent = new Component<
  HTMLElement,
  IAppStoryPreviewComponentData,
  object
>({
  name: 'app-story-preview',
  template: compileReactiveHTMLAsComponentTemplate({
    html,
    components: [],
  }),
  styles: [compileStyleAsComponentStyle(style)],
  templateData: (
    node: VirtualComponentNode<HTMLElement, IAppStoryPreviewComponentData>,
  ): ITemplateData => {
    const showCode = signal(true);

    const $toggleShowCode = (): void => {
      showCode.set(!showCode());
    };

    const code$ = mapDistinct$$(idle(), (): string => {
      return node.elementNode.querySelector('.preview')?.innerHTML ?? '';
    });

    node.setReactiveClass('app-story-preview--code-visible', fromSignal(showCode));

    return {
      showCode,
      $toggleShowCode,
      code$,
    };
  },
});
