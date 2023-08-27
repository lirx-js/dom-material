export function roundByDPR(
  value: number,
): number {
  const dpr: number = window.devicePixelRatio;
  return Math.round(value * dpr) / dpr;
}


export function floorByDPR(
  value: number,
): number {
  const dpr: number = window.devicePixelRatio;
  return Math.floor(value * dpr) / dpr;
}

