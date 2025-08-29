import React, { useState, useRef } from 'react'
import axios from 'axios';
import Toast from './Toast';

const UploadMedia = () => {
    const host = "http://localhost:5000";
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null); //final detection result
    const [showToast, setShowToast] = useState("");
    const [hovered,setHovered]=useState(false);
    const fileInputRef = useRef(null);

    const handleUpload = async (e) => {
        e.preventDefault();
        setLoading(true);
        setResult(null);

        if (!file) {
            setShowToast("Please select a file to upload");
            setTimeout(() => setShowToast(""), 3000);

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
            <h1 className='text-8xl mt-28 text-center'
                style={{
                    fontFamily: '"Patua One", "serif"',
                    fontWeight: 300,
                    fontStyle: "normal",
                    fontSize: "6rem",
                    color: "lightgray"
                }}
            >Upload & Detect your <span className='block text-7xl'>Media here</span></h1>
            <form onSubmit={handleUpload} className='m-5 p-2'>
                {/* <input type='file' accept='image/*,video/*' ref={fileInputRef} onChange={(e) => {
                    setFile(e.target.files[0]);
                }} /> */}
                <label className="cursor-pointer px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 
                  text-white font-semibold rounded-2xl shadow-lg hover:scale-105 transition text-center">
                    Choose File
                    <input type="file" hidden onChange={(e) => {
                        setFile(e.target.files[0]);
                    }} />
                </label>

                {/* selected file */}
                <div className='flex flex-col text-center m-2'>
                    {file && (
                        <p className='text-white'>Selected file: {file.name}</p>
                    )}
                </div>

                {/* Upload and detect button */}
                <div className='text-center m-5'>
                <button className='bg-neutral-800 text-white p-2 rounded-md' type='submit'>Upload & Detect</button>
                </div>
            </form>

            <div className='mt-5'>
                {loading && (
                    <p>Detecting... please wait for results</p>
                )}
            </div>

            {/* for result */}
            {!loading && result && (
                <div>
                    <h1>Detection Result:</h1>
                    <p><strong>Real Confidence:</strong> {result.real_confidence}%</p>
                    <p><strong>Fake Confidence:</strong> {result.fake_confidence}%</p>
                    <p><strong>Message:</strong> {result.message}</p>

                    <div>
                        <h1 className='mt-8'>Image preview:</h1>
                        <img src={result.file} alt="Uploaded media preview" style={{ height: '400px', width: 'auto', marginTop: '10px' }}></img>
                    </div>
                </div>
            )}

            {showToast && <Toast message={showToast} onClose={() => setShowToast("")} warning={"Alert!"} type="warning" />}
        </div>
    )
}


export default UploadMedia
