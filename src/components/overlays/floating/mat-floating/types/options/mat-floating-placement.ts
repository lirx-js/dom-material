export type IMatFloatingAlignment = 'start' | 'end';

export type IMatFloatingSide = 'top' | 'right' | 'bottom' | 'left';

export type IMatFloatingAlignedPlacement = `${IMatFloatingSide}-${IMatFloatingAlignment}`;

export type IMatFloatingPlacement = IMatFloatingSide | IMatFloatingAlignedPlacement;

export type IMatFloatingPlacementList = readonly IMatFloatingPlacement[];

