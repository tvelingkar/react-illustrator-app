import React from 'react';
import {connect} from 'react-redux';

import AddTodo from './AddTodo/AddTodo';
import TodoItem from './TodoItem/TodoItem';

const TodoPage = ({todoList}) => {
    return (
        <>
            <div className="container align-middle">
                <AddTodo/>
            </div>
            {
                todoList && todoList.length
                    ? todoList.map((todo) => <TodoItem key={todo.todoID} todoItem={todo}/>)
                    : <p className="text-center">No Items to display</p>
            }
        </>
    );
}

const mapStateToProps = state => ({
    todoList: state.todos.todoList || []
})

TodoPage.whyDidYouRender = true

export default connect(mapStateToProps)(TodoPage);