import {
  IVirtualComponentNodeSlotsMap,
  VirtualComponentNode,
  AbstractComponent,
  IGenericAbstractComponent,
  InferAbstractComponentVirtualComponentNode,
} from '@lirx/dom';
import { hasMatOverlayInput, getMatOverlayInput, IHavingMatOverlayInput } from './mat-overlay-input/mat-overlay-input';
import { MatOverlay } from '../mat-overlay.class';
import { IMatOverlayOptions } from '../types/mat-overlay-options.type';

/** TYPES **/

export interface IMatVirtualComponentOverlayOptions<GComponent extends IGenericAbstractComponent> extends Omit<IMatOverlayOptions<InferAbstractComponentVirtualComponentNode<GComponent>>, 'node'> {
  readonly component: GComponent;
  readonly slots?: IVirtualComponentNodeSlotsMap;
}

/** CLASS **/

export class MatVirtualComponentOverlay<GComponent extends IGenericAbstractComponent> extends MatOverlay<InferAbstractComponentVirtualComponentNode<GComponent>> {
  constructor(
    {
      component,
      slots,
      ...options
    }: IMatVirtualComponentOverlayOptions<GComponent>,
  ) {
    super({
      ...options,
      node: component.create(slots) as InferAbstractComponentVirtualComponentNode<GComponent>,
    });

    if (hasMatOverlayInput(this.node)) {
      getMatOverlayInput(this.node as any).emit(this as any);
    }
  }
}
