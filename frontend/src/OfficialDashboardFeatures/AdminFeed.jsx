import React from 'react';
import StatusUpdater from './StatusUpdater';

const AdminFeed = ({ reports, onStatusChange }) => {

    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        return new Date(dateString).toLocaleDateString();
    }

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
            {reports.map((report) => (
                <div key={report._id} style={{
                    backgroundColor: "#1a2e1a",
                    border: "1px solid #baf08733",
                    borderRadius: "12px",
                    padding: "20px",
                    display: "flex",
                    alignItems: "center",
                    gap: "20px"
                }}>
                    <div style={{ display: "flex", gap: "15px", alignItems: "flex-start" }}>
                        <div style={{ textAlign: "center" }}>
                            <div style={{
                                width: "90px", height: "90px", backgroundColor: "#000",
                                borderRadius: "8px", overflow: "hidden", border: "1px solid #444",
                                display: "flex", alignItems: "center", justifyContent: "center"
                            }}>
                                {report.image ? (
                                    <img src={report.image} alt="Evidence" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                                ) : (
                                    <div style={{ color: "#fff", fontSize: "0.5rem", opacity: 0.4 }}>No Issue Image</div>
                                )}
                            </div>
                            <p style={{ margin: "5px 0 0 0", fontSize: "0.65rem", color: "#f3e8d3", opacity: 0.8 }}>Issue-Proof</p>
                            <p style={{ margin: "2px 0 0 0", fontSize: "0.6rem", color: "#f3e8d3", opacity: 0.5 }}>
                                {formatDate(report.createdAt)}
                            </p>
                        </div>

                        {report.resolvedImage && (
                            <div style={{ textAlign: "center" }}>
                                <div style={{
                                    width: "90px", height: "90px", backgroundColor: "#000",
                                    borderRadius: "8px", overflow: "hidden", border: "2px solid #baf087",
                                    display: "flex", alignItems: "center", justifyContent: "center"
                                }}>
                                    <img src={report.resolvedImage} alt="Resolved Proof" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                                </div>
                                <p style={{ margin: "5px 0 0 0", fontSize: "0.65rem", color: "#baf087", fontWeight: "bold" }}>Resolved-Proof</p>
                                <p style={{ margin: "2px 0 0 0", fontSize: "0.6rem", color: "#baf087", opacity: 0.7 }}>
                                    {formatDate(report.updatedAt)}
                                </p>
                            </div>
                        )}
                    </div>



                    <div style={{ flex: 1 }}>
                        <h3 style={{ margin: "0 0 5px 0", color: "#baf087", fontSize: "1.1rem" }}>{report.category}</h3>
                        <p style={{ margin: "0 0 5px 0", color: "#f3e8d3", fontSize: "0.9rem" }}>{report.description || report.category.toLowerCase()}</p>
                        <p style={{ margin: 0, color: "#f3e8d3", fontSize: "0.75rem", opacity: 0.7 }}>
                            {report.address}, Tirupati (Urban), Tirupati, Andhra Pradesh, 517503, India
                        </p>
                    </div>

                    <div style={{ textAlign: "right", minWidth: "160px", display: "flex", flexDirection: "column", gap: "12px" }}>
                        <div>
                            <StatusUpdater
                                currentStatus={report.status}
                                onUpdate={(newStatus, resolvedImage) => onStatusChange(report._id, newStatus, resolvedImage)}
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