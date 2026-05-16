import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function AboutUs() {

    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const styles = {
        container: {
            backgroundColor: "#133215",
            color: "#f3e8d3",
            minHeight: "100vh",
            padding:isMobile ? "40px 20px" : "80px 40px",
            fontFamily: "sans-serif",
            boxSizing: "border-box"
        },
        content: {
            maxWidth: "900px",
            margin: "0 auto",
            textAlign: "center"
        },
        title: {
            fontSize:isMobile ? "2rem" : "3rem",
            color: "#baf087",
            marginBottom: "20px",
            fontWeight: "800"
        },
        description: {
            fontSize: isMobile ? "1.rem" : "1.2rem",
            lineHeight: "1.8",
            marginBottom: "40px",
            color: "#fff",
            opacity: "0.9"
        },
        grid: {
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "30px",
            marginTop: isMobile ? "30px" : "50px"
        },
        card: {
            backgroundColor: "rgba(255, 255, 255, 0.05)",
            padding:  isMobile ? "20px" : "30px",
            borderRadius: "15px",
            border: "1px solid rgba(186, 240, 135, 0.2)",
            textAlign: "left"
        },
        cardTitle: {
            color: "#baf087",
            fontSize: isMobile ? "1.2rem" : "1.4rem",
            marginBottom: "15px"
        },
        cardText: {
            fontSize: isMobile ? "0.9rem" : "1rem",
            lineHeight: "1.5"
        },
        backBtn: {
            display: "inline-block",
            marginTop: isMobile ? "40px" : "50px",
            color: "#baf087",
            textDecoration: "none",
            fontWeight: "600",
            fontSize: "1.1rem"
        }
    };

    return (
        <section style={styles.container}>
            <div style={styles.content}>
                <h1 style={styles.title}>Our Mission</h1>
                <p style={styles.description}>
                    UrbanSync is a next-generation civic engagement platform designed to bridge the gap between 
                    citizens and local governance. We believe that a smarter city isn't just about technology; 
                    it's about empowering people to take ownership of their neighborhoods.
                </p>

                <div style={styles.grid}>
                    <div style={styles.card}>
                        <h3 style={styles.cardTitle}>Transparency</h3>
                        <p style={styles.cardText}>Track every report in real-time. Know exactly when your issue is seen and when it's resolved.</p>
                    </div>
                    <div style={styles.card}>
                        <h3 style={styles.cardTitle}>Verification</h3>
                        <p style={styles.cardText}>Using GPS and live-camera verification to ensure every report is authentic and actionable.</p>
                    </div>
                    <div style={styles.card}>
                        <h3 style={styles.cardTitle}>Escalation</h3>
                        <p style={styles.cardText}>Our automated system ensures that neglected issues are escalated to higher authorities after 48 hours.</p>
                    </div>
                </div>

                <Link to="/" style={styles.backBtn}>← Back to Home</Link>
            </div>
        </section>
    );
}

export default AboutUs;