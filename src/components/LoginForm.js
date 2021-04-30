import React, { useRef, useState, useEffect} from 'react';
import '../styles/Default.css';
import '../styles/Login.css';



const LoginForm = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [communicate, setCommunicate] = useState('');
    const labelRef = useRef();
    const [labelClass, setLabelClass] = useState('');
    const [toggle, setToggle] = useState(false);
    const url = '';
    const [user, setUser] = useState(null);

    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
        console.log(loggedInUser);
        // setUser(foundUser);
        props.login(loggedInUser);
    }


    async function postData(){
        const data = {username, password}
        const response = await fetch(url, {
            method: "POST",
            headres: {
                'Content Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        return response.json();      
    }

    const handleSubmit = async e => {
        e.preventDefault();
        //TODO - Ask if login and password are correct, token temporarily always true and userId=0
        // postData().then(data => {
        //     console.log(data); 
        //     setUser(data);
        //     if(user !==null) localStorage.setItem('user', data);
        // });
        
        let validationToken = true;
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

    // useEffect(() => {
    //     const loggedInUser = localStorage.getItem("user");
    //     if (loggedInUser) {
    //         const foundUser = JSON.parse(loggedInUser);
    //         // setUser(foundUser);
    //         props.login(foundUser);
    //     }
    //     }, []);

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
            <label ref={labelRef} className={labelClass} for="loginForm">{communicate}</label>
            <button 
            className="button" 
            type="submit">Submit</button>
        </form>
    </>
    );
}

export default LoginForm;