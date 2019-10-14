import React from 'react';

import './App.css';
import TodoPage from '../TodoPage/TodoPage';

const App = () => {
    return (
        <div className="container-fluid">
            <TodoPage />
        </div>
    );
}
App.whyDidYouRender = true
export default App;
