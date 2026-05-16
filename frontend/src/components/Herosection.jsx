import React , { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import heroSectionImage from "../assets/heroSectionImage.png";

function Herosection() {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);

    useEffect(() => {
            const user = localStorage.getItem("user");
            if (user) {
                setIsLoggedIn(true);
            }
            const handleResize = () => {
                setIsMobile(window.innerWidth <= 600);
            };
            window.addEventListener("resize", handleResize);
            return () => window.removeEventListener("resize", handleResize);
        }, []);

    const styles = {
        heroSection: {
            display: "flex",
            flexWrap: "wrap", 
            justifyContent: "space-around",
            alignItems: "center",
            minHeight: "70vh",
            padding: isMobile ? "20px 15px" : "0 60px",
        },
        heroSectionText: {
            padding: isMobile ? "20px 10px" : "60px",
            paddingLeft: isMobile ? "10px" : "90px",
            minWidth: "300px",
            color: "#f3e8d3",
            textAlign: isMobile ? "center" : "left",
            boxSizing: "border-box"
        },
        heading: {
            fontSize: "clamp(2rem, 5vw, 3.5rem)", 
            margin: "5px 0",
            fontWeight: "800",
            lineHeight: "1.1"
        },
        highlightText: {
            color: "#baf087"     
        },
        paragraph: {
            fontSize: isMobile ? "1rem" : "1.2rem",
            marginTop: "20px",
            lineHeight: "1.6",
            maxWidth: "500px",
            color: "#fff",
            opacity: "0.9",
            margin: isMobile ? "20px auto 0 auto" : "20px 0 0 0"
        },
        button: {
            marginTop: "30px",
            padding: "15px 35px",
            fontSize: "1.1rem",
            background: "#baf087",
            color: "#133215",
            border: "none",
            borderRadius: "50px", 
            cursor: "pointer",
            fontWeight: "700",
            transition: "transform 0.2s ease",
            width: isMobile ? "100%" : "auto",
            maxWidth: "320px"
        },
        imageContainer: {
            flex: "1",
            display: "flex",
            justifyContent: "center",
            minWidth: "300px",
            marginTop: isMobile ? "30px" : "0",
            boxSizing: "border-box",
            padding: isMobile ? "0 10px" : "0"
        },
        heroImg: {
            width: "100%",
            maxWidth: isMobile ? "450px" : "700px",
            objectFit: "contain",
            height: "auto"
        }
    };

    return (
        <section style={{ minHeight: "100vh"}}>
            <main style={styles.heroSection}>
                <div style={styles.heroSectionText}>
                    <h1 style={styles.heading}>Your City.</h1>
                    <h1 style={styles.heading}>Your Voice.</h1>
                    <h1 style={{ ...styles.heading, ...styles.highlightText }}>Our Priority.</h1>
                    <p style={styles.paragraph}>
                        Report issues, track progress, and help build a better, cleaner, and smarter city with 
                        <span style={styles.highlightText}> UrbanSync!!!</span>
                    </p>
                     {isLoggedIn ? (
                                    <button style={styles.button} onClick={() => navigate("/signup")}>
                                        Go to Dashboard &rarr;
                                    </button>
                                    ) : (
                                    <button style={styles.button} onClick={() => navigate("/signup")}>
                                        Report, Track, Resolve &rarr;
                                    </button>
                    )}
                    
                </div>

                <div style={styles.imageContainer}>
                    <img src={heroSectionImage} alt="Civic Hero" style={styles.heroImg} />
                </div>
            </main>
        </section>
    );
}

export default Herosection;