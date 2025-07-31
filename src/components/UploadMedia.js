import React, { useState,useRef } from 'react'
import axios from 'axios';

const UploadMedia = () => {
    const host = "http://localhost:5000";
    const [file, setFile] = useState(null);
    // const [response,setResponse]=useState(null);
    const fileInputRef = useRef(null);

    const handleUpload = async (e) => {
        e.preventDefault();

        if (!file) {
            alert("Please select a file to upload");
            return;
        }

        const formData = new FormData();
        formData.append('media', file);

        try {
            const res = await axios.post(`${host}/api/uploads/upload`, formData);
            console.log("successful! cloudinary url:",res.data.url, "data:",res.data);
            
            // console.log("File uploaded successfully:", res.data);
            // setResponse();
            setFile(null);
            if (fileInputRef.current) fileInputRef.current.value = ""; // Clear input
        }
        catch (error) {
            console.error("error", error);
            setFile(null); // Clear state
            if (fileInputRef.current) fileInputRef.current.value = ""; // Clear input
        }
    }

    return (
        <div>
            <form onSubmit={handleUpload}>
                <input type='file' accept='image/*,video/*' ref={fileInputRef} onChange={(e) => {
                    setFile(e.target.files[0]);
                }} />
                <button className='bg-neutral-800 text-white p-2 rounded-md'  type='submit'>Upload</button>
            </form>
        </div>
    )
}

export default UploadMedia
