// import React, { useState, useRef } from 'react'
// import axios from 'axios';
// import Toast from './Toast';

// const UploadMedia = () => {
//     const host = "http://localhost:5000";
//     const [file, setFile] = useState(null);
//     const [loading, setLoading] = useState(false);
//     const [result, setResult] = useState(null); //final detection result
//     const [showToast, setShowToast] = useState("");
//     const [hovered,setHovered]=useState(false);
//     const fileInputRef = useRef(null);

//     const handleUpload = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         setResult(null);

//         if (!file) {
//             setShowToast("Please select a file to upload");
//             setTimeout(() => setShowToast(""), 3000);

//             setLoading(false);
//             return;
//         }

//         try {
//             const formData = new FormData();
//             formData.append('media', file);

//             const uploadRes = await axios.post(`${host}/api/uploads/upload`, formData,
//                 { headers: { "Content-Type": "multipart/form-data" } });

//             const uploadedURL = uploadRes.data.url;
//             console.log("successful! cloudinary url:", uploadedURL, "data:", uploadRes.data);
//             setResult(uploadRes.data);

//             const detectRes = await axios.post(`${host}/api/detect`, { filePath: uploadedURL });

//             console.log("Detection result:", detectRes.data);
//             setResult(detectRes.data);

//             setFile(null);
//             if (fileInputRef.current) fileInputRef.current.value = ""; // Clear input
//         }
//         catch (error) {
//             console.error("error", error);
//         }
//         finally {
//             setLoading(false);
//             setFile(null); // Clear state
//             if (fileInputRef.current) fileInputRef.current.value = ""; // Clear input
//         }
//     }

//     return (
//         <div className='h-screen'>
//             <h1 className='text-8xl mt-28 text-center'
//                 style={{
//                     fontFamily: '"Patua One", "serif"',
//                     fontWeight: 300,
//                     fontStyle: "normal",
//                     fontSize: "6rem",
//                     color: "lightgray"
//                 }}
//             >Upload & Detect your <span className='block text-7xl'>Media here</span></h1>
//             <form onSubmit={handleUpload} className='m-5 p-2'>
//                 {/* <input type='file' accept='image/*,video/*' ref={fileInputRef} onChange={(e) => {
//                     setFile(e.target.files[0]);
//                 }} /> */}
//                 <label className="cursor-pointer px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 
//                   text-white font-semibold rounded-2xl shadow-lg hover:scale-105 transition items-center justify-center">
//                     Choose File
//                     <input type="file" hidden onChange={(e) => {
//                         setFile(e.target.files[0]);
//                     }} />
//                 </label>

//                 {/* selected file */}
//                 <div className='flex flex-col text-center m-2'>
//                     {file && (
//                         <p className='text-white'>Selected file: {file.name}</p>
//                     )}
//                 </div>

//                 {/* Upload and detect button */}
//                 <div className='text-center m-5'>
//                 <button className='bg-neutral-800 text-white p-3 rounded-xl hover:scale-105 transition' type='submit'>Upload & Detect</button>
//                 </div>
//             </form>

//             <div className='mt-5'>
//                 {loading && (
//                     <p>Detecting... please wait for results</p>
//                 )}
//             </div>

//             {/* for result */}
//             {!loading && result && (
//                 <div className='text-white'>
//                     <h1>Detection Result:</h1>
//                     <p><strong>Real Confidence:</strong> {result.real_confidence}%</p>
//                     <p><strong>Fake Confidence:</strong> {result.fake_confidence}%</p>
//                     <p><strong>Message:</strong> {result.message}</p>

//                     {/* <div>
//                         <h1 className='mt-8'>Image preview:</h1>
//                         <img src={result.file} alt="Uploaded media preview" style={{ height: '400px', width: 'auto', marginTop: '10px' }}></img>
//                     </div> */}
//                 </div>
//             )}

//             {showToast && <Toast message={showToast} onClose={() => setShowToast("")} warning={"Alert!"} type="warning" />}
//         </div>
//     )
// }


// export default UploadMedia

import React, { useState, useRef } from "react";
import axios from "axios";
import Toast from "./Toast";
import { motion } from "framer-motion";

const UploadMedia = () => {
    const host = "http://localhost:5000";
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [showToast, setShowToast] = useState("");
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
            formData.append("media", file);

            const uploadRes = await axios.post(`${host}/api/uploads/upload`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            const uploadedURL = uploadRes.data.url;
            const detectRes = await axios.post(`${host}/api/detect`, { filePath: uploadedURL });

            setResult(detectRes.data);
            setFile(null);
            if (fileInputRef.current) fileInputRef.current.value = "";
        } catch (error) {
            console.error("error", error);
        } finally {
            setLoading(false);
            setFile(null);
            if (fileInputRef.current) fileInputRef.current.value = "";
        }
    };

    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-start text-white overflow-y-auto">
            {/* Header */}
            <motion.h1
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="text-7xl font-extrabold mt-24 text-center text-white"
                style={{
                    fontFamily: '"Patua One", "serif"',
                    fontWeight: 300,
                    fontStyle: "normal",
                    color: "lightgray"
                }}
            >
                Upload & Detect your Media here
            </motion.h1>

            {/* Upload Section */}
            <motion.form
                onSubmit={handleUpload}
                className="mt-12 h-[30vh] w-[90%] md:w-[50%] bg-white/10 backdrop-blur-lg rounded-3xl p-4 shadow-2xl border border-white/20 flex flex-col items-center justify-center"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                {/* Dropzone */}
                <label
                    className="w-full border-2 border-dashed border-purple-400 rounded-2xl p-10 cursor-pointer flex flex-col items-center justify-center hover:border-pink-400"
                >
                    <span className="text-lg text-gray-300 group-hover:text-white">
                        {file ? "Selected: " + file.name : "Click to Choose File"}
                    </span>
                    <input
                        type="file"
                        hidden
                        ref={fileInputRef}
                        accept="image/*,video/*"
                        onChange={(e) => setFile(e.target.files[0])}
                    />
                </label>

                {/* Upload Button */}
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    disabled={loading}
                    className="mt-4 px-8 py-3 bg-gradient-to-r from-purple-700 to-pink-600 rounded-full shadow-lg font-semibold text-white transition"
                >
                    {loading ? "Detecting..." : "Upload & Detect"}
                </motion.button>
            </motion.form>

            {/* Results */}
            {!loading && result && (
                <motion.div
                    className="mt-4 w-[90%] md:w-[50%] bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-2xl font-bold mb-4">Detection Result</h2>

                    {/* Confidence Bars */}
                    <div className="mb-4">
                        <p className="mb-1">Real Confidence</p>
                        <div className="w-full h-3 border border-white rounded-full overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${result.real_confidence}%` }}
                            transition={{ duration: 1 }}
                            className="h-3 bg-green-500 rounded-full"
                        />
                        </div>
                        <span className="text-sm text-gray-300">{result.real_confidence}%</span>
                    </div>

                    <div className="mb-4">
                        <p className="mb-1">Fake Confidence</p>
                        <div className="w-full h-3 border border-white rounded-full overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${result.fake_confidence}%` }}
                            transition={{ duration: 1 }}
                            className="h-3 bg-red-500 rounded-full"
                        />
                        </div>
                        <span className="text-sm text-gray-300">{result.fake_confidence}%</span>
                    </div>

                    <p className="mt-4 text-lg font-medium">{result.message}</p>
                </motion.div>
            )}

            {/* Toast */}
            {showToast && (
                <Toast
                    message={showToast}
                    onClose={() => setShowToast("")}
                    warning={"Alert!"}
                    type="warning"
                />
            )}
        </div>
    );
};

export default UploadMedia;

