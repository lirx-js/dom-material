import { VirtualComponentNode } from '@lirx/dom';
import { MatOverlay } from '../../mat-overlay.class';

export type IVirtualComponentMatOverlayInput<GElement extends Element, GData extends object> = MatOverlay<VirtualComponentNode<GElement, GData>>;

export type IGenericVirtualComponentMatOverlayInput = IVirtualComponentMatOverlayInput<any, any>;
