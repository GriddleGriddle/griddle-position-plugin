import * as types from './constants';
import { GriddleActions } from 'griddle-core';

export function resizeColumn(column, change) {
  return {
    type: types.COLUMN_RESIZE,
    gridId,
    column,
    change
  };
}

export function setScrollPosition(xScrollPosition, xScrollMax, xVisible, yScrollPosition, yScrollMax, yVisible) {
  return {
    type: types.XY_POSITION_CHANGED,
    xScrollPosition,
    xScrollMax,
    xVisible,
    yScrollPosition,
    yScrollMax,
    yVisible
  };
}
