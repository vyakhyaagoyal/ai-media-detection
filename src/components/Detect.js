import axios from 'axios';
import React from 'react';
const host = "http://localhost:5000";

axios.post(`${host}/api/analyze`,{url:uploadedUrl})
.then(res=>{
    console.log(res.data);
})
.catch(err=>console.error(err));

export default function Detect() {
    return (
        <div>
            <h2>Detection Results</h2>
        </div>
    );
}
