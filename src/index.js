import * as constants from './constants';
import * as actions from './actions';
import * as helpers from './helpers';
import * as reducers from './reducer';
import { default as initialState } from './initial-state';
import * as components from './components/';

export default function PositionPlugin(config = {}) {
  return {
    name: 'GriddlePosition',
    actions,
    constants,
    helpers: helpers,
    states: initialState(config),
    reducers,
    components: components
  };
};
