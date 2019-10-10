import React from 'react';
import {connect} from 'react-redux';

import AddTodo from './AddTodo/AddTodo';
import TodoItem from './TodoItem/TodoItem';
import {removeTodo} from "./actions/todos";

const TodoList = ({todoList, removeTodo}) => {
    const handleItemClick = (todoItem) => {
        removeTodo(todoItem);
    }

    return (
        <>
            <div className="container align-middle">
                <AddTodo/>
            </div>
            <div className="container-fluid">
                {
                    todoList.length
                    ? todoList.map((todo, index) => <TodoItem key={index} todoItem={todo} handleItemClick={handleItemClick}/>)
                        : <p className="text-center">No Items to display</p>
                }
            </div>
        </>
    );
}

const mapStateToProps = state => ({
    todoList: state.todos.todoList || []
})

const mapDispatchToProps = {
    removeTodo
};

TodoList.whyDidYouRender = true

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);