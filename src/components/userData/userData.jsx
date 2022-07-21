import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import styles from "./userData.module.css";

const UserData = (props) => {
     
    const [userData,setUserData] = useState([]);

    useEffect(() => { 
        console.log("Running");
        fetch("http://localhost:3001/getUserData")
        .then((result) => {
            return result.json();
        }).then((data) => {
            setUserData(data.cities);
        });
    },[]);

    const handleClick = (e) => {
        props.setCurrentCity(e.target.value);
    }

    return (
        <div className={styles.userData}>
            {userData.map( (city) => {
                return <div><button value={city} onClick={handleClick}>{city}</button><br/></div>;
            })
            }
        </div>
    );
}

export default UserData;
