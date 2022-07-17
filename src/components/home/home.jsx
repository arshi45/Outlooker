import React from "react";
import { useState } from "react";
import styles from "./home.module.css";
import UserData from "../userData/userData";
import { useEffect } from "react";

const Home = (props) => {

    const [currentCity,setCurrentCity] = useState("London");
    const link = "http://localhost:3001/"+currentCity;
    const [weather,setWeather] = useState(false);
    const [search,setSearch] = useState("");

    useEffect(() => {
        fetch(link)
        .then((result)=>{
            return result.json();
        }).then((data) => {
            setWeather(data);
        });    
    },[link]);

    const handleChange = (e) => {
        setSearch(e.target.value);
    }

    const handleSearch = () => {
        setCurrentCity(search);
    }

    const handleAdd = () => {
        var doc = {
            city:currentCity
        }
        fetch("http://localhost:3001/add",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(doc)
        }).then((result) => {
            console.log(result);
        });
    }

    return (
        <div className={styles.home}>
            {weather?<p>{weather.name}</p>:null}
            <div className={styles.list}>
                {props.user?<UserData setCurrentCity={setCurrentCity}/>:null}
                <input type="text" onChange={handleChange}/>
                <button onClick={handleSearch}>Search</button>
                {props.user?<button onClick={handleAdd}>Add City</button>:null}
            </div>
        </div>
    )
}

export default Home;