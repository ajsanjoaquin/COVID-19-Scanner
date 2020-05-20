import {combineReducers} from 'redux';
import ImageReducers from './ImageReducers';
import UserReducer from './UserReducer';

export default combineReducers({    
    Image: ImageReducers,
    user: UserReducer
})