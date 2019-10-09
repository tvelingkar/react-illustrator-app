import * as actionTypes from '../constants/actionTypes';

const todos = (state = {
    todoList: []
}, action) => {
    if (action.type === actionTypes.ADD_TODO) {
        let todoList = state
            .todoList
            .slice()
        todoList.splice(0, 0, {title: action.data.title});
        return {
            ...state,
            todoList
        };
    }
    return state;
}

export default todos;