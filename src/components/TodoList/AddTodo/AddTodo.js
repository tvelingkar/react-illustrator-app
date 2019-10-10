import React, {Component} from 'react';
import {connect} from 'react-redux';
import {addTodo} from "../actions/todos";

class AddTodo extends Component {
    initialState = {
        title: '',
        isComplete: false
    }
    constructor(props) {
        super(props);
        this.state = this.initialState;

        this.handleSubmit = this
            .handleSubmit
            .bind(this);
        this.handleTitleChange = this
            .handleTitleChange
            .bind(this);
    }

    static whyDidYouRender = true

    render() {
        return (
            <form onSubmit={this.handleSubmit} className="d-flex p-2 bd-highlight">
                <div className="input-group mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Task Title"
                        aria-label="Task Title"
                        aria-describedby="button-addon2"
                        value={this.state.title}
                        onChange={this.handleTitleChange}/>
                    <div className="input-group-append">
                        <button className="btn btn-primary" type="submit" id="button-addon2">Add Task</button>
                    </div>
                </div>
            </form>
        );
    }
    handleSubmit(event) {
        event.preventDefault();
        if (this.state.isComplete) {
            let todo = {
                title: this.state.title
            };
            this.setState(this.initialState)
            this
                .props
                .addTodo(todo);
        }
    }

    handleTitleChange(event) {
        this.setState({title: event.target.value, isComplete: true});
    }
}

const mapStateToProps = state => state;

const mapDispatchToProps = {
    addTodo
};

export default connect(mapStateToProps, mapDispatchToProps)(AddTodo);