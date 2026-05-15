import React from 'react';

const FilteringSystem = ({ issueFilter, setIssueFilter, statusFilter, setStatusFilter }) => {
    const selectStyle = {
        backgroundColor: "#252525",
        color: "#f3e8d3",
        padding: "10px 15px",
        borderRadius: "8px",
        border: "1px solid #333",
        cursor: "pointer",
        fontSize: "0.9rem"
    };

    return (
        <div style={{ display: "flex", justifyContent: "flex-end", gap: "15px", marginBottom: "20px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span style={{ color: "#baf087", fontWeight: "bold" }}>Search:</span>
                <select value={issueFilter} onChange={(e) => setIssueFilter(e.target.value)} style={selectStyle}>
                    <option value="All">All Categories</option>
                    <option value="Pothole">Pothole</option>
                    <option value="Drainage">Drainage</option>
                    <option value="Street Lights">Street Lights</option>
                    <option value="Barking Dogs">Barking Dogs</option>
                    <option value="Water Problem">Water Problem</option>
                </select>
            </div>

            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} style={selectStyle}>
                <option value="All">All Statuses</option>
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
            </select>
        </div>
    );
};

export default FilteringSystem;