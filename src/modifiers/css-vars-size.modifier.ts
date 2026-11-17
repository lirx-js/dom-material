import { fromResizeObserver, IObservable, map$$, shareRL$$ } from '@lirx/core';
import { IGenericVirtualReactiveElementNode, VirtualReactiveElementNodeModifier } from '@lirx/dom';

export const CssVarsSizeModifier = new VirtualReactiveElementNodeModifier(
  'css-vars-size',
  (node: IGenericVirtualReactiveElementNode): void => {
    const resizeObserver$: IObservable<ResizeObserverEntry> = shareRL$$(
      fromResizeObserver(node.elementNode),
    );

    const width$: IObservable<string> = map$$(
      resizeObserver$,
      (entry: ResizeObserverEntry): string => {
        return `${entry.contentRect.width}px`;
      },
    );

    const height$: IObservable<string> = map$$(
      resizeObserver$,
      (entry: ResizeObserverEntry): string => {
        return `${entry.contentRect.height}px`;
      },
    );

    node.setReactiveStyleProperty('--mat-element-width-px', width$);
    node.setReactiveStyleProperty('--mat-element-height-px', height$);
  },
);
