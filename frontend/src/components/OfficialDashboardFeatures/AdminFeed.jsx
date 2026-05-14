import React from 'react';
import StatusUpdater from './StatusUpdater';

const AdminFeed = ({ reports, onStatusChange }) => {
    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
            {reports.map((report) => (
                <div key={report.id} style={{
                    backgroundColor: "#1a2e1a",
                    border: "1px solid #baf08733",
                    borderRadius: "12px",
                    padding: "20px",
                    display: "flex",
                    alignItems: "center",
                    gap: "20px"
                }}>
                    <div style={{
                        width: "80px", height: "80px", backgroundColor: "#000",
                        borderRadius: "8px", flexShrink: 0, overflow: "hidden",
                        display: "flex", alignItems: "center", justifyContent: "center"
                    }}>
                        {report.proofImg ? (
                            <img src={report.proofImg} alt="Evidence" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        ) : (
                            <div style={{ color: "#fff", fontSize: "0.6rem", opacity: 0.4 }}>No Image</div>
                        )}
                    </div>

                    <div style={{ flex: 1 }}>
                        <h3 style={{ margin: "0 0 5px 0", color: "#baf087", fontSize: "1.1rem" }}>{report.type}</h3>
                        <p style={{ margin: "0 0 5px 0", color: "#f3e8d3", fontSize: "0.9rem" }}>{report.description || report.type.toLowerCase()}</p>
                        <p style={{ margin: 0, color: "#f3e8d3", fontSize: "0.75rem", opacity: 0.7 }}>
                            {report.location}, Tirupati (Urban), Tirupati, Andhra Pradesh, 517503, India
                        </p>
                    </div>

                    <div style={{ textAlign: "right", minWidth: "160px", display: "flex", flexDirection: "column", gap: "12px" }}>
                        <div>
                            <StatusUpdater
                                currentStatus={report.status}
                                onUpdate={(newStatus) => onStatusChange(report.id, newStatus)}
                            />
                        </div>

                        <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "12px" }}>
                            <div style={{
                                backgroundColor: report.status === 'Resolved' ? "#baf087" :
                                    report.status === 'Pending' ? "#D8A200" : "#1072E1",
                                color: "#000", padding: "4px 12px", borderRadius: "15px",
                                fontSize: "0.7rem", fontWeight: "bold", textTransform: "uppercase"
                            }}>
                                {report.status}
                            </div>
                            <p style={{ margin: 0, color: "#f3e8d3", fontSize: "0.7rem", opacity: 0.5 }}>
                                {report.date || "5/14/2026"}
                            </p>
                        </div>
                    </div>
                </div>
            ))}
            {reports.length === 0 && (
                <div style={{ padding: "40px", textAlign: "center", backgroundColor: "#1a2e1a", borderRadius: "12px", opacity: 0.5 }}>
                    No reported issues found.
                </div>
            )}
        </div>
    );
};

export default AdminFeed;