import React, { useState, useRef } from 'react'
import axios from 'axios';

const UploadMedia = () => {
    const host = "http://localhost:5000";
    const [file, setFile] = useState(null);
    const [result, setResult] = useState(null); //final detection result
    const fileInputRef = useRef(null);

    const handleUpload = async (e) => {
        e.preventDefault();

        if (!file) {
            alert("Please select a file to upload");
            return;
        }

        try {
            const formData = new FormData();
            formData.append('media', file);

            const uploadRes = await axios.post(`${host}/api/uploads/upload`, formData,
                { headers: { "Content-Type": "multipart/form-data" } });

            const uploadedURL = uploadRes.data.url;
            console.log("successful! cloudinary url:", uploadedURL, "data:", uploadRes.data);

            const detectRes = await axios.post(`${host}/api/detect`, { filePath: uploadedURL});

            console.log("Detection result:", detectRes.data);
            setResult(detectRes.data);

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
                <button className='bg-neutral-800 text-white p-2 rounded-md' type='submit'>Upload & Detect</button>
            </form>

            {/* for result */}
            {result && (
                <div>
                    <h2>Detection Result:</h2>
                    <p>Label: {result.label}</p>
                    <p>Confidence: {result.confidence}%</p>
                </div>
            )}

        </div>
    )
}

export default UploadMedia
