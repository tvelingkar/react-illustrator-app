import React from 'react';
import {connect} from 'react-redux';

import AddTodo from './AddTodo/AddTodo';
import TodoItem from './TodoItem/TodoItem';
import {removeTodo} from "./actions/todos";

const TodoPage = ({todoList, removeTodo}) => {
    const handleItemClick = (todoItem) => {
        removeTodo(todoItem);
    }

    return (
        <>
            <div className="container align-middle">
                <AddTodo/>
            </div>
            {
                todoList.length
                ? todoList.map((todo) => <TodoItem key={todo.todoID} todoItem={todo} handleItemClick={handleItemClick}/>)
                    : <p className="text-center">No Items to display</p>
            }
        </>
    );
}

const mapStateToProps = state => ({
    todoList: state.todos.todoList || []
})

const mapDispatchToProps = {
    removeTodo
};

TodoPage.whyDidYouRender = true

export default connect(mapStateToProps, mapDispatchToProps)(TodoPage);