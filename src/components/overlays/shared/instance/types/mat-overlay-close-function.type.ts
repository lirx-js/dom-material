import { VirtualNode } from '@lirx/dom';

export interface IMatOverlayCloseFunction<GNode extends VirtualNode> {
  (
    node: GNode,
  ): Promise<void>;
}
