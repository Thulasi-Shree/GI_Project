import { combineReducers, configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import authReducer from './redux-toolkit/slices/authSlice';
import usersReducer from './redux-toolkit/slices/usersSlice';

const rootReducer = combineReducers({
  authState: authReducer,
  usersState: usersReducer
});

const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk]
});

export { store };
