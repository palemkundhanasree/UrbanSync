import React from 'react';

const CountingSystem = ({ stats }) => {
    const styles = {
        row: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "20px", marginBottom: "30px" },
        card: {
            background: "#1c1c1c",
            padding: "20px",
            borderRadius: "12px",
            boxShadow: "0 4px 6px rgba(0,0,0,0.3)"
        },
        label: { margin: 0, opacity: 0.7, fontSize: "0.9rem", color: "#f3e8d3" },
        count: { margin: "10px 0 0 0", fontSize: "1.8rem", fontWeight: "bold" }
    };

    return (
        <div style={styles.row}>
            <div style={{ ...styles.card, borderLeft: "5px solid #D8A200" }}>
                <p style={styles.label}>Total pending</p>
                <h2 style={{ ...styles.count, color: "#D8A200" }}>{stats.pending}</h2>
            </div>
            <div style={{ ...styles.card, borderLeft: "5px solid #1072E1" }}>
                <p style={styles.label}>Total inprogress</p>
                <h2 style={{ ...styles.count, color: "#1072E1" }}>{stats.inProgress}</h2>
            </div>
            <div style={{ ...styles.card, borderLeft: "5px solid #baf087" }}>
                <p style={styles.label}>Total resolved issues:</p>
                <h2 style={{ ...styles.count, color: "#baf087" }}>{stats.resolved}</h2>
            </div>
        </div>
    );
};

export default CountingSystem;