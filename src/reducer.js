export function XY_POSITION_CHANGED(state, action, helpers) {
  state = helpers.updatePositionProperties(action, state, helpers);
  return helpers.updateRenderedData(state, helpers);
}

export function GRIDDLE_LOADED_DATA_AFTER(state, action, helpers) {
  state = helpers.updatePositionProperties({ yScrollPosition: 0, xScrollPosition: 0, force: true}, state, helpers, true);
  return helpers.updateRenderedData(state, helpers);
}

export function GRIDDLE_GET_PAGE_AFTER(state, action, helpers) {
  return helpers.updateRenderedData(state, helpers);
}

export function GRIDDLE_NEXT_PAGE_AFTER(state, action, helpers) {
  return helpers.updateRenderedData(state, helpers);
}

export function GRIDDLE_PREVIOUS_PAGE_AFTER(state, action, helpers) {
  return helpers.updateRenderedData(state, helpers);
}

export function GRIDDLE_FILTERED_AFTER(state, action, helpers) {
  state = helpers.setCurrentPosition(state, 0, 0);
  return helpers.updateRenderedData(state, helpers);
}

export function GRIDDLE_SORT_AFTER(state, action, helpers) {
  return helpers.updateRenderedData(state, helpers);
}

export function AFTER_REDUCE(state, action, helpers) {
  const data = state.get('renderedData');
  const columns = helpers.getDataColumns(state, data)

  return state
    .set('renderedData', helpers.getVisibleDataColumns(helpers.getSortedColumns(data, columns), columns));
}
