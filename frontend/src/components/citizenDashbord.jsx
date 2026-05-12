import React,{useState, useEffect} from "react";
import RaiseIssue from "../cdfeatures/RaiseIssue";
import IssueList from "../cdfeatures/IssueList";

function CitizenDashboard() {
    const [user, setUser] = useState({name:"Citizen"});
    const [isFormOpen, setIsFormOpen] = useState(false);

    useEffect(() => {
        //gets user data saved during login
        const loggedInUser = JSON.parse(localStorage.getItem("user"));
        if(loggedInUser){
            setUser(loggedInUser);
        }
    }, []);

    const styles = {
        container: {
            display: "flex",
            minHeight: "100vh",
            backgroundColor: "#0d1f0e", 
            color: "#f3e8d3",
            fontFamily: "sans-serif"
        },
        sidebar: {
            width: "260px",
            backgroundColor: "#1c1c1c",
            padding: "40px 20px",
            borderRight: "1px solid #333"
        },
        mainContent: {
            flex: 1,
            padding: "40px"
        },
        header: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "40px"
        },
        statsGrid: {
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "20px",
            marginBottom: "40px"
        },
        statCard: {
            backgroundColor: "rgba(255, 255, 255, 0.05)",
            padding: "20px",
            borderRadius: "12px",
            border: "1px solid rgba(186, 240, 135, 0.1)",
            textAlign: "center"
        },
        reportButton: {
            backgroundColor: "#baf087",
            color: "#133215",
            padding: "15px 30px",
            border: "none",
            borderRadius: "8px",
            fontWeight: "bold",
            cursor: "pointer",
            fontSize: "1rem"
        }
    };

    return (
        <div style={styles.container}>

            {/* Main Content */}
            <div style={styles.mainContent}>
                <div style={styles.header}>
                    <h1>Welcome, {user.name}</h1>
                    <button style={styles.reportButton} onClick={() => setIsFormOpen(true)}>
                        + File New Report
                    </button>
                </div>

                {/* Quick Stats */}
                <div style={styles.statsGrid}>
                    <div style={styles.statCard}>
                        <h3 style={{ color: "#baf087" }}>0</h3>
                        <p>Active Reports</p>
                    </div>
                    <div style={styles.statCard}>
                        <h3 style={{ color: "#baf087" }}>0</h3>
                        <p>Resolved</p>
                    </div>
                </div>

                {/* Recent Activity Table Placeholder */}
                <div style={{ backgroundColor: "rgba(255,255,255,0.03)", padding: "30px", borderRadius: "15px" }}>
                    <h3>Recent Activity</h3>
                    <IssueList />
                </div>

                {isFormOpen && <RaiseIssue onClose={() => setIsFormOpen(false)}/>}
            </div>
        </div>
    );
}

export default CitizenDashboard;