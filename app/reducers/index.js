import {combineReducers} from 'redux';
import user from 'reducers/user';
import {routeReducer} from 'redux-simple-router';


const rootReducer = {
  user
};

const reducer = combineReducers(Object.assign({}, rootReducer, {
  routing: routeReducer
}));


export default reducer;
