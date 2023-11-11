import { ComputePositionConfig } from '@floating-ui/dom';

export interface IMatFloatingComputePositionConfig extends Partial<ComputePositionConfig> {
  readonly updateInterval?: number;
}
