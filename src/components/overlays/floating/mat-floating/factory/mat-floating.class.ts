import { unknownToObservableAny, unknownToObservableNotUndefined, map$$ } from '@lirx/core';
import { IMatFloatingData } from '../types/mat-floating-data.type';
import { MatFloatingComponent, IMatFloatingComponentData, IMatFloatingComponent } from '../mat-floating.component';
import {
  createMatOverlayOpenCloseOptionsForMatFloating,
  ICreateMatOverlayOpenCloseOptionsForMatFloatingOptions,
} from '../animation/create-mat-overlay-open-close-options-for-mat-floating';
import { toStylePropertiesMap } from '@lirx/dom';

import {
  MatVirtualComponentOverlayFactory,
  IMatVirtualComponentOverlayFactoryOptions,
  IMatVirtualComponentOverlayFactoryOpenOptions,
} from '../../../shared/factories/sync/built-in/for-component/mat-virtual-component-overlay-factory.class';
import { MatVirtualComponentOverlay } from '../../../shared/instance/for-component/mat-virtual-component-overlay.class';

export interface IMatFloatingOpenOptions extends //
  ICreateMatOverlayOpenCloseOptionsForMatFloatingOptions,
  IMatVirtualComponentOverlayFactoryOptions<IMatFloatingComponent>,
  IMatVirtualComponentOverlayFactoryOpenOptions<IMatFloatingComponent>,
  IMatFloatingData
//
{
}

export class MatFloating {
  static open(
    {
      reference,
      computePositionConfig,
      onClose,
      cssVariables,
      slots,
      ...options
    }: IMatFloatingOpenOptions,
  ): MatVirtualComponentOverlay<IMatFloatingComponent> {
    const factory: MatVirtualComponentOverlayFactory<IMatFloatingComponent> = new MatVirtualComponentOverlayFactory<IMatFloatingComponent>(
      MatFloatingComponent,
      createMatOverlayOpenCloseOptionsForMatFloating<HTMLElement, IMatFloatingComponentData>(options),
    );

    const overlay: MatVirtualComponentOverlay<IMatFloatingComponent> = factory.open({ slots });

    overlay.node.bindInputWithObservable('reference', unknownToObservableAny(reference));

    if (computePositionConfig !== void 0) {
      overlay.node.bindInputWithObservable('computePositionConfig', unknownToObservableNotUndefined(computePositionConfig));
    }

    if (onClose !== void 0) {
      overlay.node.bindOutputWithObserver('close', onClose);
    }

    if (cssVariables !== void 0) {
      overlay.node.setReactiveStylePropertiesMap(map$$(unknownToObservableNotUndefined(cssVariables), toStylePropertiesMap));
    }

    return overlay;
  }
}

