import React from 'react';
import { Switch, Route } from 'react-router-dom';

import TodoPage from '../TodoPage';
import AddTodo from '../TodoPage/AddTodo';

const Routes = () => {
    return (
        <Switch>
            <Route path="/add-todo" component={AddTodo} />
            <Route path="/" component={TodoPage} />
            <Route component={TodoPage} />
        </Switch>
    );
}
Routes.whyDidYouRender = true
export default Routes;
