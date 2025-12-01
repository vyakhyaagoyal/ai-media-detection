import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Signup = ({setisAuthenticated}) => {
    const host = "https://ai-media-detection.onrender.com";
    const [auth, setAuth] = useState({ name: "", email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`${host}/api/auth/createuser`, auth)
            .then(function (response) {
                console.log(response.data);
                if (response.data.success) {
                    localStorage.setItem('token', response.data.token);
                    // Fetch user details after login
                    axios.get(`${host}/api/auth/getuser`, {
                        headers: {
                            'auth-token': localStorage.getItem('token'),
                        }
                    })
                        .then(userRes => {
                            console.log("User data:", userRes.data);
                            localStorage.setItem('username', userRes.data.name);
                            setisAuthenticated(true);
                        })
                        .catch(err => {
                            console.error("Get user error:", err.response?.data || err.message);
                        });
                        alert("User created successfully!");
                    setTimeout(() => {
                        navigate("/login");
                    }, 1000);

                }
                else {
                    alert("Error: " + response.data.error[0].msg);
                    setTimeout(() => {
                        setAuth({ name: "", email: "", password: "" });
                    })
                }
            })
            .catch(function (error) {
                console.log(error);
                alert("Unable to create user. Please try again.")
            });
    }

    const onChange = (e) => {
        setAuth({ ...auth, [e.target.id]: e.target.value });
        // console.log(auth);
    }

    return (
        <div className='min-h-dvh overflow-hidden'>
            <h1 className='text-5xl m-3 mb-4'>Signup</h1>
            <div className="m-3">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="name" className="form-control" id="name" value={auth.name} onChange={onChange} placeholder='Enter name'/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="email" aria-describedby="emailHelp" value={auth.email} onChange={onChange} placeholder='Email'/>
                        <div id="emailHelp" className="form-text text-white">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type={showPassword ? "text" : "password"} className="form-control" id="password" value={auth.password} onChange={onChange} placeholder='Password'/>
                    </div>
                    <div className="mb-3 form-check">
                        <input type="checkbox" className="form-check-input" id="checkbox" checked={showPassword} onChange={() => setShowPassword(!showPassword)} />
                        <label className="form-check-label" htmlFor="checkbox">Show password</label>
                    </div>
                    <button type="submit" className="btn btn-dark">Signup</button>
                </form>
            </div>
        </div>
    )
}

export default Signup