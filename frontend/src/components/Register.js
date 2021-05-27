import axios from "axios";
import React,{useState} from "react";
import "./../App.css";


const Register = ()=>{
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [country, setCountry] = useState();
    const [age, setAge] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [regResponse, setRegResponse] = useState(``)
    document.querySelector(".dashnew").style.display="none";
    document.querySelector(".logreg").style.display = "block";

    return(<>
        <div className="register">
            <p>Register:</p>
            <input className="sections" type="text" placeholder={`firstName here`} onChange={(e)=>{
                setFirstName(e.target.value)
            }} />
            <input className="sections" type="text" placeholder={`lastName here`} onChange={(e)=>{
                setLastName(e.target.value)
            }} />
            <input className="sections" type="number" placeholder={`age here`} onChange={(e)=>{
                setAge(e.target.value)
            }} />
            <input className="sections" type="text" placeholder={`country here`} onChange={(e)=>{
                setCountry(e.target.value)
            }} />
            <input className="sections" type="text" placeholder={`email here`} onChange={(e)=>{
                setEmail(e.target.value)
            }} />
            <input className="sections" type="password" placeholder={`password here`} onChange={(e)=>{
                setPassword(e.target.value)
            }} />
            <button className="reglog_button sections" onClick={()=>{
                axios.post("http://localhost:5000/users",{
                    firstName,
                    lastName,
                    age,
                    country,
                    email,
                    password
                }).then((respons)=>{
                    setRegResponse(`The user has been created successfully`)
                    document.querySelector(".regResponse").style.display = "flex";
                }).catch((err)=>{
                    setRegResponse(`Error happened while register, please try again`);
                    document.querySelector(".regResponse").style.display = "flex";
                }) 
            }}>
                Register
            </button>
            <div className="regResponse sections">
                {regResponse}
            </div>
        </div>
    </>)
}

export default Register