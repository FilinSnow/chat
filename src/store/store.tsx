import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";


const reducers = combineReducers({

})

export const store = createStore(reducers, applyMiddleware(thunk))

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;