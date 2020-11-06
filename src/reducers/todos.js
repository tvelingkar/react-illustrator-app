import * as actionTypes from '../constants/actionTypes';

const todos = (
  state = {
    todoList: [],
    isAddSuccess: false,
  },
  action
) => {
  if (action.type === actionTypes.ADD_TODO) {
    let todoList = state.todoList.slice();
    todoList.splice(0, 0, { todoID: action.todoID, title: action.data.title });
    return {
      ...state,
      todoList,
      isAddSuccess: true,
    };
  }
  if (action.type === actionTypes.REMOVE_TODO) {
    let todoList = state.todoList.slice();
    let index = todoList.findIndex(item => item.todoID === action.todoID);
    todoList.splice(index, 1);
    return {
      ...state,
      todoList,
    };
  }
  if (action.type === actionTypes.RESET_ADD_TODO) {
    return {
      ...state,
      isAddSuccess: false,
    };
  }
  return state;
};

export default todos;
