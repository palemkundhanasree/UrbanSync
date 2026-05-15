import React, { useEffect, useState } from "react";
import "./IssueList.css";

const IssueList = ({ setActiveCount, setResolvedCount, refreshTrigger }) => {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReports = async () => {
            const loggedInUser = JSON.parse(localStorage.getItem("user"));
            const userId = loggedInUser?._id || loggedInUser?.id ;

            if (!userId) {
                console.error("User ID not found in localStorage.");
                return;
            }

            try {
                const response = await fetch(`http://localhost:5000/api/reports/user/${userId}`);
                const data = await response.json();
                if (response.ok) {
                    const reportsArray = Array.isArray(data)? data : [];
                    setReports(reportsArray);
                    const activeReports=reportsArray.filter((report) => {
                    const status = report.status?.toLowerCase();
                    return status === "pending" || status === "in progress";
                  }).length;
                    setActiveCount(activeReports);
                   const resolvedReports = reportsArray.filter((report) => {
                  return report.status?.toLowerCase() === "resolved";
                }).length;
                setResolvedCount(resolvedReports);
                } else {
                    console.error("Failed to fetch reports:", data.message);
                }
            } catch (error) {
                console.error("Error fetching reports:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchReports();
    }, [refreshTrigger]);

    if (loading) {
        return <div><p className="loading-text">Loading...</p></div>;
    }

    return (
        <div className="issue-container">
            {reports.length === 0 ? (
                <p className="empty-text">No Issues found. Help your community by reporting issues!</p>
            ) : (
                reports.map((report) => (
                    <div key={report._id} className="issue-card">

                        <div className="proof-section" style={{ display: "flex", gap: "15px", padding: "15px" }}>
                            
                            <div className="proof-item" style={{ textAlign: "center" }}>
                                <div className="issue-img-container" style={{ width: "80px", height: "80px", overflow: "hidden", borderRadius: "8px", border: "1px solid #333" }}>
                                    {report.image ? (
                                        <img src={report.image} alt="Issue Evidence" className="issue-img" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                                    ) : (
                                        <div style={{ fontSize: "0.6rem", opacity: 0.4, paddingTop: "30px" }}>No Image</div>
                                    )}
                                </div>
                                <p style={{ fontSize: "0.65rem", marginTop: "5px", color: "#f3e8d3", opacity: 0.7 }}>Issue-Proof</p>
                            </div>

                            {report.resolvedImage && (
                                <div className="proof-item" style={{ textAlign: "center" }}>
                                    <div className="resolved-img-container" style={{ width: "80px", height: "80px", overflow: "hidden", borderRadius: "8px", border: "2px solid #baf087" }}>
                                        <img src={report.resolvedImage} alt="Resolved Evidence" className="issue-img" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                                    </div>
                                    <p style={{ fontSize: "0.65rem", marginTop: "5px", color: "#baf087", fontWeight: "bold" }}>Resolved-Proof</p>
                                </div>
                            )}
                        </div>
                        
                        <div className="issue-info">
                            <div className="issue-header">
                                <h4 className="issue-title">{report.category}</h4>
                                <span className={`status-badge status-${report.status?.toLowerCase()}`}>
                                    {report.status}
                                </span>
                            </div>
                            <p className="issue-description">{report.description}</p>
                            <div className="issue-footer">
                                <span className="issue-location">{report.address}</span>
                                <span className="issue-date">
                                    {new Date(report.createdAt).toLocaleDateString()}
                                </span>
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default IssueList; 