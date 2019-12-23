import React from 'react';
import {connect} from 'react-redux';

import TodoItem from './TodoItem/TodoItem';
import { OrderedList, Tile } from 'carbon-components-react';

const TodoPage = ({todoList}) => {
    return (
        <>
            <h1 className="text-center">Todo List</h1>
            <OrderedList>
            {
                todoList && todoList.length
                    ? todoList.map((todo) => <TodoItem key={todo.todoID} todoItem={todo}/>)
                    : <Tile><p className="text-center">No Items to display</p></Tile>
            }
            </OrderedList>
        </>
    );
}

const mapStateToProps = state => ({
    todoList: state.todos.todoList || []
})

TodoPage.whyDidYouRender = true

export default connect(mapStateToProps)(TodoPage);