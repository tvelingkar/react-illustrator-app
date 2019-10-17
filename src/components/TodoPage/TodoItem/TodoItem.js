import React from 'react'
import {connect} from 'react-redux';

import {removeTodo} from "../actions/todos";

const TodoItem = ({todoItem, removeTodo}) => {
    return (
        <div className="card-header m-2 rounded">
            <span>{todoItem.title}</span>
            <button type="button" className="close" aria-label="Close" onClick={removeTodo}>
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
    );
}

TodoItem.whyDidYouRender = true

const mapDispatchToProps = {
    removeTodo
};

export default connect(null, mapDispatchToProps)(TodoItem);