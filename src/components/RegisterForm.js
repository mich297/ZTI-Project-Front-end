import React, { useRef, useState, useEffect} from 'react';
import '../styles/Default.css';
import '../styles/Login.css';


const RegisterForm = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [email, setEmail] = useState('');
    const [passStr, setStr] = useState('none');
    const [progress, setProgress] = useState(0);
    const [communicate, setCommunicate] = useState('');
    const [matchLabel, setMatchlabel] = useState('red');

    const emailTemplate = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    const passTemplateHard = /^(((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/;
    const passTemplateMedium = /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/; 
    const passTemplateLow =  /^(?=.*[a-z])(?=.{6,})/; 

    useEffect(()=>{
        handleVerifyEmail();
        handleBar();
        handleConfirmPass();

    },[password, confirm, email])

    const handleSubmit = e => {
        e.preventDefault();
    }

    function handleBar(){
        if(password.match(passTemplateHard)) {
            setProgress(100);
            setStr("strong");
        }
        else if (password.match(passTemplateMedium)){
            setProgress(65);
            setStr("medium");
        }
        else if (password.match(passTemplateLow)){
            setProgress(20);
            setStr("low");
        }
        else {
            setProgress(0);
            setStr("none");
        };
    }

    function handleConfirmPass(){
        if(password===confirm) setMatchlabel("green");
        else setMatchlabel("red");
    }

    function handleVerifyEmail(){
        let condition = email.match(emailTemplate);
        if(condition) setCommunicate("Email is correct!");
        else setCommunicate("Invalid email!");
    }

    return(
        <>
            <h1>Sign up</h1>
            <form id="loginForm" 
                autoComplete="off"
                onSubmit={handleSubmit}>
                <input 
                type="textarea" 
                className="inputForm"
                placeholder="username" 
                value={username} 
                onChange={e => setUsername(e.currentTarget.value)}/>
                <input 
                type="password" 
                className="inputForm" 
                placeholder="password" 
                value={password} 
                onChange={e => setPassword(e.currentTarget.value)}/>
                <label 
                for="progressBar" 
                className="progressLabel">Password strength: <mark className={passStr}>{passStr}</mark></label>
                <progress 
                className={passStr+"Bar"} 
                id="progressBar" 
                value={progress} 
                max="100"></progress>
                <input 
                type="password" 
                id="confirmPass" 
                className="inputForm" 
                placeholder="confirm password" 
                value={confirm} 
                onChange={e => setConfirm(e.currentTarget.value)}></input>
                <label 
                for="confirmPass" 
                className={matchLabel}>{matchLabel==="red" ? "Passwords don't match" : "Passwords match"}</label>
                <input 
                type="email" 
                id="mailField" 
                className="inputForm" 
                placeholder="email" 
                autoComplete="off" 
                value={email} 
                onChange={e => setEmail(e.currentTarget.value)}></input>
                <label 
                for="mailField" 
                className="warningLabel">{communicate}</label>
                <button 
                type="submit" 
                className="button" >Submit</button>
            </form>
        </>
    );
}

export default RegisterForm;