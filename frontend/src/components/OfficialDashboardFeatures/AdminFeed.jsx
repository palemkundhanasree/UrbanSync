import React from 'react';
import StatusUpdater from './StatusUpdater';

const AdminFeed = ({ reports, onStatusChange }) => {
    return (
        <div style={{ backgroundColor: "#1c1c1c", borderRadius: "12px", border: "1px solid #333" }}>
            {reports.map((report) => (
                <div key={report.id} style={{
                    padding: "20px",
                    borderBottom: "1px solid #333",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                }}>
                    <div>
                        <h3 style={{ margin: 0, color: "#f3e8d3" }}>{report.type}</h3>
                        <p style={{ margin: "5px 0 0 0", opacity: 0.6, fontSize: "0.85rem" }}>{report.location}</p>
                    </div>
                    <StatusUpdater
                        currentStatus={report.status}
                        onUpdate={(newStatus) => onStatusChange(report.id, newStatus)}
                    />
                </div>
            ))}
            {reports.length === 0 && (
                <div style={{ padding: "40px", textAlign: "center", opacity: 0.5 }}>
                    No reported issues found.
                </div>
            )}
        </div>
    );
};

export default AdminFeed;