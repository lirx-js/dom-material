import { VirtualNode } from '@lirx/dom';

export interface IMatOverlayOpenFunction<GNode extends VirtualNode> {
  (
    node: GNode,
    signal: AbortSignal,
  ): Promise<void>;
}
