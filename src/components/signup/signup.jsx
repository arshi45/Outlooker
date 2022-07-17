import React from "react";
import styles from "./signup.module.css";
import { useState } from "react";

const SignUp = ({setUser}) => {
    const [info,setInfo] = useState(
        {
            email:"",
            pass:""
        }
    );

    const [form,setForm] = useState(false);
    const [signUp,setSign] = useState(true);


    const handleChange = (e) => {
        setInfo({
            ...info,
            [e.target.name]:e.target.value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        fetch("http://localhost:3001/signup",{
            method:"POST",
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(info)
        }).then((result) => {
            return result.json();
        }).then((data)=>{
            setUser(data);
        });
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        fetch("http://localhost:3001/login",{
            method:"POST",
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(info)
        }).then((result) => {
            return result.json();
        }).then((data)=>{
            setUser(data);
        });
    }

    const showForm = () =>{
        setForm(!form);
    }

    const handleForm = () => {
        setSign(!signUp);
    }

    return (
    <div className={styles.signup}>
        <button onClick={showForm}>Login/SignUp</button>
        {form?
        signUp?
        <div className={styles.form}>
            <h1>SignUp</h1>
            <button onClick={handleForm}>SignIn</button>
            <form onSubmit={handleSubmit}>
                <label>Email</label><br/>
                <input type="email" onChange={handleChange} name="email"/><br/>
                <label>Password</label><br/>
                <input type="password" onChange={handleChange} name="pass"/><br/>
                <button type="submit">Submit</button>
            </form>    
        </div>
        :
        <div className={styles.form}>
            <h1>Login</h1>
            <button onClick={handleForm}>SignUp</button>
            <form onSubmit={handleLogin}>
                <label>Email</label><br/>
                <input type="email" onChange={handleChange} name="email"/><br/>
                <label>Password</label><br/>
                <input type="password" onChange={handleChange} name="pass"/><br/>
                <button type="submit">Submit</button>
            </form>    
        </div>
        :null}
    </div>
    );
}

export default SignUp;