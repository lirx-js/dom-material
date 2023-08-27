import { VirtualComponentNode, InferDataInputKeys } from '@lirx/dom';
import {
  IObservableToPromiseOptions,
  toPromise,
  debounceMicrotask$$,
  IInferObservableGValue,
  IUnknownToObservableStrict,
} from '@lirx/core';

export function getVirtualComponentNodeInputAfterMicroDelay<GData extends object, GKey extends InferDataInputKeys<GData>>(
  node: VirtualComponentNode<any, GData>,
  key: GKey,
  options?: IObservableToPromiseOptions,
): Promise<IInferObservableGValue<IUnknownToObservableStrict<GData[GKey]>>> {
  return toPromise<IInferObservableGValue<IUnknownToObservableStrict<GData[GKey]>>>(
    debounceMicrotask$$<IInferObservableGValue<IUnknownToObservableStrict<GData[GKey]>>>(
      node.input$<GKey>(key) as any,
    ),
    options,
  );
}
