import Immutable from 'immutable';

export default function initialState(config = {}) {
  return Immutable.fromJS({
    currentPosition: {
      height: 500,
      width: 500,
      xScrollChangePosition: 0,
      yScrollChangePosition: 0,
      renderedStartDisplayIndex: 0,
      renderedEndDisplayIndex: 16,
      visibleDataLength: 16
    },
    positionConfig: {
      tableHeight: '70%',
      tableWidth: null,
      rowHeight: 30,
      defaultColumnWidth: null,
      fixedHeader: true,
      ...config
    },
    renderedData: []
  });
}