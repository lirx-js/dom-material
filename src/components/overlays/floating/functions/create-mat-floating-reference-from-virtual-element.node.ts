import { IGenericVirtualElementNode } from '@lirx/dom';
import { IMatFloatingReference } from '../mat-floating/types/mat-floating-reference.type';
import { ClientRectObject } from '@floating-ui/core';
import { getBoundingClientRect } from '../../../../functions/get-bounding-client-rect';

export function createMatFloatingReferenceFromVirtualElementNode(
  node: IGenericVirtualElementNode,
): IMatFloatingReference {
  return {
    getBoundingClientRect: (): ClientRectObject => {
      return getBoundingClientRect(node.elementNode);
    },
    contextElement: node.elementNode,
  };
}
