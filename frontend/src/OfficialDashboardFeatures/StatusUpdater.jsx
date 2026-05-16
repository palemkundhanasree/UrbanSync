import React, { useState, useEffect } from 'react';
import LiveCamera from '../cdfeatures/LiveCamera';

const StatusUpdater = ({ currentStatus, onUpdate }) => {

    const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);
    const [isUploading, setIsUploading] = React.useState(false);
    const [showCamera, setShowCamera] = React.useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 600);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleUploadToCloudinary = async (imageData) => {
        setIsUploading(true);

        const formData = new FormData();
        formData.append('file', imageData);
        formData.append('upload_preset', 'urbansync_resolved_images');

        try{
            const res = await fetch("https://api.cloudinary.com/v1_1/dnt0shzg7/image/upload", {
                method: 'POST',
                body: formData
            }); 
            const data = await res.json();
            if(data.error){
                console.error('Cloudinary error:', data.error.message);
                alert("Image upload failed: " + data.error.message);
                return null;
            }
            return data.secure_url;
            } catch(error){
                console.error('Network error during upload:', error);
                return null;
            }
            finally{
                setIsUploading(false);
            }
        };

        const handleChange = async (e) => {
            const selectedStatus = e.target.value;
            if (selectedStatus === "label") return;

            if (selectedStatus === "Resolved") {
                setShowCamera(true);
            } else {
                onUpdate(selectedStatus);
            }
            e.target.value = "label";
        };

        const handleCapture = async (capturedData) => {
            setShowCamera(false);
            const imageUrl = await handleUploadToCloudinary(capturedData);
            if (imageUrl)
                onUpdate("Resolved", imageUrl);
            else                
                alert("Failed to upload resolved image. Please try again.");
        };
        if (currentStatus === "Resolved") {
            return null;
        }

        const styles = {
        wrapper: { 
            position: "relative", 
            display: "inline-block",
            width: isMobile ? "100%" : "auto" 
        },
        cameraOverlay: {
            position: 'fixed', 
            top: 0, 
            left: 0, 
            right: 0, 
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.95)', 
            zIndex: 1000, 
            display: 'flex',
            alignItems: 'center', 
            justifyContent: 'center',
            padding: isMobile ? "10px" : "20px",
            boxSizing: "border-box"
        },
        selectInput: {
            backgroundColor: "#baf087",
            color: "#133215",
            padding: isMobile ? "12px 20px" : "8px 16px",
            borderRadius: "8px",
            border: "none",
            fontWeight: "bold",
            cursor: "pointer",
            fontSize: isMobile ? "0.85rem" : "0.75rem",
            WebkitAppearance: "none",
            MozAppearance: "none",
            appearance: "none",
            textAlign: "center",
            width: isMobile ? "100%" : "150px",
            boxSizing: "border-box",
            boxShadow: "0 4px 12px rgba(0,0,0,0.2)"
        }
    };

    return (
        <div style={styles.wrapper}>
            {showCamera && (
                <div style={styles.cameraOverlay}>
                    <LiveCamera 
                        onCapture={handleCapture}
                        onCancel={() => setShowCamera(false)}
                    />
                </div>
            )}
            <select
                value="label"
                disabled={isUploading}
                onChange={handleChange}
                style={styles.selectInput}
            >
                <option value="label">{isUploading ? "UPLOADING..." : "UPDATE STATUS"}</option>
                <option value="Pending">Pending {currentStatus === "Pending" ? "✓" : ""}</option>
                <option value="In-Progress">In-Progress {currentStatus === "In-Progress" ? "✓" : ""}</option>
                <option value="Resolved">Resolved {currentStatus === "Resolved" ? "✓" : ""}</option>
            </select>
        </div>
    );
};

export default StatusUpdater;