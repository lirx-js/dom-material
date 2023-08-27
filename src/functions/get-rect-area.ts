export interface IRectArea {
  readonly x: readonly [start: number, end: number];
  readonly y: readonly [start: number, end: number];
}

export function getRectArea(
  element: Element,
): IRectArea {
  if (window.getComputedStyle(element).display === 'contents') {
    const children: Element[] = Array.from(element.children);

    if (children.length === 0) {
      return  {
        x: [0, 0],
        y: [0, 0],
      };
    } else {
      return children
        .reduce<IRectArea>(
          (
            {
              x: [x_start, x_end],
              y: [y_start, y_end],
            }: IRectArea,
            childElement: Element,
          ): IRectArea => {
            const {
              x: [x_start_child, x_end_child],
              y: [y_start_child, y_end_child],
            } = getRectArea(childElement);

            return {
              x: [Math.min(x_start, x_start_child), Math.max(x_end, x_end_child)],
              y: [Math.min(y_start, y_start_child), Math.max(y_end, y_end_child)],
            };
          },
          {
            x: [Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY],
            y: [Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY],
          },
        );
    }
  } else {
    const {
      x,
      y,
      width,
      height,
    }: DOMRect = element.getBoundingClientRect();

    return {
      x: [x, x + width],
      y: [y, y + height],
    };
  }
}


