import { Placement } from '@floating-ui/core';
import { IMatFloatingPlacement, IMatFloatingPlacementList } from '../mat-floating/types/options/mat-floating-placement';

export type IMatFloatingPlacementLike =
  | IMatFloatingPlacement
  | Iterable<IMatFloatingPlacement>;

const DEFAULT_PLACEMENTS: IMatFloatingPlacementList = ['bottom-start', 'top-start', 'right-start', 'left-start'];

export function matFloatingPlacementLikeToMatFloatingPlacementList(
  placement: IMatFloatingPlacementLike | undefined,
  defaultPlacements: IMatFloatingPlacementList = DEFAULT_PLACEMENTS,
): IMatFloatingPlacementList {
  if (typeof placement === 'undefined') {
    return defaultPlacements;
  } else if (typeof placement === 'string') {
    return [placement, ...defaultPlacements.filter(_ => _ !== placement)];
  } else if (Array.isArray(placement)) {
    return (placement.length === 0)
      ? defaultPlacements
      : placement;
  } else {
    const placements: Placement[] = Array.from(placement);
    return (placements.length === 0)
      ? defaultPlacements
      : placements;
  }
}
