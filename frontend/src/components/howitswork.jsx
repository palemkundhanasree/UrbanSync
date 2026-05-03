import React from 'react';
import { Link } from 'react-router-dom';

function HowItWorks() {
    const styles = {
        container: {
            backgroundColor: "#133215",
            color: "#f3e8d3",
            padding: "80px 40px",
            textAlign: "center"
        },
        title: {
            fontSize: "2.8rem",
            color: "#baf087",
            marginBottom: "50px",
            fontWeight: "800"
        },
        stepsContainer: {
            display: "flex",
            flexDirection: "column",
            gap: "40px",
            maxWidth: "800px",
            margin: "0 auto"
        },
        stepBox: {
            display: "flex",
            alignItems: "flex-start",
            gap: "25px",
            backgroundColor: "rgba(255, 255, 255, 0.05)",
            padding: "30px",
            borderRadius: "15px",
            borderLeft: "5px solid #baf087",
            textAlign: "left"
        },
        stepNumber: {
            backgroundColor: "#baf087",
            color: "#133215",
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontWeight: "bold",
            fontSize: "1.2rem",
            flexShrink: 0
        },
        stepTitle: {
            fontSize: "1.4rem",
            color: "#baf087",
            marginBottom: "10px"
        },
        stepDescription: {
            fontSize: "1.05rem",
            lineHeight: "1.6",
            opacity: "0.9"
        },
        backBtn: {
            display: "inline-block",
            marginTop: "50px",
            color: "#baf087",
            textDecoration: "none",
            fontWeight: "600",
            fontSize: "1.1rem"
        }
    };

    const steps = [
        {
            title: "Snap & Verify",
            desc: "Spot an issue like a pothole or garbage? Open the app and take a live photo. Our system automatically grabs your GPS coordinates to ensure the report is authentic."
        },
        {
            title: "Sync with Authorities",
            desc: "Your report is instantly sent to the municipal dashboard. You can track the status as it moves from 'Pending' to 'In-Progress'."
        },
        {
            title: "The 48-Hour Guarantee",
            desc: "If the local official doesn't respond or take action within 48 hours, the system automatically escalates the issue to higher-level city management."
        },
        {
            title: "Verify the Fix",
            desc: "Once the work is done, you'll receive a notification. You provide the final rating and verification to close the loop."
        }
    ];

    return (
        <section style={styles.container}>
            <h2 style={styles.title}>How UrbanSync Works</h2>
            
            <div style={styles.stepsContainer}>
                {steps.map((step, index) => (
                    <div key={index} style={styles.stepBox}>
                        <div style={styles.stepNumber}>{index + 1}</div>
                        <div>
                            <h3 style={styles.stepTitle}>{step.title}</h3>
                            <p style={styles.stepDescription}>{step.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
            <Link to="/" style={styles.backBtn}>← Back to Home</Link>
        </section>
    );
}

export default HowItWorks;