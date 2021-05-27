import axios from "axios";
import React,{useState} from "react";
import "./../App.css";

const Dashboard = ()=>{
    document.querySelector(".dashnew").style.display="block";
    document.querySelector(".logreg").style.display = "none";
    return (<>
        <div className="dashboard">
            <p>Dashboard</p>
            <button className = "reglog_button sections" >Get All Articles</button>
        </div>
    </>)
}

export default Dashboard