import React, { useEffect, useState, useContext } from 'react'
import { Context } from "../store/appContext";
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const { store, actions } = useContext(Context);
    const navigate = useNavigate()

    const emailChange = e => {
        setEmail(e.target.value)
    }
    const passwordChange = e => {
        setPassword(e.target.value)
    }
    const submitSignup = async e => {
        e.preventDefault()
        await actions.signup(email, password)
        await navigate("/login")
    }


    return (
        <div class="login-box">
            <h2>Signup</h2>
            <form onSubmit={submitSignup}>
                <div class="user-box">
                    <label for="email" className="col-sm-2 col-form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        value={email}
                        onChange={emailChange}
                    />
                </div>
                <div class="user-box">
                    <label for="inputPassword" className="col-sm-2 col-form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="inputPassword"
                        value={password}
                        onChange={passwordChange}
                    />
                </div>
                <div className='d-flex justify-content-center'>
                    <button type="submit" className="btn btn-primary">Signup</button>
                </div>
            </form>
        </div>
    )
}

export default Signup
