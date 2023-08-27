import { offset, OffsetOptions } from '@floating-ui/core';
import { IMatFloatingOptions } from '../mat-floating/types/options/mat-floating-options.type';
import { size, MiddlewareState, flip, shift } from '@floating-ui/dom';
import { IMatFloatingPlacementList } from '../mat-floating/types/options/mat-floating-placement';
import { matFloatingPlacementLikeToMatFloatingPlacementList, IMatFloatingPlacementLike } from './mat-floating-placement-like';
import { setMatFloatingMaxSize } from './set-mat-floating-max-size';

export interface ICreateMatFloatingOptions {
  placement?: IMatFloatingPlacementLike;
  defaultPlacements?: IMatFloatingPlacementList;
  offset?: OffsetOptions;
  maxWidth?: number;
  maxHeight?: number;
  marginWithContainer?: number;
}

export interface ISizeMiddleWareSizeApplyArgument extends MiddlewareState {
  availableWidth: number;
  availableHeight: number;
}

export function createMatFloatingOptions(
  {
    placement,
    defaultPlacements,
    offset: _offset,
    maxWidth = Number.POSITIVE_INFINITY,
    maxHeight = Number.POSITIVE_INFINITY,
    marginWithContainer = 10,
  }: ICreateMatFloatingOptions = {},
): IMatFloatingOptions {
  const placements: IMatFloatingPlacementList = matFloatingPlacementLikeToMatFloatingPlacementList(placement, defaultPlacements);

  return {
    placement: placements[0],
    middleware: [
      offset(_offset),
      size({
        apply({ elements }: ISizeMiddleWareSizeApplyArgument) {
          setMatFloatingMaxSize({
            element: elements.floating,
            maxWidth,
            maxHeight,
          });
        },
      }),
      flip({
        fallbackPlacements: placements.slice(1),
      }),
      shift(),
      size({
        apply({ availableWidth, availableHeight, elements }: ISizeMiddleWareSizeApplyArgument) {
          setMatFloatingMaxSize({
            element: elements.floating,
            maxWidth: Math.min(availableWidth - marginWithContainer, maxWidth),
            maxHeight: Math.min(availableHeight - marginWithContainer, maxHeight),
          });
        },
      }),
    ],
  };
}
