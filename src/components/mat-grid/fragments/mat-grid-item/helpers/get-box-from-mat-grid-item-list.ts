import { IMatGridItemPosition, IMatGridItemPositionEntry } from './mat-grid-item-position.type';

export function getBoxFromMatGridItemList(
  elements: ArrayLike<HTMLElement>,
): IMatGridItemPosition {
  const length: number = elements.length;
  const positions: IMatGridItemPosition[] = new Array(length);

  for (let i = 0; i < length; i++) {
    try {
      positions[i] = elementToMatGridItemPosition(elements[i]);
    } catch (error: unknown) {
      throw new Error(`At position ${i}: ${(error as Error).message}`, { cause: error });
    }
  }

  return getBoxFromMatGridItemPositionList(positions);
}

function getBoxFromMatGridItemPositionList(
  positions: ArrayLike<IMatGridItemPosition>,
): IMatGridItemPosition {
  const length: number = positions.length;
  if (length === 0) {
    return [0, 0, 0, 0];
  } else {
    let left: number = Number.POSITIVE_INFINITY;
    let top: number = Number.POSITIVE_INFINITY;
    let right: number = Number.NEGATIVE_INFINITY;
    let bottom: number = Number.NEGATIVE_INFINITY;

    for (let i = 0; i < length; i++) {
      const [_left, _top, _width, _height]: IMatGridItemPosition = positions[i];
      left = Math.min(left, _left);
      top = Math.min(top, _top);
      right = Math.max(right, _left + _width);
      bottom = Math.max(bottom, _top + _height);
    }

    return [
      left,
      top,
      right - left,
      bottom - top,
    ];
  }
}

/*-------*/

function elementToMatGridItemPosition(
  element: HTMLElement,
): IMatGridItemPosition {
  try {
    return cssStyleDeclarationToMatGridItemPosition(element.style);
  } catch (error: unknown) {
    throw new Error(`Unable to infer the position of the element "${element.tagName.toLowerCase()}": ${(error as Error).message}`, { cause: error });
  }
}

function cssStyleDeclarationToMatGridItemPosition(
  style: CSSStyleDeclaration,
): IMatGridItemPosition {
  return [
    stylePropertyToMatGridItemPositionEntry(style, '--mat-grid-item-left'),
    stylePropertyToMatGridItemPositionEntry(style, '--mat-grid-item-top'),
    stylePropertyToMatGridItemPositionEntry(style, '--mat-grid-item-width'),
    stylePropertyToMatGridItemPositionEntry(style, '--mat-grid-item-height'),
  ];
}

/*------*/

function stylePropertyToMatGridItemPositionEntry(
  style: CSSStyleDeclaration,
  propertyName: string,
): IMatGridItemPositionEntry {
  try {
    return stringToMatGridItemPositionEntry(style.getPropertyValue(propertyName));
  } catch (error: unknown) {
    throw new Error(`Unable to parse property ${propertyName}: ${(error as Error).message}`, { cause: error });
  }
}

function stringToMatGridItemPositionEntry(
  input: string,
): IMatGridItemPositionEntry {
  const value: number = Number(input.trim());
  if (
    Number.isSafeInteger(value)
    && (value >= 0)
  ) {
    return value;
  } else {
    throw new Error(`input must be an integer greater or equal than 0`);
  }
}

