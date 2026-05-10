import React, { useState, useRef } from 'react';
import "./LiveCamera.css";

const LiveCamera = ({ onCapture, onCancel }) => {
    const [isCameraOn, setIsCameraOn] = useState(false);
    const [previewImage, setPreviewImage] = useState(null);
    const [isConfirmed, setIsConfirmed] = useState(false);
    const videoRef = useRef(null);
    const canvasRef = useRef(null);

    const startCamera = async () => {
        setIsCameraOn(true);
        setPreviewImage(null);
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: 'environment' },
                audio: false 
            });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
        } catch (error) {
            console.error('Error trying to access camera:', error);
            alert('Unable to access camera. Please allow camera permissions and try again.');
            setIsCameraOn(false);
        }
    };

    const capturePhoto = () => {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        canvas.getContext('2d').drawImage(video, 0, 0);

        const imageDataUrl = canvas.toDataURL('image/jpeg');
        setPreviewImage(imageDataUrl); 
        stopCamera();
    };

    const stopCamera = () => {
        setIsCameraOn(false);
        if (videoRef.current && videoRef.current.srcObject) {
            const tracks = videoRef.current.srcObject.getTracks();
            tracks.forEach(track => track.stop());
        }
    }; 

    const handleConfirm = () => {
        onCapture(previewImage);
        setIsConfirmed(true);
    };

    const handleRetake = () => {
        setPreviewImage(null);
        setIsConfirmed(false);
        onCancel();
        startCamera();
    };

    return (
        <div className="live-camera">
            {!isCameraOn && !previewImage && (
                <button className="camera-btn" onClick={startCamera}>
                    Open Live Camera
                </button>
            )}

            {isCameraOn && !previewImage && (
                <div className="Live-camera">
                    <video ref={videoRef} autoPlay playsInline className="video-feed" />
                    <div className="camera-controls">
                        <button  className="capture-btn" onClick={capturePhoto}>
                            Capture
                        </button>
                        <button 
                            className="cancel-btn" onClick={() => { stopCamera(); onCancel(); }}>
                            Cancel
                        </button>
                    </div>
                </div>
            )}

            {previewImage && !isCameraOn && (
                <div className="photo-preview">
                    <img src={previewImage} alt="Preview" className={isConfirmed ? "confirmed-image" : "preview-image"}/>
                    {!isConfirmed && (
                        <button className="preview-controls" 
                        onClick={handleConfirm}>
                        Confirm
                    </button>
                    )}
                    
                    <button 
                        className="retake-btn" 
                        onClick={handleRetake}>
                        Retake
                    </button>
                </div>
            )}
            <canvas ref={canvasRef} style={{ display: 'none' }} />
        </div>
    );
};

export default LiveCamera;