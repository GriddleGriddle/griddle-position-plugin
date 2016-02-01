import Immutable from 'immutable';
import { default as initialState } from './initial-state';

function getVisibleRecordCount(state) {
  const rowHeight = state.getIn(['positionConfig', 'rowHeight']);
  const tableHeight = state.getIn(['positionConfig', 'tableHeight']);

  return Math.ceil(tableHeight / rowHeight);
}

export function getRenderedData(state) {
  state = state;
  return state.get('renderedData');
}

export function getPositionData(state) {
  state = state;
  return state.get('currentPosition').toJS();
}

export function shouldUpdateDrawnRows(action, state) {
  let yScrollChangePosition = state.getIn(['currentPosition', 'yScrollChangePosition']);
  const rowHeight = state.getIn(['positionConfig', 'rowHeight']);

  // Get the current visible record count.
  const visibleRecordCount = getVisibleRecordCount(state);

  // Get the count of rendered rows.
  const startDisplayIndex = state.getIn(['currentPosition', 'renderedStartDisplayIndex']);
  const endDisplayIndex = state.getIn(['currentPosition', 'renderedEndDisplayIndex']);
  const renderedRecordCount = endDisplayIndex - startDisplayIndex;

  // Calculate the height of a third of the difference.
  const rowDifferenceHeight = rowHeight * (renderedRecordCount - visibleRecordCount) / 3;

  return Math.abs(action.yScrollPosition - yScrollChangePosition) >= rowDifferenceHeight;
}

export function updatePositionProperties(action, state, helpers, force) {
  if (!action.force && !helpers.shouldUpdateDrawnRows(action, state) && !Immutable.is(state.get('currentPosition'), initialState().get('currentPosition'))) {
    return state; // Indicate that this shouldn't result in an emit.
  }
  const visibleRecordCount = getVisibleRecordCount(state);
  const visibleDataLength = helpers.getDataSetSize(state);

  const rowHeight = state.getIn(['positionConfig', 'rowHeight']);

  const verticalScrollPosition = action.yScrollPosition || 0;
  const horizontalScrollPosition = action.xScrollPosition || 0;

  // Inspired by : http://jsfiddle.net/vjeux/KbWJ2/9/
  let renderedStartDisplayIndex = Math.max(0, Math.floor(Math.floor(verticalScrollPosition / rowHeight) - visibleRecordCount * 0.25));
  let renderedEndDisplayIndex = Math.min(Math.floor(renderedStartDisplayIndex + visibleRecordCount * 2), visibleDataLength - 1) + 1;

  state = setCurrentPosition(state, verticalScrollPosition, horizontalScrollPosition);
  return state
    .setIn(['currentPosition', 'renderedStartDisplayIndex'], renderedStartDisplayIndex)
    .setIn(['currentPosition', 'renderedEndDisplayIndex'], renderedEndDisplayIndex)
    .setIn(['currentPosition', 'visibleDataLength'], visibleDataLength);
}

export function setCurrentPosition(state, yScrollPosition, xScrollPosition) {
  return state
    .setIn(['currentPosition', 'yScrollChangePosition'], yScrollPosition)
    .setIn(['currentPosition', 'xScrollChangePosition'], xScrollPosition);
}

export function updateRenderedData(state, helpers) {
  const startDisplayIndex = state.getIn(['currentPosition', 'renderedStartDisplayIndex']);
  const columns = helpers.getDataColumns(state, data);
  const data = helpers.getDataSet(state);

  return state
    .set('renderedData', helpers.getVisibleDataColumns(helpers.getSortedColumns(data, columns), columns)
                          .skip(startDisplayIndex)
                          .take(state.getIn(['currentPosition', 'renderedEndDisplayIndex']) - startDisplayIndex));
}
