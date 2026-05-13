import React, { useState, useEffect } from 'react';
import OfficialDashboardFeatures from './officialDashboardfeatures';

function OfficialDashboard() {
    const [admin, setAdmin] = useState({ name: "Official" });
    // This state tracks which tab the user has clicked in the sidebar
    const [view, setView] = useState('incoming');

    const [pendingIssues, setPendingIssues] = useState([
        { id: 101, type: "Pothole", location: "Main St", status: "Pending", priority: "High", proofImg: "https://via.placeholder.com/100" },
        { id: 102, type: "Street Light", location: "2nd Ave", status: "In Progress", priority: "Normal", proofImg: "" }
    ]);

    useEffect(() => {
        const loggedInUser = JSON.parse(localStorage.getItem('user'));
        if (loggedInUser) setAdmin(loggedInUser);
    }, []);

    const handleStatusUpdate = (id, newStatus) => {
        setPendingIssues(prev =>
            prev.map(issue => issue.id === id ? { ...issue, status: newStatus } : issue)
        );
    };

    const styles = {
        container: { display: "flex", minHeight: "100vh", backgroundColor: "#131313", color: "#f3e8d3", fontFamily: "sans-serif" },
        sidebar: { width: "260px", backgroundColor: "#1c1c1c", padding: "40px 20px", borderRight: "1px solid #333" },
        main: { flex: 1, padding: "40px" },
        navItem: (isActive) => ({
            color: isActive ? "#baf087" : "#fff",
            fontWeight: isActive ? "bold" : "normal",
            cursor: "pointer",
            opacity: isActive ? 1 : 0.6,
            marginBottom: "20px"
        })
    };

    return (
        <div style={styles.container}>
            <div style={styles.sidebar}>
                <h2 style={{ color: "#baf087" }}>UrbanSync Admin</h2>
                <nav style={{ marginTop: "40px" }}>
                    <p
                        style={styles.navItem(view === 'incoming')}
                        onClick={() => setView('incoming')}
                    >
                        📥 Incoming Tasks
                    </p>
                    <p
                        style={styles.navItem(view === 'resolved')}
                        onClick={() => setView('resolved')}
                    >
                        ✅ Resolved Issues
                    </p>
                </nav>
            </div>

            <div style={styles.main}>
                <header style={{ marginBottom: "40px" }}>
                    <h1>Official Panel: {admin.name}</h1>
                    <p style={{ opacity: 0.7 }}>View: {view === 'incoming' ? 'Incoming Tasks' : 'Resolved Archive'}</p>
                </header>

                <OfficialDashboardFeatures
                    reports={pendingIssues}
                    onUpdateStatus={handleStatusUpdate}
                    currentView={view}
                />
            </div>
        </div>
    );
}

export default OfficialDashboard;