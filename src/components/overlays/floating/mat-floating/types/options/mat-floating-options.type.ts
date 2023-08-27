import { ComputePositionConfig } from '@floating-ui/dom';

export interface IMatFloatingOptions extends Partial<ComputePositionConfig> {
  updateInterval?: number;
}
