import React from 'react';
import LiveCamera from '../cdfeatures/LiveCamera';

const StatusUpdater = ({ currentStatus, onUpdate }) => {

    const [isUploading, setIsUploading] = React.useState(false);
    const [showCamera, setShowCamera] = React.useState(false);

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
        };

        const handleFileChange = async (e) => {
            const file = e.target.files[0];
            if (file) {
                const imageUrl = await handleUploadToCloudinary(file);
                if (imageUrl)
                    onUpdate("Resolved", imageUrl);
                else                
                    alert("Failed to upload resolved image. Please try again.");
            }
        };

        const handleCapture = async (capturedData) => {
            setShowCamera(false);
            const imageUrl = await handleUploadToCloudinary(capturedData);
            if (imageUrl)
                onUpdate("Resolved", imageUrl);
            else                
                alert("Failed to upload resolved image. Please try again.");
        };

    return (
        <div style={{ position: "relative", display: "inline-block" }}>
            {showCamera && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
                    backgroundColor: 'rgba(0,0,0,0.9)', zIndex: 1000, display: 'flex',
                    alignItems: 'center', justifyContent: 'center'
                }}>
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
                style={{
                    backgroundColor: "#baf087",
                    color: "#000",
                    padding: "8px 16px",
                    borderRadius: "8px",
                    border: "none",
                    fontWeight: "bold",
                    cursor: "pointer",
                    fontSize: "0.75rem",
                    appearance: "none",
                    textAlign: "center",
                    width: "140px"
                }}
            >
                <option value="label">UPDATE STATUS</option>
                <option value="Pending">Pending {currentStatus === "Pending" ? "✓" : ""}</option>
                <option value="In-Progress">In-Progress {currentStatus === "In-Progress" ? "✓" : ""}</option>
                <option value="Resolved">Resolved {currentStatus === "Resolved" ? "✓" : ""}</option>
            </select>
        </div>
    );
};

export default StatusUpdater;