import { VirtualComponentNode, AbstractComponent, IGenericAbstractComponent, InferAbstractComponentVirtualComponentNode } from '@lirx/dom';
import { MatOverlayFactory } from '../../mat-overlay-factory.class';
import {
  MatVirtualComponentOverlay,
  IMatVirtualComponentOverlayOptions,
} from '../../../../instance/for-component/mat-virtual-component-overlay.class';

/** TYPES **/

export interface IMatVirtualComponentOverlayFactoryOptions<GComponent extends IGenericAbstractComponent> extends Omit<IMatVirtualComponentOverlayOptions<GComponent>, 'component' | 'slots'> {

}

export interface IMatVirtualComponentOverlayFactoryOpenOptions<GComponent extends IGenericAbstractComponent> extends Pick<IMatVirtualComponentOverlayOptions<GComponent>, 'slots'> {

}

/** CLASS **/

export class MatVirtualComponentOverlayFactory<GComponent extends IGenericAbstractComponent> extends MatOverlayFactory<InferAbstractComponentVirtualComponentNode<GComponent>> {
  readonly #component: GComponent;
  readonly #options: IMatVirtualComponentOverlayFactoryOptions<GComponent> | undefined;

  constructor(
    component: GComponent,
    options?: IMatVirtualComponentOverlayFactoryOptions<GComponent>,
  ) {
    super();
    this.#component = component;
    this.#options = options;
  }

  override open(
    options?: IMatVirtualComponentOverlayFactoryOpenOptions<GComponent>,
  ): MatVirtualComponentOverlay<GComponent> {
    return new MatVirtualComponentOverlay<GComponent>({
      ...this.#options,
      ...options,
      component: this.#component,
    });
  }
}
