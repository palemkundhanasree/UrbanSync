import React from 'react';

const StatusUpdater = ({ currentStatus, onUpdate }) => {
    return (
        <select
            value="label"
            onChange={(e) => {
                if (e.target.value !== "label") onUpdate(e.target.value);
            }}
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
            <option value="In Progress">In Progress {currentStatus === "In Progress" ? "✓" : ""}</option>
            <option value="Resolved">Resolved {currentStatus === "Resolved" ? "✓" : ""}</option>
        </select>
    );
};

export default StatusUpdater;