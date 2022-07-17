import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import styles from "./userData.module.css";

const UserData = (props) => {
     
    const [userData,setUserData] = useState([]);

    useEffect(() => {
        fetch("http://locahost:3001/getUserData").then((result) => {
            return result.json();
        }).then((data)=>{
            setUserData(data.cities);
        });
    },[]);

    const handleClick = (e) => {
        props.setCurrentCity(e.target.value);
    }

    return (
        <div className={styles.userData}>
            {userData.map((city) => {
                return <button value={city} onClick={handleClick}>{city}</button>
            })}
        </div>
    );
}

export default UserData;
