import React, { useState, useEffect } from 'react';

function OfficialDashboard() {
    const [admin, setAdmin] = useState({ name: "Official" });
    // Sample data - eventually this will come from your 'reports' collection
    const [pendingIssues, setPendingIssues] = useState([]);

    useEffect(() => {
        const loggedInUser = JSON.parse(localStorage.getItem('user'));
        if (loggedInUser) setAdmin(loggedInUser);
    }, []);

    const styles = {
        container: {
            display: "flex",
            minHeight: "100vh",
            backgroundColor: "#131313", 
            color: "#f3e8d3",
            fontFamily: "sans-serif"
        },
        sidebar: {
            width: "260px",
            backgroundColor: "#1c1c1c",
            padding: "40px 20px",
            borderRight: "1px solid #333"
        },
        main: {
            flex: 1,
            padding: "40px"
        },
        card: {
            backgroundColor: "#252525",
            padding: "20px",
            borderRadius: "10px",
            marginBottom: "20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderLeft: "5px solid #baf087"
        },
        badge: (status) => ({
            backgroundColor: status === "Escalating" ? "#ff4d4d" : "#baf087",
            color: "#000",
            padding: "5px 12px",
            borderRadius: "15px",
            fontSize: "0.8rem",
            fontWeight: "bold"
        }),
        actionBtn: {
            backgroundColor: "transparent",
            border: "1px solid #baf087",
            color: "#baf087",
            padding: "8px 15px",
            borderRadius: "5px",
            cursor: "pointer"
        }
    };

    return (
        <div style={styles.container}>
            {/* Sidebar */}
            <div style={styles.sidebar}>
                <h2 style={{ color: "#baf087" }}>UrbanSync Admin</h2>
                <nav style={{ marginTop: "40px" }}>
                    <p style={{ color: "#baf087", fontWeight: "bold" }}>📥 Incoming Tasks</p>
                    <p style={{ opacity: 0.6, marginTop: "20px" }}>✅ Resolved Issues</p>
                </nav>
            </div>

            {/* Main Area */}
            <div style={styles.main}>
                <header style={{ marginBottom: "40px" }}>
                    <h1>Official Panel: {admin.name}</h1>
                    <p style={{ opacity: 0.7 }}>Department: Municipal Works</p>
                </header>

                <div style={{ display: "flex", gap: "20px", marginBottom: "40px" }}>
                    <div style={{ flex: 1, background: "#1c1c1c", padding: "20px", borderRadius: "10px" }}>
                        <h2 style={{ color: "#ff4d4d" }}>2</h2>
                        <p>High Priority (Escalating)</p>
                    </div>
                    <div style={{ flex: 1, background: "#1c1c1c", padding: "20px", borderRadius: "10px" }}>
                        <h2 style={{ color: "#baf087" }}>14</h2>
                        <p>Total Pending</p>
                    </div>
                </div>

                <h3>Active Tickets</h3>
                <div style={{ marginTop: "20px" }}>
                    {pendingIssues.map(issue => (
                        <div key={issue.id} style={styles.card}>
                            <div>
                                <h4 style={{ margin: 0 }}>{issue.type} - {issue.location}</h4>
                                <p style={{ fontSize: "0.9rem", opacity: 0.6 }}>ID: #{issue.id} | Timer: {issue.time}</p>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                                <span style={styles.badge(issue.status)}>{issue.status}</span>
                                <button style={styles.actionBtn}>Update Status</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default OfficialDashboard;