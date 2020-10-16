import { combineReducers } from 'redux'
import counter from './counter.jsx'
import addOrDelete from './addOrDelete'
import storage from 'redux-persist/lib/storage'
import { persistStore, persistReducer } from 'redux-persist'
import { createStore } from 'redux'

const persistConfig = {
    key: 'root',
    storage,
  }
 
  
const rootReducer = combineReducers({
    counter,
    addOrDelete
});

const persistedReducer = persistReducer(persistConfig, rootReducer)
 
// export default rootReducer;
export default () => {
    let store = createStore(persistedReducer)
    let persistor = persistStore(store)
    return { store,  persistor}
  }