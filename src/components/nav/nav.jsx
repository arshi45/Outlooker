import React from "react";
import styles from "./nav.module.css";
import SignUp from "../signup/signup";


const Nav = (props) => {

    const logout = (e) =>{
        e.preventDefault();
        fetch("http://localhost:3001/signout")
        .then((result) => {
            return result.json();
        })
        .then((data) => {
            if(data.result === "Bye")
            props.setUser(false);
        });
    }

    return (
        <div className={styles.nav}>
            <h1>Outlooker</h1>
            {props.user?<button onClick={logout} className={styles.toggle}>Log Out</button>:<SignUp setUser={props.setUser} className={styles.toggle}/>}
        </div>
    );
}

export default Nav;