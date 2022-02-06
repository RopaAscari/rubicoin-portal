
import thunk from 'redux-thunk';
import { persistStore } from 'redux-persist';
import {createStore, applyMiddleware, Store} from 'redux';
import {persistedReducer} from '../reducers/combinedReducers';

const middleware = applyMiddleware(thunk);

const store: Store<any> & {
  dispatch: any;
} = createStore(persistedReducer, middleware);
const persistor = persistStore(store);

export { store, persistor };