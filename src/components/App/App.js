import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import './App.css';
import TodoPage from '../TodoPage/TodoPage';
import Footer from '../Footer/Footer';
import Navbar from '../Navbar/Navbar';
import AddTodo from '../TodoPage/AddTodo/AddTodo';

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
