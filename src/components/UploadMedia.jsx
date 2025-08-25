import React, { useState, useRef } from 'react'
import axios from 'axios';

const UploadMedia = () => {
    const host = "http://localhost:5000";
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null); //final detection result
    const fileInputRef = useRef(null);

    const handleUpload = async (e) => {
        e.preventDefault();
        setLoading(true);
        setResult(null);

        if (!file) {
            alert("Please select a file to upload");
            setLoading(false);
            return;
        }

        try {
            const formData = new FormData();
            formData.append('media', file);

            const uploadRes = await axios.post(`${host}/api/uploads/upload`, formData,
                { headers: { "Content-Type": "multipart/form-data" } });

            const uploadedURL = uploadRes.data.url;
            console.log("successful! cloudinary url:", uploadedURL, "data:", uploadRes.data);
            setResult(uploadRes.data);

            const detectRes = await axios.post(`${host}/api/detect`, { filePath: uploadedURL });

            console.log("Detection result:", detectRes.data);
            setResult(detectRes.data);

            setFile(null);
            if (fileInputRef.current) fileInputRef.current.value = ""; // Clear input
        }
        catch (error) {
            console.error("error", error);
        }
        finally {
            setLoading(false);
            setFile(null); // Clear state
            if (fileInputRef.current) fileInputRef.current.value = ""; // Clear input
        }
    }

    return (
        <div className='h-screen'>
            <form onSubmit={handleUpload}>
                <input type='file' accept='image/*,video/*' ref={fileInputRef} onChange={(e) => {
                    setFile(e.target.files[0]);
                }} />
                <button className='bg-neutral-800 text-white p-2 rounded-md' type='submit'>Upload & Detect</button>
            </form>

            {loading && (
                <p>Detecting.... please wait for results</p>
            )}

            {/* for result */}
            {!loading && result && (
                <div>
                    <h1>Detection Result:</h1>
                    <p><strong>Real Confidence:</strong> {result.real_confidence}%</p>
                    <p><strong>Fake Confidence:</strong> {result.fake_confidence}%</p>
                    <p><strong>Message:</strong> {result.message}</p>

                    <div>
                        <h1 className='mt-8'>Image preview:</h1>
                        <img src={result.file} alt="Uploaded media preview" style={{height:'400px',width:'auto', marginTop:'10px'}}></img>
                    </div>
                </div>
            )}

        </div>
    )
}


export default UploadMedia
