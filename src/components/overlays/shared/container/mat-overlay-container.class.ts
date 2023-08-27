import { VirtualRootNode } from '@lirx/dom';
import { FocusStack } from '../../../mat-focus-trap/classes/focus-stack/focus-stack.class';

// @ts-ignore
import style from './mat-overlay-container.scss?inline';

let MAT_OVERLAY_CONTAINER_NODE: VirtualRootNode<HTMLElement>;

/**
 * This is the container of the overlays.
 */
export class MatOverlayContainer {
  static get node(): VirtualRootNode<HTMLElement> {
    return this.init();
  }

  static init(): VirtualRootNode<HTMLElement> {
    if (MAT_OVERLAY_CONTAINER_NODE === void 0) {
      const container: HTMLElement = document.body;

      const element: HTMLElement = document.createElement('mat-overlay-container');
      container.appendChild(element);

      const styleElement = document.createElement('style');
      styleElement.setAttribute('host', 'mat-overlay-container');
      styleElement.textContent = style;
      document.head.appendChild(styleElement);

      MAT_OVERLAY_CONTAINER_NODE = new VirtualRootNode<HTMLElement>(element);

      FocusStack.init();
    }
    return MAT_OVERLAY_CONTAINER_NODE;
  }
}


