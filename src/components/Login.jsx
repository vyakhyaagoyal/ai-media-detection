import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const host = "http://localhost:5000";
  const [auth, setAuth] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const onChange = (e) => {
    setAuth({ ...auth, [e.target.id]: e.target.value });
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`${host}/api/auth/login`, auth)
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
          localStorage.setItem('username',userRes.data.name);
        })
        .catch(err => {
          console.error("Get user error:", err.response?.data || err.message);
        });

          setTimeout(() => {
            navigate("/home");
          }, 1000);
        }
        else {
          alert("Error:" + response.data.error);
          setTimeout(() => {
            setAuth({ email: "", password: "" });
          }, 1000);
        }
        
      })

      .catch(function (error) {
        console.log(error);
        alert("Unable to login. Please try again.");
      })
  }

  return (
    <div>
      <form className='m-3' onSubmit={handleSubmit}>
        <h1 className='text-4xl mb-4'>Login</h1>
        <div className="form-group mb-3">
          <label htmlFor="email">Email address</label>
          <input type="email" className="form-control" id="email" placeholder="Enter email" value={auth.email} onChange={onChange} />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="password">Password</label>
          <input type={showPassword ? "text" : "password"} className="form-control" id="password" placeholder="Password" value={auth.password} onChange={onChange} />
        </div>
        <div className="form-group form-check mb-3">
          <input type="checkbox" className="form-check-input" id="showPassword" checked={showPassword} onChange={() => setShowPassword(!showPassword)}/>
          <label className="form-check-label" htmlFor="showPassword">Show password</label>
        </div>
        <button type="submit" className="btn btn-dark">Login</button>
      </form>
    </div>
  )
}

export default Login
