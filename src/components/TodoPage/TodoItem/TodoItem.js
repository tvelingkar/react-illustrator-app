import React from 'react';
import { connect } from 'react-redux';
import { Button, ListItem } from 'carbon-components-react';

import { removeTodo } from '../actions/todos';

import './TodoItem.scss';

const TodoItem = ({ todoItem, removeTodo }) => {
  return (
    <ListItem title={todoItem.title}>
      <div className='bx--grid'>
        <div className='bx--row'>
          <span className='bx--col-sm-3'>{todoItem.title}</span>
          <span className='bx--col-sm-1 text-center'>
            <Button onClick={removeTodo}>
              <span aria-hidden='true'>&times;</span>
            </Button>
          </span>
        </div>
      </div>
    </ListItem>
  );
};

TodoItem.whyDidYouRender = true;

const mapDispatchToProps = {
  removeTodo,
};

export default connect(null, mapDispatchToProps)(TodoItem);
