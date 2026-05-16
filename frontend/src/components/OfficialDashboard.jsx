import React, { useState, useEffect } from 'react';
import CountingSystem from '../OfficialDashboardFeatures/CountingSystem';
import FilteringSystem from '../OfficialDashboardFeatures/FilteringSystem';
import AdminFeed from '../OfficialDashboardFeatures/AdminFeed';

const OfficialDashboard = () => {

    const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";
   
    const [reports, setReports] = useState([]);
    const [issueFilter, setIssueFilter] = useState('All');
    const [statusFilter, setStatusFilter] = useState('All');
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const fetchReports = async () => {
            try {
                const response = await fetch(`${API_BASE}/api/reports/all`);
                const data = await response.json();
                if (response.ok) {
                    setReports(data);
                }
            } catch (error) {
                console.error('Error fetching reports:', error);
            }
        };

        fetchReports();

        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleUpdate = async (id, newStatus, resolvedImage) => {

        try {
            const response = await fetch(`${API_BASE}/api/reports/update-status/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 
                    status: newStatus,
                    resolvedImage: resolvedImage 
                })
            });
            if (response.ok) {
                alert('Report status updated successfully!');
                window.location.reload(); 
            }
        } catch (error) {
            console.error('Failed to update report:', error);
        }
    };

    const stats = {
        today: reports.filter(r => {
            return new Date(r.createdAt).toDateString() === new Date().toDateString();
        }).length,
        pending: reports.filter(r => r.status === "Pending").length,
        inProgress: reports.filter(r => r.status === "In-Progress").length,
        resolved: reports.filter(r => r.status === "Resolved").length
    };

    const filteredReports = reports.filter(r =>
        (issueFilter === 'All' || r.category === issueFilter) &&
        (statusFilter === 'All' || r.status === statusFilter)
    );

    const styles = {
        container: {
            padding: isMobile ? "20px 15px" : "40px", 
            backgroundColor: "#131313", 
            minHeight: "100vh", 
            color: "#f3e8d3", 
            fontFamily: "sans-serif",
            boxSizing: "border-box"
        },
        header: { 
            marginBottom: "40px", 
            display: "flex", 
            flexDirection: isMobile ? "column" : "row",
            justifyContent: "space-between", 
            alignItems: isMobile ? "flex-start" : "center",
            gap: isMobile ? "25px" : "0px"
        },
        titleGroup: {
            width: "100%"
        },
        mainGreeting: {
            color: "#baf087", 
            margin: 0,
            fontSize: isMobile ? "1.5rem" : "2rem"
        },
        panelHeading: {
            margin: "10px 0",
            fontSize: isMobile ? "1.8rem" : "2.5rem"
        },
        departmentHeading: {
            opacity: 0.8,
            fontSize: isMobile ? "1rem" : "1.2rem",
            margin: 0
        },
        badgeCounter: {
            textAlign: isMobile ? "left" : "right",
            width: isMobile ? "100%" : "auto",
            backgroundColor: isMobile ? "rgba(255,255,255,0.03)" : "transparent",
            padding: isMobile ? "15px" : "0px",
            borderRadius: isMobile ? "12px" : "0px",
            border: isMobile ? "1px solid rgba(186, 240, 135, 0.1)" : "none",
            boxSizing: "border-box"
        },
        badgeNumber: { 
            margin: "5px 0 0 0", 
            color: "#fff", 
            fontSize: isMobile ? "2.5rem" : "3.5rem", 
            fontWeight: "bold", 
            lineHeight: "1" 
        },
        sectionTitle: {
            marginBottom: "20px",
            fontSize: isMobile ? "1.4rem" : "1.8rem",
            marginTop: "30px"
        }
    };

    return (
        <div style={styles.container}>
            <header style={styles.header}>
                <div style={styles.titleGroup}>
                    <h2 style={styles.mainGreeting}>Welcome to UrbanSync!</h2>
                    <h1 style={styles.panelHeading}>Official Panel: <span style={{ borderBottom: "2px solid #baf087" }}>Admin</span></h1>
                    <h3 style={styles.departmentHeading}>Department of Municipal Works</h3>
                </div>

                <div style={styles.badgeCounter}>
                    <p style={{ color: "#baf087", margin: 0, fontWeight: "bold", fontSize: isMobile ? "1rem" : "1.2rem" }}>Issues reported today</p>
                    <h2 style={styles.badgeNumber}>{stats.today}</h2>
                </div>
            </header>

            <CountingSystem stats={stats} />

            <h2 style={styles.sectionTitle}>Reported Issues</h2>
            
            <FilteringSystem
                issueFilter={issueFilter} setIssueFilter={setIssueFilter}
                statusFilter={statusFilter} setStatusFilter={setStatusFilter}
            />

            <AdminFeed reports={filteredReports} onStatusChange={handleUpdate} />
        </div>
    );
};

export default OfficialDashboard;