import { createStore } from 'redux';
import throttle from 'lodash/throttle';

import rootReducer from '../reducers';
import { loadState, saveState } from './localStorage';

const configureStore = () => {
    const initialState = loadState();
    const store = createStore(rootReducer, initialState);
    store.subscribe(throttle(() => {
        saveState({
            todos: {
                todoList: store.getState().todos.todoList
            }
        });
    }, 1000));
    return store;
}

export default configureStore;