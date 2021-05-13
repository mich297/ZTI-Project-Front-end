import React from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import Login from './Login.js';
import Main from './Main.js';
import RegisterForm from './RegisterForm.js';

class StartComponent extends React.Component {
    
    render(){
        return(
            <div id="background">
                <BrowserRouter>
                    <Route exact path="/">
                        <Login/>
                    </Route>
                    <Route exact path="/register">
                        <RegisterForm/>
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