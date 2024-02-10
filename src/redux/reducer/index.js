import { photoReducer, registerReducer } from './auth';

import { combineReducers } from 'redux';
import { globalReducer } from './global';

const reducer = combineReducers({
  registerReducer,
  globalReducer,
  photoReducer,
});

export default reducer;
