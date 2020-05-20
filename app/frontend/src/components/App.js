import React from 'react'

import Header from './Header';
import Past from './Past';
import Login from './Login';
import Upload from './Upload'

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from 'react-router-dom'


const App = () => {
    return (
        <Router>
            <Header />
                <div className = "flex flex-col items-center justify-center">
                <Switch>
                    <Route exact path = '/'>
                        <Upload />
                    </Route>
                    <Route exact path = '/past'>
                        <Past />
                    </Route>
                    <Route exact path = '/login'>
                        <Login />
                    </Route>

                </Switch>
                </div>
        </Router>
            
    )
}

export default App;
