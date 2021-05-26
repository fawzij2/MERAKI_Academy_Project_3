import React from "react";
import "./../App.css";

const Register = (props)=>{
    return(<>
        <div className="register">
            <p>Register:</p>
            <input className="sections" type="text" placeholder={`firstName here`} />
            <input className="sections" type="text" placeholder={`lastName here`} />
            <input className="sections" type="number" placeholder={`age here`} />
            <input className="sections" type="text" placeholder={`country here`} />
            <input className="sections" type="text" placeholder={`email here`} />
            <input className="sections" type="password" placeholder={`password here`} />
            <button className="register_button sections">
                Register
            </button>
        </div>
    </>)
}

export default Register