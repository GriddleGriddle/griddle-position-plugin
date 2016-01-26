import Immutable from 'immutable';
import { default as initialState } from './initial-state';

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
  let rowHeight = state.getIn(['positionConfig', 'rowHeight']);

  return Math.abs(action.yScrollPosition - yScrollChangePosition) >= rowHeight;
}

export function updatePositionProperties(action, state, helpers, force) {
  if (!action.force && !helpers.shouldUpdateDrawnRows(action, state) && !Immutable.is(state.get('positionConfig'), initialState().get('positionConfig'))) {
    return state; // Indicate that this shouldn't result in an emit.
  }
  const rowHeight = state.getIn(['positionConfig', 'rowHeight']);
  const tableHeight = state.getIn(['positionConfig', 'tableHeight']);

  const visibleRecordCount = Math.ceil(tableHeight / rowHeight);
  const visibleDataLength = helpers.getDataSetSize(state);

  const verticalScrollPosition = action.yScrollPosition || 0;
  const horizontalScrollPosition = action.xScrollPosition || 0;

  // Inspired by : http://jsfiddle.net/vjeux/KbWJ2/9/
  let renderedStartDisplayIndex = Math.max(0, Math.floor(Math.floor(verticalScrollPosition / rowHeight) - visibleRecordCount * 0.25));
  let renderedEndDisplayIndex = Math.min(Math.floor(renderedStartDisplayIndex + visibleRecordCount * 1.25), visibleDataLength - 1) + 1;

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
