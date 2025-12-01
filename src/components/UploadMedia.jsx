import React, { useState, useRef } from "react";
import axios from "axios";
import Toast from "./Toast";
import { motion } from "framer-motion";

const UploadMedia = () => {
    const host = "http://localhost:https://ai-media-detection.onrender.com";
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
            console.log("detection result:", detectRes.data);
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
                className="text-7xl mt-24 text-center text-white font-semibold"
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

