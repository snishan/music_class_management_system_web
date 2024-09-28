import React, { useState } from "react";
import './login.css'
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { urls } from "../../API/urls";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Logo from "../../assests/icons/music-icon-2.svg";


const LogingPage = () => {
    let navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [passwort, setPasswort] = useState('');

    const handleUsername = (value) => {
        setUsername(value)
    }

    const handlePassword = (value) => {
        setPasswort(value)
    }

    const handleSubmit = () => {
        navigate("/portal/dashboard");
        axios.post(urls.logIn,
            {
                "username": username,
                "password": passwort
            }
        )
            .then(function (response) {
                if (response.status === 200) {
                    navigate("/portal/dashboard");
                }

            })
            .catch(function (error) {
                toast.error('Invalid Username or Password')
            })
    }
    return (
        <div className="demo-container">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 col-12 mx-auto">
                        <div className="text-center pb-5 mt-5"> <img className="logo" src={Logo} /></div>
                        <div className="p-5 bg-white rounded shadow-lg">
                            <h2 className="mb-2 text-center">Sign In</h2>
                            <p className="text-center lead">Sign In to Music Class Management System</p>
                            <label className="font-500">Username</label>
                            <input onChange={(e) => handleUsername(e.target.value)} name="" className="form-control form-control-lg mb-3" type="email" />
                            <label className="font-500">Password</label>
                            <input onChange={(e) => handlePassword(e.target.value)} name="" className="form-control form-control-lg" type="password" />
                            <button onClick={() => handleSubmit()} className="btn btn-success btn-lg w-100 shadow-lg m-0  mt-5">SIGN IN</button>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LogingPage;