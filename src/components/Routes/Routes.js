import React from 'react';
import { Switch, Route } from 'react-router-dom';

import HomePage from '../HomePage';
import TodoPage from '../TodoPage';
import AddTodo from '../TodoPage/AddTodo';

const Routes = () => {
    return (
        <Switch>
            <Route path="/add-todo" component={AddTodo} />
            <Route path="/dashboard" component={TodoPage} />
            <Route path="/" component={HomePage} />
            <Route component={HomePage} />
        </Switch>
    );
}
Routes.whyDidYouRender = true
export default Routes;
