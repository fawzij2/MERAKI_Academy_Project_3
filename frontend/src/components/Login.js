import axios from "axios";
import React,{useState} from "react";
import "./../App.css";
import { useHistory } from "react-router-dom";

const Login = ()=>{
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [logResponse, setLogResponse] = useState(``);
    let history = useHistory();
    document.querySelector(".dashnew").style.display="none";
    document.querySelector(".logreg").style.display = "block";
    return(<>
        <div className="login">
            <p>Login:</p>
            <input className="sections" type="text" placeholder="email here" onChange={(e)=>{
                setEmail(e.target.value)
            }} />
            <input className="sections" type="password" placeholder="password here" onChange={(e)=>{
                setPassword(e.target.value)
            }} />
            <button className="sections reglog_button" onClick={()=>{
                axios.post("http://localhost:5000/login",{
                    email,
                    password
                }).then((response)=>{
                    history.push("/dashboard")
                }).catch((err)=>{
                    if(err.response.status === 404){
                        setLogResponse("The email doesn't exist");
                        document.querySelector(".logResponse").style.display = "flex";
                    }
                    if (err.response.status === 403){
                        setLogResponse("The password you've entered is incorrect");
                        document.querySelector(".logResponse").style.display = "flex";
                    }
                })
            }} >Login</button>
            <div className="logResponse sections">
                {logResponse}
            </div>
        </div>
    </>)
}

export default Login