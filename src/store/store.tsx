import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import AuthReducer from "./reducers/AuthReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import { PrintListUsers } from "./reducers/PrintListUsers";

const middlewares = [thunk];

const reducers = combineReducers({
  auth: AuthReducer,
  print: PrintListUsers
})

export const store = createStore(reducers, composeWithDevTools(
  applyMiddleware(...middlewares)
))

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
