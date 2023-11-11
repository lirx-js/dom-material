import { VirtualNode } from '@lirx/dom';
import { IMatOverlayCloseFunction } from './mat-overlay-close-function.type';
import { IMatOverlayOpenFunction } from './mat-overlay-open-function.type';

export interface IMatOverlayOptions<GNode extends VirtualNode> {
  readonly node: GNode;
  readonly open?: IMatOverlayOpenFunction<GNode>;
  readonly close?: IMatOverlayCloseFunction<GNode>;
}
