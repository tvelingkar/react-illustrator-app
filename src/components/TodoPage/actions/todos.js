import { v4 as uuidv4 } from 'uuid';

import * as ActionTypes from '../../../constants';

export const addTodo = data => ({
  type: ActionTypes.ADD_TODO,
  todoID: uuidv4(),
  data,
});

export const removeTodo = todoID => ({
  type: ActionTypes.REMOVE_TODO,
  todoID,
});

export const resetAddState = data => ({
  type: ActionTypes.RESET_ADD_TODO,
  data,
});
