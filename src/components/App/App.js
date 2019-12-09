import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import './App.css';
import TodoPage from '../TodoPage';
import Footer from '../Footer';
import Navbar from '../Navbar';
import AddTodo from '../TodoPage/AddTodo';

const App = () => {
    return (
        <Router>
            <div id="page-top">
                <Navbar/>

                <header className="masthead bg-primary text-white text-center">
                    <div className="container">
                        <Switch>
                            <Route path="/add-todo" component={AddTodo}/>
                            <Route path="/" component={TodoPage} />
                            <Route component={TodoPage}/>
                        </Switch>
                    </div>
                </header>

                <Footer/>
            </div>
        </Router>
    );
}
App.whyDidYouRender = true
export default App;
