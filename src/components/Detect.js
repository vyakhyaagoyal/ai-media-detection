import axios from 'axios';
import React from 'react';

const host = "http://localhost:5000";

export default function Detect({ uploadedUrl }) {
    React.useEffect(() => {
        if (!uploadedUrl) return;

        axios.post(`${host}/detect`, { url: uploadedUrl })
            .then(res => {
                console.log(res.data);
            })
            .catch(err => console.error(err));
    }, [uploadedUrl]);

    return (
        <div>
            <h2>Detection Results</h2>
        </div>
    );
}
