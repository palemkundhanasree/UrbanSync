import React, { useState, useEffect } from 'react';
import CountingSystem from '../OfficialDashboardFeatures/CountingSystem';
import FilteringSystem from '../OfficialDashboardFeatures/FilteringSystem';
import AdminFeed from '../OfficialDashboardFeatures/AdminFeed';

const OfficialDashboard = () => {
   
    const [reports, setReports] = useState([]);
    const [issueFilter, setIssueFilter] = useState('All');
    const [statusFilter, setStatusFilter] = useState('All');

    useEffect(() => {
        const fetchReports = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/reports/all');
                const data = await response.json();
                if (response.ok) {
                    setReports(data);
                }
            } catch (error) {
                console.error('Error fetching reports:', error);
            }
        };

        fetchReports();
    }, []);

    const handleUpdate = async (id, newStatus, resolvedImage) => {

        try {
            const response = await fetch(`http://localhost:5000/api/reports/update-status/${id}`, {
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
        today: reports.filter(r => new Date(r.createdAt) > new Date(new Date() - 24 * 60 * 60 * 1000)).length,
        pending: reports.filter(r => r.status === "Pending").length,
        inProgress: reports.filter(r => r.status === "In-Progress").length,
        resolved: reports.filter(r => r.status === "Resolved").length
    };

    const filteredReports = reports.filter(r =>
        (issueFilter === 'All' || r.category === issueFilter) &&
        (statusFilter === 'All' || r.status === statusFilter)
    );

    return (
        <div style={{ padding: "40px", backgroundColor: "#131313", minHeight: "100vh", color: "#f3e8d3", fontFamily: "sans-serif" }}>
            <header style={{ marginBottom: "40px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                    <h2 style={{ color: "#baf087", margin: 0 }}>Welcome to UrbanSync!</h2>
                    <h1 style={{ margin: "10px 0" }}>Official Panel: <span style={{ borderBottom: "2px solid #baf087" }}>Admin</span></h1>
                    <h3 style={{ opacity: 0.8 }}>Department of Municipal Works</h3>
                </div>

                {/* Updated: Increased size and themed color */}
                <div style={{ textAlign: "right" }}>
                    <p style={{ color: "#baf087", margin: 0, fontWeight: "bold", fontSize: "1.2rem" }}>Issues reported today</p>
                    <h2 style={{ margin: "5px 0 0 0", color: "#fff", fontSize: "3.5rem", fontWeight: "bold", lineHeight: "1" }}>{stats.today}</h2>
                </div>
            </header>

            <CountingSystem stats={stats} />

            <h2 style={{ marginBottom: "20px" }}>Reported Issues</h2>
            <FilteringSystem
                issueFilter={issueFilter} setIssueFilter={setIssueFilter}
                statusFilter={statusFilter} setStatusFilter={setStatusFilter}
            />

            <AdminFeed reports={filteredReports} onStatusChange={handleUpdate} />
        </div>
    );
};

export default OfficialDashboard;