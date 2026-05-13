import React, { useState } from 'react';

const OfficialDashboardFeatures = ({ reports, onUpdateStatus, currentView }) => {
    const [filter, setFilter] = useState('All');

    const stats = {
        total: reports.length,
        highPriority: reports.filter(r => r.priority === 'High').length,
        resolved: reports.filter(r => r.status === 'Resolved').length
    };

    const filteredReports = reports.filter(report => {
        const matchesView = currentView === 'resolved'
            ? report.status === 'Resolved'
            : report.status !== 'Resolved';

        if (!matchesView) return false;

        if (filter === 'All') return true;
        return report.status === filter || report.priority === filter;
    });

    const styles = {
        featureContainer: { padding: "20px", backgroundColor: "#1c1c1c", borderRadius: "12px" },
        btn: (isActive) => ({
            padding: "8px 16px", borderRadius: "20px", cursor: "pointer", fontWeight: "bold",
            border: isActive ? "none" : "1px solid #baf087",
            backgroundColor: isActive ? "#baf087" : "transparent",
            color: isActive ? "#000" : "#baf087"
        })
    };

    return (
        <div style={styles.featureContainer}>
            <div style={{ display: "flex", gap: "20px", marginBottom: "30px" }}>
                <div style={{
                    background: "#1c1c1c",
                    padding: "20px",
                    borderRadius: "10px",
                    flex: 1,
                    borderLeft: "5px solid #ff4d4d"
                }}>
                    <h2 style={{ color: "#ff4d4d", margin: 0 }}>{stats.highPriority}</h2>
                    <p style={{ margin: 0, opacity: 0.7, fontSize: "0.9rem" }}>High Priority Tasks</p>
                </div>

                <div style={{
                    background: "#1c1c1c",
                    padding: "20px",
                    borderRadius: "10px",
                    flex: 1,
                    borderLeft: "5px solid #baf087"
                }}>
                    <h2 style={{ color: "#baf087", margin: 0 }}>{stats.total - stats.resolved}</h2>
                    <p style={{ margin: 0, opacity: 0.7, fontSize: "0.9rem" }}>Total Pending Issues</p>
                </div>

                <div style={{
                    background: "#1c1c1c",
                    padding: "20px",
                    borderRadius: "10px",
                    flex: 1,
                    borderLeft: "5px solid #f3e8d3"
                }}>
                    <h2 style={{ color: "#f3e8d3", margin: 0 }}>{stats.resolved}</h2>
                    <p style={{ margin: 0, opacity: 0.7, fontSize: "0.9rem" }}>Resolved Issues</p>
                </div>
            </div>
            <div style={{ display: "flex", gap: "20px", marginBottom: "30px" }}>
                <div style={{ background: "#252525", padding: "15px", borderRadius: "8px", flex: 1 }}>
                    <p style={{ margin: 0, opacity: 0.6, fontSize: "0.8rem" }}>Pending</p>
                    <h2 style={{ margin: 0, color: "#baf087" }}>{stats.total - stats.resolved}</h2>
                </div>
                <div style={{ background: "#252525", padding: "15px", borderRadius: "8px", flex: 1 }}>
                    <p style={{ margin: 0, opacity: 0.6, fontSize: "0.8rem" }}>Resolved</p>
                    <h2 style={{ margin: 0, color: "#baf087" }}>{stats.resolved}</h2>
                </div>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
                <h3 style={{ color: "#baf087" }}>{currentView === 'resolved' ? 'Resolved Proofs' : 'Incoming Feed'}</h3>
                <div style={{ display: "flex", gap: "10px" }}>
                    {['All', 'High', 'In Progress'].map((f) => (
                        <button key={f} style={styles.btn(filter === f)} onClick={() => setFilter(f)}>{f}</button>
                    ))}
                </div>
            </div>

            {filteredReports.map(report => (
                <div key={report.id} style={{ borderBottom: "1px solid #333", padding: "15px 0", display: "flex", justifyContent: "space-between" }}>
                    <div>
                        <h4 style={{ margin: 0 }}>{report.type} - {report.location}</h4>
                        {report.proofImg && <img src={report.proofImg} alt="proof" style={{ width: "80px", borderRadius: "5px", marginTop: "10px" }} />}
                    </div>
                    <div style={{ textAlign: "right" }}>
                        <select
                            value={report.status}
                            onChange={(e) => onUpdateStatus(report.id, e.target.value)}
                            style={{ backgroundColor: "#252525", color: "#f3e8d3", padding: "5px", borderRadius: "4px" }}
                        >
                            <option value="Pending">Pending</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Resolved">Resolved</option>
                        </select>
                    </div>
                </div>
            ))}
            {filteredReports.length === 0 && <p style={{ opacity: 0.5 }}>No tasks in this section.</p>}
        </div>
    );
};

export default OfficialDashboardFeatures;