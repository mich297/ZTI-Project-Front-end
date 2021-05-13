import React, { useState, useEffect } from 'react';
import '../../styles/css/Default.css';
import '../../styles/css/Profile.css';



const Profile = (props) => {
    const [changed, setChanged] = useState();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [email, setEmail] = useState("");

    const setParameters = (content, changed) => {
        setContent(content);
        setChanged(changed);
    }


    let form = () => (
        <div className="profileContainer">
            <div>
                <input type="text" className="inputForm" placeholder="New username" value={username} onChange={e => setUsername(e.currentTarget.value)}></input>
                <button className="button" onClick={()=> setParameters("confirm", username)}>Change</button>
            </div>
            <div>
                <input type="password" className="inputForm" placeholder="New password" value={password} onChange={e => setPassword(e.currentTarget.value)}></input>
                <button className="button" onClick={()=> setParameters("confirm", password)}>Change</button>
            </div>
            <div>
                <input type="text" className="inputForm" placeholder="New email" value={email} onChange={e => setEmail(e.currentTarget.value)}></input>
                <button className="button" onClick={()=> setParameters("confirm", email)}>Change</button>
            </div>
        </div>
    );

    let confirm = () => (
        <div className="profileContainer">
            <h1>Confirm Password</h1>
            <div>
                <input type="password" className="inputForm" placeholder="confirm" value={oldPassword} onChange={e => setOldPassword(e.currentTarget.value)}></input>
                <button className="button" onClick={()=> sendSettings(changed, oldPassword)}>Confirm</button>
            </div>
        </div>
    );


    const sendSettings = async (changed, oldPassword) => {
        fetch("http://localhost:3333/checkPass", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(oldPassword)
        }).then(response=> {
            if(response === true){
                return fetch("http://localhost:3333/change", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(changed)
            }).then(response => {
                if(response === true){
                    setContent("confirm")
                }
            })
            }
        })
    }

    const [content, setContent] = useState("form");

    return (
        content === "form" ? form() : confirm()
    );
}

export default Profile;