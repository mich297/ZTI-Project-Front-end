import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link, useHistory } from "react-router-dom";
import '../styles/Default.css';
import '../styles/Login.css';
import InputText from './InputText.js';
import RegisterForm from './RegisterForm.js';
import LoginForm from './LoginForm.js';


const Login = (props) => {
    const [userId, setUserId] = useState(null);
    let history = useHistory();

    function useLogin(userId){
        setUserId(userId);
        history.push("/main");
    }

    return(
        <div id="loginContainer">
                <div className="loginRegisterForm">
                    <LoginForm login={useLogin}/>
                </div>
                <div className="loginRegisterForm">
                    <RegisterForm/>
                </div>
        </div>
    );
}



// class Login extends React.Component {
//     constructor(props){
//         super(props)
//         this.state = {
//             username: "",
//             password: ""
//         }
//     }

//     userProfile = (user, pass) => {
//         this.setState({
//             username: user,
//             password: pass
//         });
//     }


//     render(){
//         return(
//             <div id="loginContainer">
//                     <div className="loginRegisterForm">
//                         <InputText variant="login" userFunction={this.userProfile}/>
//                     </div>
//                     <div className="loginRegisterForm">
//                         <InputText variant="register" userFunction={this.userProfile}/>
//                     </div>
//             </div>
//         );
//     }
// }

export default Login;