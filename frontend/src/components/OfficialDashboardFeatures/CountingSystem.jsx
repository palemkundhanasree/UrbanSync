import React from 'react';

const CountingSystem = ({ stats }) => {
    const styles = {
        row1: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" },
        row2: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "20px", marginBottom: "30px" },
        card: {
            background: "#1c1c1c",
            padding: "20px",
            borderRadius: "12px",
            borderLeft: "5px solid #baf087",
            boxShadow: "0 4px 6px rgba(0,0,0,0.3)"
        },
        label: { margin: 0, opacity: 0.7, fontSize: "0.9rem", color: "#f3e8d3" },
        count: { margin: "10px 0 0 0", fontSize: "1.8rem", fontWeight: "bold" }
    };

    return (
        <>
            {/* Top Row: Escalated and Today's Reports */}
            <div style={styles.row1}>
                <div style={{ ...styles.card, borderLeftColor: "#ff4d4d" }}>
                    <p style={styles.label}>Total Escalated reports:</p>
                    <h2 style={{ ...styles.count, color: "#ff4d4d" }}>[{stats.escalated}]</h2>
                </div>
                <div style={styles.card}>
                    <p style={styles.label}>Issues reported today:</p>
                    <h2 style={{ ...styles.count, color: "#baf087" }}>[{stats.today}]</h2>
                </div>
            </div>

            {/* Bottom Row: Pending, In Progress, Resolved */}
            <div style={styles.row2}>
                <div style={styles.card}>
                    <p style={styles.label}>Total pending</p>
                    <h2 style={{ ...styles.count, color: "#baf087" }}>({stats.pending})</h2>
                </div>
                <div style={styles.card}>
                    <p style={styles.label}>Total inprogress</p>
                    <h2 style={{ ...styles.count, color: "#baf087" }}>({stats.inProgress})</h2>
                </div>
                <div style={styles.card}>
                    <p style={styles.label}>Total resolved issues:</p>
                    <h2 style={{ ...styles.count, color: "#baf087" }}>({stats.resolved})</h2>
                </div>
            </div>
        </>
    );
};

export default CountingSystem;