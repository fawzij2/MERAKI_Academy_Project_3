import React from "react";
import "./../App.css";
import {Link} from "react-router-dom"

const Navigation = ()=>{
    return (
        <div style={{display:"flex", gap:"16px"}} className="navigation">
            <Link to="/login" className="logreg">Login</Link>
            <Link to="/register" className="logreg">Register</Link>
            <Link to="/dashboard" className="dashnew">Dashboard</Link>
            <Link to="/register" className="dashnew">New Article</Link>
        </div>
    )
};

export default Navigation