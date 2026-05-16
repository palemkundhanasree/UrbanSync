import React,{useState, useEffect} from "react";
import RaiseIssue from "../cdfeatures/RaiseIssue";
import IssueList from "../cdfeatures/IssueList";


function CitizenDashboard() {
    const [user, setUser] = useState({name:"Citizen"});
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [activeCount, setActiveCount] = useState(0);
    const [resolvedCount, setResolvedCount] = useState(0);
    const [refreshTrigger, setRefreshTrigger] = useState(false);
   
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        //gets user data saved during login
        const loggedInUser = JSON.parse(localStorage.getItem("user"));
        if(loggedInUser){
            setUser(loggedInUser);
        }

        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        window.addEventListener("resize", handleResize);
        return () =>  window.removeEventListener("resize", handleResize);
    }, []);

    const styles = {
        container: {
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            minHeight: "100vh",
            backgroundColor: "#0d1f0e", 
            color: "#f3e8d3",
            fontFamily: "sans-serif",
            boxSizing: "border-box",
        },
        mainContent: {
            flex: 1,
            padding: isMobile ? "20px 15px" : "40px",
            boxSizing: "border-box",
            width: "100%"
        },
        header: {
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            justifyContent: "space-between",
            alignItems: isMobile ? "stretch" : "center",
            marginBottom: "40px"
        },
        title: {
            fontSize: isMobile ? "1.8rem" : "2.5rem",
            margin: 0,
            textAlign: isMobile ? "center" : "left"
        },
        statsGrid: {
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: isMobile ? "15px" : "20px",
            marginBottom: "40px"
        },
        statCard: {
            backgroundColor: "rgba(255, 255, 255, 0.05)",
            padding:  isMobile ? "15px" : "20px",
            borderRadius: "12px",
            border: "1px solid rgba(186, 240, 135, 0.1)",
            textAlign: "center"
        },
        reportButton: {
            backgroundColor: "#baf087",
            color: "#133215",
            marginTop:"20px",
            padding: "15px 30px",
            border: "none",
            borderRadius: "8px",
            fontWeight: "bold",
            cursor: "pointer",
            fontSize:"1rem"
        },
        activityContainer: {
            backgroundColor: "rgba(255,255,255,0.03)", 
            padding: isMobile ? "20px 15px" : "30px", 
            borderRadius: "15px",
            overflowX: "auto"
        }
    };

    return (
        <div style={styles.container}>

            {/* Main Content */}
            <div style={styles.mainContent}>
                <div style={styles.header}>
                    <h1>Welcome, {user.name}</h1>
                    <button style={styles.reportButton} onClick={() => setIsFormOpen(true)}>
                        + File New Issue
                    </button>
                </div>

                {/* Quick Stats */}
                <div style={styles.statsGrid}>
                    <div style={styles.statCard}>
                        <h3 style={{ color: "#baf087" }}>
                            {activeCount}
                        </h3>
                        <p>Active Issues</p>
                    </div>
                    <div style={styles.statCard}>
                        <h3 style={{ color: "#baf087" }}>
                            {resolvedCount}
                        </h3>
                        <p>Resolved Issues</p>
                    </div>
                </div>

                {/* Recent Activity Table Placeholder */}
                <div style={styles.activityContainer}>
                    <h3>Recent Activity</h3>

    <IssueList
        setActiveCount={setActiveCount}
        setResolvedCount={setResolvedCount}
        refreshTrigger={refreshTrigger} />
    
</div>
                {isFormOpen && <RaiseIssue onClose={() => setIsFormOpen(false)}
                    onReportSubmitted={() => {setRefreshTrigger(prev => !prev);}}
                />}

            </div>
        </div>
    );
}

export default CitizenDashboard;