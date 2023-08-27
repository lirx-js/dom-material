import { IObservable, IObserver, map$$, ObservableProxy } from '@lirx/core';
import {
  compileReactiveHTMLAsComponentTemplate,
  compileStyleAsComponentStyle,
  VirtualComponentNode,
  Input,
  Output,
  Component,
  input,
  output,
} from '@lirx/dom';
import { IconChevronLeftComponent, IconChevronRightComponent, IconPageFirstComponent, IconPageLastComponent } from '@lirx/mdi';
import { MatButtonModifier } from '../buttons/mat-button/mat-button.modifier';
import { MatIconButtonModifier } from '../buttons/mat-icon-button/mat-icon-button.modifier';
import { IMatPaginationItem, IMatPaginationItemButton, IMatPaginationItemPage } from './types/mat-pagination-item.type';

// @ts-ignore
import html from './mat-pagination.component.html?raw';
// @ts-ignore
import style from './mat-pagination.component.scss?inline';

/**
 * COMPONENT: 'mat-pagination'
 **/

export interface IMatPaginationComponentData {
  readonly items: Input<readonly IMatPaginationItem[]>;
  readonly disabled: Input<boolean>;
  readonly selectedPageIndex: Output<number>;
}

interface IGetPageAriaLabelFunction {
  (
    page$: IObservable<IMatPaginationItemPage>,
  ): IObservable<string>;
}

interface IGetPageTextFunction {
  (
    page$: IObservable<IMatPaginationItemPage>,
  ): IObservable<string>;
}

interface IGetMatPaginationItemButtonOnClickFunction {
  (
    page$: IObservable<IMatPaginationItemPage>,
  ): IObservable<IObserver<MouseEvent>>;
}

interface ITemplateData {
  readonly items$: IObservable<readonly ObservableProxy<IMatPaginationItem>[]>;
  readonly getPageAriaLabel: IGetPageAriaLabelFunction;
  readonly getPageText: IGetPageTextFunction;
  readonly getMatPaginationItemButtonOnClick: IGetMatPaginationItemButtonOnClickFunction;
}

export const MatPaginationComponent = new Component<HTMLElement, IMatPaginationComponentData, ITemplateData>({
  name: 'mat-pagination',
  extends: 'nav',
  template: compileReactiveHTMLAsComponentTemplate({
    html,
    components: [
      IconPageFirstComponent,
      IconChevronLeftComponent,
      IconChevronRightComponent,
      IconPageLastComponent,
    ],
    modifiers: [
      MatButtonModifier,
      MatIconButtonModifier,
    ],
  }),
  styles: [compileStyleAsComponentStyle(style)],
  componentData: (): IMatPaginationComponentData => {
    return {
      items: input<readonly IMatPaginationItem[]>(),
      disabled: input<boolean>(false),
      selectedPageIndex: output<number>(),
    };
  },
  templateData: (node: VirtualComponentNode<HTMLElement, IMatPaginationComponentData>): ITemplateData => {
    node.setAttribute('aria-label', 'pagination navigation');

    /* ITEMS */

    const items$ = node.input$('items');

    const _items$ = new ObservableProxy(items$).array$();

    /* DISABLED */

    const disabled$ = node.input$('disabled');

    node.setReactiveClass('mat--disabled', disabled$);

    /* PAGE INDEX */

    const $selectedPageIndex = node.$output('selectedPageIndex');

    /* MISC */

    const getPageAriaLabel = (
      page$: IObservable<IMatPaginationItemPage>,
    ): IObservable<string> => {
      return map$$(page$, (page: IMatPaginationItemPage): string => {
        return page.selected
          ? `Page ${(page.pageIndex + 1)}`
          : `Go to page ${(page.pageIndex + 1)}`;
      });
    };

    const getPageText = (
      page$: IObservable<IMatPaginationItemPage>,
    ): IObservable<string> => {
      return map$$(page$, (page: IMatPaginationItemPage): string => {
        return String(page.pageIndex + 1);
      });
    };

    const getMatPaginationItemButtonOnClick = (
      page$: IObservable<IMatPaginationItemButton>,
    ): IObservable<IObserver<MouseEvent>> => {
      return map$$(page$, (item: IMatPaginationItemButton): IObserver<MouseEvent> => {
        return (): void => {
          $selectedPageIndex(item.pageIndex);
        };
      });
    };

    return {
      items$: _items$,
      getPageAriaLabel,
      getPageText,
      getMatPaginationItemButtonOnClick,
    };
  },
});
