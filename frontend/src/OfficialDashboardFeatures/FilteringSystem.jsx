import React, { useState, useEffect } from 'react';

const FilteringSystem = ({ issueFilter, setIssueFilter, statusFilter, setStatusFilter }) => {
    
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 600);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const selectStyle = {
        backgroundColor: "#252525",
        color: "#f3e8d3",
        padding: "10px 15px",
        borderRadius: "8px",
        border: "1px solid #333",
        cursor: "pointer",
        fontSize: "0.9rem",
        width: isMobile ? "100%" : "auto", 
        WebkitAppearance: "none",
    };
    const containerStyle = { 
        display: "flex", 
        flexDirection: isMobile ? "column" : "row", 
        justifyContent: isMobile ? "stretch" : "flex-end", 
        alignItems: isMobile ? "stretch" : "center", 
        gap: "12px", 
        marginBottom: "25px",
        width: "100%",
        boxSizing: "border-box"
    };

    const searchGroupStyle = { 
        display: "flex", 
        flexDirection: isMobile ? "column" : "row",
        alignItems: isMobile ? "flex-start" : "center", 
        gap: isMobile ? "6px" : "10px",
        width: isMobile ? "100%" : "auto"
    };

    return (
        <div style={containerStyle}>
            <div style={searchGroupStyle}>
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

            <div style={isMobile ? { ...searchGroupStyle, marginTop: "4px" } : {}}>
                {isMobile && (
                    <span style={{ color: "#baf087", fontWeight: "bold", fontSize: "0.9rem" }}>
                        Filter by Status:
                    </span>
                )}
            </div>
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} style={selectStyle}>
                <option value="All">All Statuses</option>
                <option value="Pending">Pending</option>
                <option value="In-Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
            </select>
        </div>
    )
};

export default FilteringSystem;