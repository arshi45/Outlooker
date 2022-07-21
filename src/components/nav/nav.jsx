import React from "react";
import styles from "./nav.module.css";
import SignUp from "../signup/signup";


const Nav = (props) => {

    const logout = (e) =>{
        fetch("http://localhost:3001/signout")
        .then((result) => {
            return result.json();
        })
        .then((data) => {
            if(data.result === true){
                localStorage.clear();
                window.location.pathname = "/";
            }
        });
    }

    return (
        <div className={styles.nav}>
            <h1>Outlooker</h1>
            {window.localStorage.getItem("a") ?<button onClick={logout} className={styles.toggle}>Log Out</button>:<SignUp setUser={props.setUser} className={styles.toggle}/>}
        </div>
    );
}

export default Nav;