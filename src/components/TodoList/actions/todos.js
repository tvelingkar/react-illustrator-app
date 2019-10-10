import * as actionTypes from '../../../constants/actionTypes';

export const addTodo = data => ({
    type: actionTypes.ADD_TODO,
    data
})

export const removeTodo = data => ({
    type: actionTypes.REMOVE_TODO,
    data
})