import React from 'react'

const TodoItem = ({ todoItem, handleItemClick}) => {
    const onItemClick = () => {
        handleItemClick(todoItem);
    }

    return (
        <div className="card m-1">
            <div className="card-header">
                {todoItem.title}
                <button type="button" className="close" aria-label="Close" onClick={onItemClick}>
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        </div>
    );
}

TodoItem.whyDidYouRender = true

export default TodoItem;