import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import AuthReducer from "./reducers/AuthReducer";
import { composeWithDevTools } from 'redux-devtools-extension';

const middlewares = [thunk];

const reducers = combineReducers({
  auth: AuthReducer
})

export const store = createStore(reducers, composeWithDevTools(
  applyMiddleware(...middlewares)
))

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
