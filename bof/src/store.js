import { createLogger } from "redux-logger";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";
import { compose, createStore, applyMiddleware } from "redux";

import rootReducer from "./reducers";

const persistConfig = {
  key: "root",
  storage: storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
  persistedReducer,
  compose(applyMiddleware(createLogger()))
);

persistStore(store);

export default store;
