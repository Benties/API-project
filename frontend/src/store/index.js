import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import thunk from "redux-thunk";
import reviewReducer from "./review";
import sessionReducer from './session';
import spotReducer from "./spot";


const rootReducer = combineReducers({
  session: sessionReducer,
  spot: spotReducer,
  review: reviewReducer
});

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

let enhancer;

if (process.env.NODE_ENV === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require("redux-logger").default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}


const configureStore = (preloadedState) => {
  // return createStore(rootReducer, preloadedState, enhancer);
  let store = createStore(persistedReducer, preloadedState, enhancer)
  let persistor = persistStore(store)
  return { store, persistor }
};


export default configureStore;
