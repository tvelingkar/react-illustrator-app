import React from 'react';
import {connect} from 'react-redux';

import AddTodo from './AddTodo/AddTodo';

const TodoList = (props) => {
    return (
        <div className="todoListMain">
            <div className="container align-middle">
                <AddTodo/>
            </div>
            <div className="container-fluid">
                <ul className="list-group">
                    {props
                        .todoList
                        .map((todo, index) => <li
                            className="list-group-item"
                            key={index}>{todo.title}</li>)}
                </ul>
            </div>
        </div>
    );
}

const mapStateToProps = state => ({
    todoList: state.todos.todoList || []
})

export default connect(mapStateToProps)(TodoList);