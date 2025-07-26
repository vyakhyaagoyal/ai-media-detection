import React, { useState } from 'react';


const Signup = () => {
    const host = "http:localhost:5000";
    const [auth, setAuth] = useState({ name: "", email: "", password: "" })
    const handleSubmit = (e) => {
        e.preventDefault();
    }

    const onChange=(e)=>{
        setAuth({...auth,[e.target.id]:e.target.value});
        // console.log(auth);
    }

    return (
        <>
            <h1 className='text-4xl m-3 mb-4'>Signup/Create a user</h1>
            <div className="m-3">

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="name" className="form-control" id="name" value={auth.name} onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="email" aria-describedby="emailHelp" value={auth.email} onChange={onChange} />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" value={auth.password} onChange={onChange} />
                    </div>
                    <div className="mb-3 form-check">
                        <input type="checkbox" className="form-check-input" id="checkbox" />
                        <label className="form-check-label" htmlFor="checkbox">Show password</label>
                    </div>
                    <button type="submit" className="btn btn-dark">Signup</button>
                </form>
            </div>
        </>
    )
}

export default Signup