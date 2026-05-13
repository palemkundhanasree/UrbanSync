import React from 'react';

const StatusUpdater = ({ currentStatus, onUpdate }) => {
    return (
        <select
            value={currentStatus}
            onChange={(e) => onUpdate(e.target.value)}
            style={{
                backgroundColor: "#252525",
                color: "#baf087",
                padding: "8px 12px",
                borderRadius: "6px",
                border: "1px solid #444",
                fontWeight: "bold",
                cursor: "pointer"
            }}
        >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
            <option value="Escalated">Escalated</option>
        </select>
    );
};

export default StatusUpdater;