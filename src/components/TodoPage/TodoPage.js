import React from 'react';
import {connect} from 'react-redux';

import TodoItem from './TodoItem';

const TodoPage = ({todoList}) => {
    return (
        <>
            <h1 className="display-4 text-uppercase m-2">Todo List</h1>
            <div>
            {
                todoList && todoList.length
                    ? todoList.map((todo) => <TodoItem key={todo.todoID} todoItem={todo}/>)
                    : <p className="text-center m-0 p-5">No Items to display</p>
            }
            </div>
        </>
    );
}

const mapStateToProps = state => ({
    todoList: state.todos.todoList || []
})

TodoPage.whyDidYouRender = true

export default connect(mapStateToProps)(TodoPage);