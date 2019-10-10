import * as actionTypes from '../constants/actionTypes';

const todos = (state = {
    todoList: []
}, action) => {
    if (action.type === actionTypes.ADD_TODO) {
        let todoList = state
            .todoList
            .slice()
        todoList.splice(0, 0, { title: action.data.title });
        return {
            ...state,
            todoList
        };
    }
    if (action.type === actionTypes.REMOVE_TODO) {
        let todoList = state
            .todoList
            .slice()
        let index = todoList.indexOf(action.data)
        todoList.splice(index, 1);
        return {
            ...state,
            todoList
        };
    }
    return state;
}

export default todos;