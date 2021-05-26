import React from "react";
import "./../App.css";
import {Link} from "react-router-dom"

const Navigation = ()=>{
    return (
        <div style={{display:"flex", gap:"16px"}} className="navigation">
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
        </div>
    )
};

export default Navigation