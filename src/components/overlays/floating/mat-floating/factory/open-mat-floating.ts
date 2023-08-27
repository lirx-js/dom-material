import { unknownToObservableAny, unknownToObservableNotUndefined, map$$ } from '@lirx/core';
import { IMatFloatingData } from '../types/mat-floating-data.type';
import { IMatFloatingVirtualComponentNode, MatFloatingComponent, IMatFloatingComponentData } from '../mat-floating.component';
import {
  createMatOverlayOpenCloseOptionsForMatFloating,
  ICreateMatOverlayOpenCloseOptionsForMatFloatingOptions,
} from '../animation/create-mat-overlay-open-close-options-for-mat-floating';
import { toStylePropertiesMap } from '@lirx/dom';
import { MatOverlay } from '../../../shared/instance/mat-overlay.class';
import {
  IMatOverlayFactoryFromComponentOptions,
  createMatOverlayFactoryFromComponent,
} from '../../../shared/factories/sync/create/create-mat-overlay-factory-from-component';

export interface IOpenMatFloatingOptions extends ICreateMatOverlayOpenCloseOptionsForMatFloatingOptions, IMatOverlayFactoryFromComponentOptions {
}

export function openMatFloating(
  {
    reference,
    options,
    onClose,
    cssVariables,
  }: IMatFloatingData,
  {
    slots,
    ..._options
  }: IOpenMatFloatingOptions,
): MatOverlay<IMatFloatingVirtualComponentNode> {
  const factory = createMatOverlayFactoryFromComponent(
    MatFloatingComponent,
    createMatOverlayOpenCloseOptionsForMatFloating<HTMLElement, IMatFloatingComponentData>(_options),
  );

  // const instance = new MatOverlay<IMatFloatingVirtualComponentNode>({
  //   node: MatFloatingComponent.create(slots),
  //   ...createMatOverlayOpenCloseOptionsForMatFloating<HTMLElement, IMatFloatingComponentData>(_options),
  // });

  const instance = factory({ slots });

  instance.node.bindInputWithObservable('reference', unknownToObservableAny(reference));

  if (options !== void 0) {
    instance.node.bindInputWithObservable('options', unknownToObservableNotUndefined(options));
  }

  if (onClose !== void 0) {
    instance.node.bindOutputWithObserver('close', onClose);
  }

  if (cssVariables !== void 0) {
    instance.node.setReactiveStylePropertiesMap(map$$(unknownToObservableNotUndefined(cssVariables), toStylePropertiesMap));
  }

  return instance;
}


