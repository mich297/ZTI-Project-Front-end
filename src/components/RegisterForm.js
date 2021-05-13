import React, { useState, useEffect} from 'react';
import { useHistory } from 'react-router';
import '../styles/css/Default.css';
import '../styles/css/Login.css';

const RegisterForm = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [email, setEmail] = useState('');
    const [passStr, setStr] = useState('none');
    const [communicate, setCommunicate] = useState('');
    const [matchLabel, setMatchlabel] = useState(null);
    const [userInvalid, setInvalid] = useState("");
    let history = useHistory();

    const emailTemplate = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    const passTemplateHard = /^(((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/;
    const passTemplateMedium = /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/; 
    const passTemplateLow =  /^(?=.*[a-z])(?=.{6,})/; 

    useEffect(()=>{
        handleVerifyEmail();
        handleBar();
        handleConfirmPass();

    },[password, confirm, email]);

    const fetchData = async (data) => {
        const response = await fetch("http://localhost:3333/reg", {
            method: "POST",
            mode: "cors",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        return response.json();
    }

    const handleSubmit = async (username, password, email, confirm) => {
        let data = {
            username: username,
            password: password,
            email: email
        }
        if(password === confirm){
            let response = await fetchData(data);
            if( response === true){
                localStorage.setItem('user', username);
                localStorage.setItem('permissions', "admin")
                history.push("/main");
            }else{
                setInvalid("Email/username already used!");
            }
        }
    }

    function handleBar(){
        if(password.match(passTemplateHard)) {
            setStr("strong");
        }
        else if (password.match(passTemplateMedium)){
            setStr("medium");
        }
        else if (password.match(passTemplateLow)){
            setStr("low");
        }
        else {
            setStr("none");
        };
    }

    function handleConfirmPass(){
        if(password=== "" && confirm === "") setMatchlabel(null)
        else if(password===confirm) setMatchlabel(true);
        else setMatchlabel(false);
    }

    function handleVerifyEmail(){
        let condition = email.match(emailTemplate);
        if(email === "") setCommunicate("");
        else if(condition) setCommunicate("Email is correct!");
        else setCommunicate("Invalid email!");
    }

    return(
        <div id="loginContainer">
            <div className="loginRegisterForm">
                <h1>Sign up</h1>
                <div id="loginForm" 
                    autoComplete="off"
                    onSubmit={e=>e.preventDefault()}>
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
                    htmlFor="progressBar" 
                    className="progressLabel">Password strength: <mark className={passStr}>{passStr}</mark></label>
                    <div className="progressBar">
                        <div className={`colorBar${passStr === "low" || passStr === "medium"  || passStr === "strong"  ? "B" : ""}`}></div>
                        <div className={`colorBar${passStr === "medium" || passStr === "strong" ? "B" : ""}`}></div>
                        <div className={`colorBar${passStr === "strong" ? "B" : ""}`}></div>
                    </div>
                    <input 
                    type="password" 
                    id="confirmPass" 
                    className="inputForm" 
                    placeholder="confirm password" 
                    value={confirm} 
                    onChange={e => setConfirm(e.currentTarget.value)}></input>
                    <label 
                    htmlFor="confirmPass" 
                    className="warningLabel">{matchLabel===null ? "" : matchLabel === false ? "Passwords don't match" : "Passwords match"}</label>
                    <input 
                    type="email" 
                    id="mailField" 
                    className="inputForm" 
                    placeholder="email" 
                    autoComplete="off" 
                    value={email} 
                    onChange={e => setEmail(e.currentTarget.value)}></input>
                    <label 
                    htmlFor="mailField" 
                    className="warningLabel">{communicate}</label>
                    <button 
                    className="button"
                    onClick={()=>handleSubmit(username, password, email, confirm)}
                    >Submit</button>
                </div>
                <p>{userInvalid}</p>
            </div>
        </div>
    );
}

export default RegisterForm;