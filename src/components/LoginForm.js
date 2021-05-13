import React, { useRef, useState, useEffect} from 'react';
import '../styles/css/Default.css';
import '../styles/css/Login.css';

const LoginForm = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [communicate, setCommunicate] = useState('');
    const labelRef = useRef();
    const [labelClass, setLabelClass] = useState('');
    const [toggle, setToggle] = useState(false);
    const url = 'http://localhost:3333/log';
    const [user, setUser] = useState(null);

    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
        console.log(loggedInUser);
        props.login(loggedInUser);
    }

    async function postData(username, password){
        const data = {username: username, password: password, id: 1}
        const response = await fetch(url, {
            method: "POST",
            mode: "cors",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        return response.json();      
    }

    const handleSubmit = async e => {
        e.preventDefault();

        let validationToken = await postData(username, password);
        let userId = 0;
        
        if(!validationToken && communicate === ''){
            setCommunicate("Invaild password or/and username");
            setToggle(!toggle);
        }
        else if(!validationToken) {
            setToggle(!toggle);
            setCommunicate("Invaild password or/and username");
        }
        else {
            localStorage.setItem('user', username);
            localStorage.setItem('permissions', "admin")
            props.login(userId);
        }
        
    }

    useEffect(()=>{
        communicate === '' ? setLabelClass("label-noanim") : setLabelClass("label-anim");
        setTimeout(()=>{setLabelClass("label-noanim")},300);
    }, [toggle]);


    return(
        <>
        <h1>Sign in</h1>
        <form 
        id="loginForm" 
        autoComplete="off"
        onSubmit={handleSubmit}>
            <input 
            type="text" 
            className="inputForm" 
            required 
            placeholder="username" 
            name="username" value={username} 
            onChange={e => setUsername(e.currentTarget.value)}/>
            <input 
            type="password" 
            className="inputForm" 
            required 
            placeholder="password" 
            name="password" value={password} 
            onChange={e => setPassword(e.currentTarget.value)}/>
            <label ref={labelRef} className={labelClass} htmlFor="loginForm">{communicate}</label>
            <button 
            className="button" 
            type="submit">Submit</button>
        </form>
        <p onClick={()=>props.handleRegister(username, password)}>Sign up</p>
    </>
    );
}

export default LoginForm;