import React, { useEffect, useState } from "react";
import "./IssueList.css";

const IssueList = () => {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReports = async () => {
            const loggedInUser = JSON.parse(localStorage.getItem("user"));
            const userId = loggedInUser?.id || loggedInUser?.id ;

            if (!userId) {
                console.error("User ID not found in localStorage.");
                return;
            }

            try {
                const response = await fetch(`http://localhost:5000/api/reports/user/${userId}`);
                const data = await response.json();
                if (response.ok) {
                    setReports(data);
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
    }, []);

    if (loading) {
        return <div><p className="loading-text">Loading...</p></div>;
    }

    return (
        <div className="issue-container">
            {reports.length === 0 ? (
                <p className="empty-text">No reports found. Help your community by reporting issues!</p>
            ) : (
                reports.map((report) => (
                    <div key={report.id} className="issue-card">
                        {report.image && (
                            <div className="issue-img-container">
                                <img
                                    src={`http://localhost:5000/${report.image.replace(/\\/g, "/")}`}
                                    alt="Evidence"
                                    className="issue-img"
                                />
                            </div>
                        )}
                        <div className="issue-info">
                            <div className="issue-header">
                                <h4 className="issue-title">{report.category}</h4>
                                <span className={`status-badge status-${report.status.toLowerCase()}`}>
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