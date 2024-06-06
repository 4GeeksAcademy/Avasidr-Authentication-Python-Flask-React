import React, { useEffect, useState, useContext } from 'react'
import { Context } from "../store/appContext";
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const { store, actions } = useContext(Context);
    const navigate = useNavigate()

    const emailChange = e => {
        setEmail(e.target.value)
        console.log(e.target.value)
    }
    const passwordChange = e => {
        setPassword(e.target.value)
        console.log(e.target.value)
    }
    const submitLogin = async e => {
        e.preventDefault()
        await actions.login(email, password)
        await navigate("/private")
    }


    return (
        <div class="login-box">
            <h2>Login</h2>
            <form onSubmit={submitLogin}>
                <div class="user-box">
                    <input
                        type="email"
                        placeholder='Email'
                        className="form-control"
                        id="email"
                        value={email}
                        onChange={emailChange}
                    />
                </div>
                <div class="user-box">
                    <input
                        type="password"
                        placeholder='Password'
                        className="form-control"
                        id="inputPassword"
                        value={password}
                        onChange={passwordChange}
                    />
                </div>
                <div className='d-flex justify-content-center'>
                    <button type="submit" className="btn btn-primary">Login</button>
                </div>
            </form>
        </div>
    )
}

export default Login
