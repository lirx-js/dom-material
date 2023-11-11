import { VirtualNode } from '@lirx/dom';
import { MatOverlay } from '../../instance/mat-overlay.class';

export abstract class MatOverlayFactory<GNode extends VirtualNode> {
  abstract open(): MatOverlay<GNode>;
}

