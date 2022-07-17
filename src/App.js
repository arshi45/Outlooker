import Nav from "./components/nav/nav";
import { useState } from "react";
import './app.css';
import Home from "./components/home/home";

function App() {

    const [user,setUser] = useState(false);
    return (
        <div>
            <Nav user={user} setUser={setUser} />
            <Home user={user}/>
        </div>   
    );
    }
    export default App;
    
