import React, { createRef } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import '../styles/Default.css';
import '../styles/Login.css';

class InputText extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            valueUser: "",
            valuePass: "",
            valueConfirmPass: "",
            valueEmail: "",
            isVisible: false,
            isMailCorrect: "none",
            progress: "",
            strength: "none",
            passwordsMatch: false
        }
        this.handleChangeUser = this.handleChangeUser.bind(this);
        this.handleChangePass = this.handleChangePass.bind(this);
        this.handleChangeConfPass = this.handleChangeConfPass.bind(this);
        this.showHidePassword = this.showHidePassword.bind(this);
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleVerifyEmail = this.handleVerifyEmail.bind(this);
        this.handlePassCheck = this.handlePassCheck.bind(this);
        this.passRef = createRef();
        this.passRefConfirm = createRef();
        this.barRef = createRef();
        this.emailTemplate = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
        this.passTemplateHard = /^(((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/;
        this.passTemplateMedium = /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/; 
        this.passTemplateLow =  /^(?=.*[a-z])(?=.{6,})/; 
    }


    handleChangeUser(event){
        this.setState({
            valueUser: event.target.value
        });

    }

    handleChangePass(event){
        this.setState({
            valuePass: event.target.value,
            progress: !this.props.isLoginOrRegister ? this.handleBar(event.target.value)[0] : "",
            strength: !this.props.isLoginOrRegister ? this.handleBar(event.target.value)[1] : ""
        });

    }

    handleChangeConfPass(event){
        this.setState({
            valueConfirmPass: event.target.value,
        });
    }

    handleChangeEmail(event){
        this.setState({
            valueEmail: event.target.value
        });
    }

    handleVerifyEmail(event){
        let condition = event.target.value.match(this.emailTemplate);
        if(condition) this.setState({isMailCorrect: true});
        else this.setState({isMailCorrect: false});
    }

    handleBar(password){
        if(password.match(this.passTemplateHard)) return ["100", "strong"];
        else if (password.match(this.passTemplateMedium)) return ["65", "medium"];
        else if (password.match(this.passTemplateLow)) return ["20", "low"];
        else return ["0", "none"];
    }

    handlePassCheck(event){
        if(this.state.valuePass === this.state.valueConfirmPass) this.setState({passwordsMatch: true});
        else this.setState({passwordsMatch: false});
    }

    handlePrevention(event) {
        event.preventDefault();
    }

    showHidePassword() {
        this.setState({
            isVisible: !this.state.isVisible
        }, () => {
            this.passRef.current.type = this.state.isVisible ? "textarea" : "password";
            if(this.props.variant === "register") this.passRefConfirm.current.type = this.state.isVisible ? "textarea" : "password";
        });
    }

    render(){
        const isLoginOrRegister = this.props.variant === "login";
        return(
            <>
                <h1>{isLoginOrRegister ? "Sign in" : "Sign up"}</h1>
                <input type="textarea" placeholder="username" value={this.state.valueUser} onChange={this.handleChangeUser} onSubmit={this.handlePrevention}></input>
                <input type="password" ref={this.passRef} className={this.state.isVisible} placeholder="password" value={this.state.valuePass} onChange={this.handleChangePass} onSubmit={this.handlePrevention} onBlur={this.handlePassCheck}></input>
                {!isLoginOrRegister && <label for="progressBar" className="progressLabel">Password strength: <mark className={this.state.strength}>{this.state.strength}</mark></label>}
                {!isLoginOrRegister && <progress ref={this.barRef} className={this.state.strength+"Bar"} id="progressBar" value={this.state.progress} max="100"></progress>}
                {!isLoginOrRegister && <input type="password" id="confirmPass" ref={this.passRefConfirm} placeholder="confirm password" value={this.state.valueConfirmPass} onChange={this.handleChangeConfPass} onBlur={this.handlePassCheck}></input>}
                {!isLoginOrRegister && <label for="confirmPass" className={this.state.passwordsMatch === false ? "redWarning" : "greenWarning"}>{this.state.passwordsMatch === false ? "Passwords don't match" : "Passwords match"}</label>}
                {!isLoginOrRegister && 
                <>
                <input type="email" ref={this.emailRef} id="mailField" placeholder="email" value={this.state.valueEmail} onChange={this.handleChangeEmail} onBlur={this.handleVerifyEmail}></input>
                <label for="mailField" className="warningLabel">{this.state.isMailCorrect === "none" ? "" : this.state.isMailCorrect ? "" : "Incorrect email"}</label>
                </>
                }
                <div className="checkContainer">
                    <input id="showPass" type="checkbox" onChange={this.showHidePassword}/> 
                    <label for="showPass">{this.state.isVisible ? "Hide password" : "Show password"}</label>
                </div>
                    <Link to="/main">
                        <button onClick={()=>this.props.userFunction(this.state.valueUser, this.state.valuePass)}>{this.props.variant}</button>
                    </Link>
            </>
        );
    }
}

export default InputText;