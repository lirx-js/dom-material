import { offset, OffsetOptions } from '@floating-ui/core';
import { IMatFloatingComputePositionConfig } from '../mat-floating/types/options/mat-floating-compute-position-config.type';
import { size, MiddlewareState, flip, shift } from '@floating-ui/dom';
import { IMatFloatingPlacementList } from '../mat-floating/types/options/mat-floating-placement';
import { matFloatingPlacementLikeToMatFloatingPlacementList, IMatFloatingPlacementLike } from './mat-floating-placement-like';
import { setMatFloatingMaxSize } from './set-mat-floating-max-size';

export interface ICreateMatFloatingOptions {
  readonly placement?: IMatFloatingPlacementLike;
  readonly defaultPlacements?: IMatFloatingPlacementList;
  readonly offset?: OffsetOptions;
  readonly maxWidth?: number;
  readonly maxHeight?: number;
  readonly marginWithContainer?: number;
}

export interface ISizeMiddleWareSizeApplyArgument extends MiddlewareState {
  readonly availableWidth: number;
  readonly availableHeight: number;
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
): IMatFloatingComputePositionConfig {
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
