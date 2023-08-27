import { VirtualNode } from '@lirx/dom';
import { IMatOverlayCloseFunction } from './mat-overlay-close-function.type';
import { IMatOverlayOpenFunction } from './mat-overlay-open-function.type';

export interface IMatOverlayOptions<GNode extends VirtualNode> {
  node: GNode;
  open?: IMatOverlayOpenFunction<GNode>;
  close?: IMatOverlayCloseFunction<GNode>;
}
