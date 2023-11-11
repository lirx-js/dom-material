import { Input, input, VirtualComponentNode } from '@lirx/dom';
import { MatOverlay } from '../../mat-overlay.class';

// const MAT_OVERLAY_INPUT_NAME = Symbol('matOverlay');
const MAT_OVERLAY_INPUT_NAME = 'MAT_OVERLAY';
export type IMatOverlayInputName = typeof MAT_OVERLAY_INPUT_NAME;

export type IMatOverlayInputValue<GElement extends Element, GData extends object> = MatOverlay<VirtualComponentNode<GElement, GData>>;

export type IMatOverlayInput<GElement extends Element, GData extends object> = Input<IMatOverlayInputValue<GElement, GData>>;

export type IHavingMatOverlayInput<GElement extends Element, GData extends object> = Readonly<Record<IMatOverlayInputName, IMatOverlayInput<GElement, GData>>>;

export function matOverlayInput<GElement extends Element, GData extends object>(): IHavingMatOverlayInput<GElement, GData> {
  return {
    [MAT_OVERLAY_INPUT_NAME]: input<IMatOverlayInputValue<GElement, GData>>(),
  };
}

export function hasMatOverlayInput<GElement extends Element, GData extends object>(
  node: VirtualComponentNode<GElement, GData>,
): boolean {
// ): node is VirtualComponentNode<GElement, GData & IHavingMatOverlayInput<GElement, GData>> {
  return MAT_OVERLAY_INPUT_NAME in node.data;
}

export function getMatOverlayInput<GElement extends Element, GData extends IHavingMatOverlayInput<any, any>>(
  node: VirtualComponentNode<GElement, GData>,
): IMatOverlayInput<GElement, GData> {
  return node.data[MAT_OVERLAY_INPUT_NAME];
}

