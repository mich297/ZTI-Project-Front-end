import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link, withRouter} from "react-router-dom";
import Login from './Login.js';
import Main from './Main.js';

class StartComponent extends React.Component {
    
    render(){
        return(
            <div id="background">
                <BrowserRouter>
                    <Route exact path="/">
                        <Login/>
                    </Route>
                    <Route exact path="/main">
                        <Main/>
                    </Route>
                </BrowserRouter> 
            </div>
        );
    }
}

export default StartComponent;