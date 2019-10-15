import * as actionTypes from '../constants/actionTypes';

const todos = (state = {
    todoList: []
}, action) => {
    if (action.type === actionTypes.ADD_TODO) {
        let todoList = state
            .todoList
            .slice()
        todoList.splice(0, 0, { todoID: action.todoID, title: action.data.title });
        return {
            ...state,
            todoList
        };
    }
    if (action.type === actionTypes.REMOVE_TODO) {
        let todoList = state
            .todoList
            .slice()
        let index = todoList.findIndex(item => item.todoID === action.todoID);
        todoList.splice(index, 1);
        return {
            ...state,
            todoList
        };
    }
    return state;
}

export default todos;