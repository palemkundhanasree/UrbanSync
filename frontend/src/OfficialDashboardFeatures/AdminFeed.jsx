import React, { useState, useEffect } from 'react';
import StatusUpdater from './StatusUpdater';

const AdminFeed = ({ reports, onStatusChange }) => {

    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        return new Date(dateString).toLocaleDateString();
    }

    const styles = {
        feedContainer: { 
            display: "flex", 
            flexDirection: "column", 
            gap: "15px" 
        },
        card: {
            backgroundColor: "#1a2e1a",
            border: "1px solid #baf08733",
            borderRadius: "12px",
            padding: isMobile ? "15px" : "20px",
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            alignItems: isMobile ? "stretch" : "center",
            gap: isMobile ? "15px" : "20px",
            boxSizing: "border-box"
        },
        imageSection: { 
            display: "flex", 
            gap: "15px", 
            alignItems: "flex-start",
            justifyContent: isMobile ? "center" : "flex-start",
            width: isMobile ? "100%" : "auto"
        },
        imageWrapper: {
            width: "90px", 
            height: "90px", 
            backgroundColor: "#000",
            borderRadius: "8px", 
            overflow: "hidden", 
            border: "1px solid #444",
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center"
        },
        resolvedImageWrapper: {
            width: "90px", 
            height: "90px", 
            backgroundColor: "#000",
            borderRadius: "8px", 
            overflow: "hidden", 
            border: "2px solid #baf087",
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center"
        },
        textSection: { 
            flex: 1,
            textAlign: isMobile ? "center" : "left",
            width: "100%"
        },
        actionSection: { 
            textAlign: isMobile ? "center" : "right", 
            minWidth: isMobile ? "100%" : "160px", 
            display: "flex", 
            flexDirection: isMobile ? "row" : "column", 
            justifyContent: isMobile ? "space-between" : "flex-start",
            alignItems: "center",
            gap: "12px",
            borderTop: isMobile ? "1px solid rgba(255,255,255,0.08)" : "none",
            paddingTop: isMobile ? "12px" : "0px",
            boxSizing: "border-box"
        },
        statusBadge: {
            backgroundColor: "#baf087", 
            color: "#000", 
            padding: "6px 14px", 
            borderRadius: "15px",
            fontSize: "0.7rem", 
            fontWeight: "bold", 
            textTransform: "uppercase",
            display: "inline-block"
        }
    };

    return (
        <div style={styles.feedContainer}>
            {reports.map((report) => (
                <div key={report._id} style={styles.card}>
                    <div style={styles.imageSection}>
                        <div style={{ textAlign: "center" }}>
                            <div style={styles.imageWrapper}>
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
                                <div style={styles.resolvedImageWrapper}>
                                    <img src={report.resolvedImage} alt="Resolved Proof" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                                </div>
                                <p style={{ margin: "5px 0 0 0", fontSize: "0.65rem", color: "#baf087", fontWeight: "bold" }}>Resolved-Proof</p>
                                <p style={{ margin: "2px 0 0 0", fontSize: "0.6rem", color: "#baf087", opacity: 0.7 }}>
                                    {formatDate(report.updatedAt)}
                                </p>
                            </div>
                        )}
                    </div>

                    <div style={styles.textSection}>
                        <h3 style={{ margin: "0 0 5px 0", color: "#baf087", fontSize: isMobile ? "1rem" : "1.1rem" }}>{report.category}</h3>
                        <p style={{ margin: "0 0 8px 0", color: "#f3e8d3", fontSize: isMobile ? "0.85rem" : "0.9rem", lineHeight: "1.4" }}>
                            {report.description || report.category.toLowerCase()}
                        </p>
                        <p style={{ margin: 0, color: "#f3e8d3", fontSize: "0.75rem", opacity: 0.7, lineHeight: "1.4" }}>
                            {report.address}, Tirupati (Urban), Tirupati, Andhra Pradesh, 517503, India
                        </p>
                    </div>

                    <div style={styles.actionSection}>
                        <div style={{ width: isMobile ? "auto" : "100%" }}>
                            <StatusUpdater
                                currentStatus={report.status}
                                onUpdate={(newStatus, resolvedImage) => onStatusChange(report._id, newStatus, resolvedImage)}
                            />
                        </div>

                        <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
                            <div style={{
                                ...styles.statusBadge,
                                backgroundColor: report.status === 'Resolved' ? "#baf087" :
                                                 report.status === 'Pending' ? "#D8A200" : "#1072E1",
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