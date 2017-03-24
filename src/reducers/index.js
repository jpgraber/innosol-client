import AuthReducer from './auth.reducer'
import UserReports from './user-reports.reducer';
import AdminReducer from './admin.reducer';
import SocketRoomsReducer from './socket-rooms.reducer';
import UsersReducer from './users.reducer';
import SliderReducer from './slider.reducer';
import InitialState from './initial-state';
import { Map } from 'immutable';

const reducers = Map({
  auth: AuthReducer,
  userReports: UserReports,
  admin: AdminReducer,
  users: UsersReducer,
  slider: SliderReducer
});

const rootReducer = (state = InitialState, action) => {
  reducers.forEach((reducer, key) => {
    const oldState = state.get(key);
    const newState = reducer(oldState, action);
    state = state.set(key, newState);
  });
  return state;
}

export default rootReducer;
