import uuidv4 from 'uuid/v4';

import * as actionTypes from '../../../constants/actionTypes';

export const addTodo = data => ({
    type: actionTypes.ADD_TODO,
    todoID: uuidv4(),
    data
})

export const removeTodo = data => ({
    type: actionTypes.REMOVE_TODO,
    data
})