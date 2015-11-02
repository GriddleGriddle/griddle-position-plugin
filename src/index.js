import * as constants from './constants';
import * as helpers from './helpers';
import * as reducers from './reducer';
import { default as initialState } from './initial-state';
import * as components from './components/';

export default {
  name: 'GriddlePosition',
  constants,
  helpers: helpers,
  states: initialState,
  reducers,
  components
};