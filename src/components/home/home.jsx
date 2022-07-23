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
            window.location.pathname = "/";
            console.log(result);
        });
    }

    return (
        <div className={styles.home}>
                {weather?
                <div className={styles.weather}>
                    <h3>{weather.name}</h3>
                    <h1>{Math.round(weather.main.temp,1)}&#176;C</h1>
                    <p>({weather.weather[0].description.charAt(0).toUpperCase()+weather.weather[0].description.slice(1)})</p>
                    <div className={styles.subWeather}>
                        <div className={styles.holder}>
                            <img src="/humidity.png"/>
                            <p>{weather.main.humidity}%</p>
                        </div>
                        <div className={styles.holder}>
                            <img src="/cold.png"/>
                            <p>{Math.round(weather.main.temp_min*10)/10}&#176;C</p>
                        </div>
                        <div className={styles.holder}>
                            <img src="/hot.png"/>
                            <p>{Math.round(weather.main.temp_max*10)/10}&#176;C</p>
                        </div>  
                    </div>
                    <div className={styles.subWeather1}> 
                        <div className={styles.holder}>
                            <img src="/wind.png"/>
                            <p>{weather.wind.speed}</p>
                        </div> 
                        <div className={styles.holder}>
                            <img src="/barometer.png"/>
                            <p>{weather.main.pressure} pa</p>
                        </div>
                        <div className={styles.holder}>
                            <img src="/compass.png"/>
                            <p>{weather.wind.deg}&#176;</p>
                        </div>
                    </div>
                </div>
                    :null}
            <div className={styles.list}>
                <div className={styles.buttons}>
                    <input type="text" onChange={handleChange} placeholder="Enter City"/>
                    <button onClick={handleSearch}>
                     <img src="/search.png" alt="Search Button"/>
                    </button>
                    {props.user || localStorage.getItem("a")?<button onClick={handleAdd}><img src="/plus.png" alt="Add Current City"/></button>:null}
                </div>
                
                {props.user || localStorage.getItem("a")?<UserData setCurrentCity={setCurrentCity}/>:null}
            </div>
        </div>
    );
}

export default Home;