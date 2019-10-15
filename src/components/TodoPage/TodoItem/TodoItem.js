import React from 'react'
import {connect} from 'react-redux';

import {removeTodo} from "../actions/todos";

const TodoItem = ({todoItem, removeTodo}) => {
    return (
        <div className="card m-1">
            <div className="card-header">
                {todoItem.title}
                <button type="button" className="close" aria-label="Close" onClick={removeTodo}>
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        </div>
    );
}

TodoItem.whyDidYouRender = true

const mapDispatchToProps = {
    removeTodo
};

export default connect(null, mapDispatchToProps)(TodoItem);