import { VirtualComponentNode, IVirtualComponentNodeSlotsMap, AbstractComponent } from '@lirx/dom';
import { MatOverlay } from '../../../instance/mat-overlay.class';
import { IMatOverlayFactory } from '../mat-overlay-factory.type';
import { IMatOverlayOptions } from '../../../instance/types/mat-overlay-options.type';
import {
  hasMatOverlayInput,
  getMatOverlayInput,
  IHavingMatOverlayInput,
} from '../../../instance/for-component/mat-overlay-input/mat-overlay-input';

/** TYPES **/

export interface ICreateMatOverlayFactoryFromComponentOptions<GElement extends Element, GData extends object> extends Omit<IMatOverlayOptions<VirtualComponentNode<GElement, GData>>, 'node'> {
}

export interface IMatOverlayFactoryFromComponentOptions {
  slots?: IVirtualComponentNodeSlotsMap;
}

export type IMatOverlayFactoryFromComponentArguments = readonly [
  options?: IMatOverlayFactoryFromComponentOptions
];

export type IMatOverlayFactoryFromComponentOverlay<GElement extends Element, GData extends object> = MatOverlay<VirtualComponentNode<GElement, GData>>;

export type IMatOverlayFactoryFromComponent<GElement extends Element, GData extends object> = IMatOverlayFactory<IMatOverlayFactoryFromComponentArguments, IMatOverlayFactoryFromComponentOverlay<GElement, GData>>;

/** FUNCTION **/

export function createMatOverlayFactoryFromComponent<GElement extends Element, GData extends object>(
  component: AbstractComponent<GElement, GData>,
  options?: ICreateMatOverlayFactoryFromComponentOptions<GElement, GData>,
): IMatOverlayFactoryFromComponent<GElement, GData> {
  return (
    {
      slots,
    }: IMatOverlayFactoryFromComponentOptions = {},
  ): IMatOverlayFactoryFromComponentOverlay<GElement, GData> => {
    const instance = new MatOverlay<VirtualComponentNode<GElement, GData>>({
      ...options,
      node: component.create(slots),
    });

    if (hasMatOverlayInput(instance.node)) {
      getMatOverlayInput((instance.node as VirtualComponentNode<GElement, GData & IHavingMatOverlayInput<GElement, GData>>)).emit(instance as MatOverlay<VirtualComponentNode<GElement, GData & IHavingMatOverlayInput<GElement, GData>>>);
    }

    return instance;
  };
}
