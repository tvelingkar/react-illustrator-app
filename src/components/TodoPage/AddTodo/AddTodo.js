import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addTodo, resetAddState } from "../actions/todos";
import { Redirect } from "react-router-dom";
import { Button, Form } from 'carbon-components-react';

import './AddTodo.scss';

const AddTodo = ({ addTodo, resetAddState, todos }) => {
    const [title,
        setTitle] = useState('');
    const [isComplete,
        setIsComplete] = useState(false);

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

    if (todos.isAddSuccess) {
        resetAddState();
    }

    return todos.isAddSuccess ? (
        <Redirect to='/' />
    ) : (
            <Form onSubmit={handleSubmit}>
                <section>
                    <div class="bx--form-item">
                        <label for="text1" class="bx--label">Task Title</label>
                        <input
                            type="text"
                            class="bx--text__input"
                            placeholder="Task Title"
                            value={title}
                            onChange={handleTitleChange}
                        />
                    </div>
                </section>
                <Button type="submit">
                    Add Task
                </Button>
            </Form>
        );
}

const mapStateToProps = state => state;

const mapDispatchToProps = {
    addTodo,
    resetAddState
};

AddTodo.whyDidYouRender = true;

export default connect(mapStateToProps, mapDispatchToProps)(AddTodo);