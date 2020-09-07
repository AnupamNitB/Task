import {combineReducers} from 'redux';
import ReducerLoadingScreen from './ReducerLoadingScreen';
import ReducerUserDetails from './ReducerUserDetails';

// combine all reducers
const rootReducer = combineReducers({
  ReducerUserDetails: ReducerUserDetails,
  ReducerLoadingScreen: ReducerLoadingScreen,
});

export default rootReducer;
