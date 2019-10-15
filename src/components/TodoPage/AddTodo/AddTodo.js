import React, {useState} from 'react';
import {connect} from 'react-redux';
import {addTodo} from "../actions/todos";

const AddTodo = ({addTodo}) => {
    const [title, setTitle] = useState('');
    const [isComplete, setIsComplete] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (isComplete) {
            let todo = {
                title: title
            };
            setTitle('');
            setIsComplete(false);
            addTodo(todo);
        }
    }

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
        setIsComplete(true);
    }

    return (
        <form onSubmit={handleSubmit} className="d-flex p-2 bd-highlight">
            <div className="input-group mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Task Title"
                    aria-label="Task Title"
                    aria-describedby="button-submit"
                    value={title}
                    onChange={handleTitleChange} />
                <div className="input-group-append">
                    <button className="btn btn-primary" type="submit" id="button-submit">Add Task</button>
                </div>
            </div>
        </form>
    );
}

const mapDispatchToProps = {
    addTodo
};

AddTodo.whyDidYouRender = true;

export default connect(null, mapDispatchToProps)(AddTodo);