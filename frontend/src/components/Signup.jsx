import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Signup() {

    const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'citizen',
        otp:''
    });

    const [otpSent, setOtpSent] = useState(false);
    const [isLoading, setIsLoading] = useState(false);    

    const [isMobile, setIsMobile] = useState(window.innerWidth <= 480);
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 480);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const styles = {
        container: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "80vh",
            backgroundColor: "#133215",
            color: "#f3e8d3",
            padding: isMobile ? "20px 15px" : "40px 20px",
            boxSizing: "border-box"
        },
        card: {
            backgroundColor: "rgba(255, 255, 255, 0.05)",
            padding: isMobile ? "30px 20px" : "40px",
            borderRadius: "15px",
            boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
            width: "100%",
            maxWidth: "400px",
            textAlign: "center",
            border: "1px solid rgba(255, 255, 255, 0.1)"
        },
        title: { 
            fontSize: isMobile ? "1.8rem" : "2rem",
            marginBottom: "10px", 
            color: "#baf087" 
        },
        inputGroup: { 
            marginBottom: "15px", 
            textAlign: "left" 
        },
        label: { 
            display: "block", 
            marginBottom: "5px", 
            fontSize: "0.9rem" 
        },
        input: {
            width: "100%",
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #444",
            backgroundColor: "#1a3d1c",
            color: "#fff",
            fontSize: "1rem",
            outline: "none",
            boxSizing: "border-box",
            WebkitAppearance: "none"
        },
        button: {
            width: "100%",
            padding: "12px",
            backgroundColor: "#baf087",
            color: "#133215",
            border: "none",
            borderRadius: "8px",
            fontSize: "1.1rem",
            fontWeight: "700",
            cursor: "pointer",
            marginTop: "15px"
        },
        footerText: { 
            marginTop: "20px", 
            fontSize: "0.9rem", 
            color: "#ccc" 
        },
        link: { 
            color: "#baf087", 
            textDecoration: "none", 
            fontWeight: "600" 
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRequestOtp = async (e) => {
        e.preventDefault();
        if (!formData.email || !formData.name || !formData.password) {
            alert("Please fill in all registration fields first.");
            return;
        }
        setIsLoading(true);
        try {
            const response = await fetch(`${API_BASE}/api/otp/send-otp`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: formData.email })
            });
            const data = await response.json();

            if (response.ok) {
                alert(data.message);
                setOtpSent(true); 
            } else {
                alert(`Error: ${data.message}`);
            }
        } catch (error) {
            console.error("OTP delivery network failure:", error);
            alert("Network connection error. Failed to dispatch email code.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleVerifyAndSignup = async (e) => {
        e.preventDefault();
        if (!formData.otp) {
            alert("Please enter the verification code sent to your email.");
            return;
        }
        setIsLoading(true);
        try {
            const response = await fetch(`${API_BASE}/api/otp/verify-signup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const data = await response.json();

            if (response.ok) {
                alert("🎉 Success! Account verified and registered successfully.");
                window.location.href="/login";
            } else {
                alert(`Verification Failure: ${data.message}`);
            }
        } catch (error) {
            console.error("Verification processing error:", error);
            alert("Network failure processing registration context confirmation.");
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2 style={styles.title}>Join UrbanSync</h2>
                <p style={{marginBottom: '20px'}}>{otpSent ? `Confirm code sent to ${formData.email}` : "Create an account to improve your city"}</p>
                {!otpSent ? (
                    <form onSubmit={handleRequestOtp}>
                        <div style={styles.inputGroup}>
                            <label style={styles.label}>Full Name</label>
                            <input 
                                type="text" name="name" style={styles.input} placeholder="John Doe"
                                onChange={handleChange} required 
                            />
                        </div>

                        <div style={styles.inputGroup}>
                            <label style={styles.label}>Email Address</label>
                            <input 
                                type="email" name="email" style={styles.input} placeholder="name@gmail.com"
                                onChange={handleChange} required 
                            />
                        </div>

                        <div style={styles.inputGroup}>
                            <label style={styles.label}>Password</label>
                            <input 
                                type="password" name="password" style={styles.input} placeholder="Min. 8 characters"
                                onChange={handleChange} required 
                            />
                        </div>

                        <button type="submit" style={styles.button}>{isLoading ? "SENDING CODE..." : "Get Verification Code"}</button>
                    </form>
                ):(
                    <form onSubmit={handleVerifyAndSignup}>
                        <div style={styles.inputGroup}>
                            <label style={styles.label}>Enter 6-Digit OTP</label>
                            <input 
                                type="text" name="otp" maxLength="6" style={{ ...styles.input, textAlign: 'center', fontSize: '1.3rem', letterSpacing: '4px' }} placeholder="123456"
                                onChange={handleChange} required 
                            />
                        </div>x 

                        <button type="submit" disabled={isLoading} style={styles.button}>
                            {isLoading ? "VERIFYING..." : "Complete Sign Up 🎉"}
                        </button>

                    </form>
                )}

                <p style={styles.footerText}>
                    Already have an account? <Link to="/login" style={styles.link}>Log In</Link>
                </p>
                <p style={{marginTop: '10px'}}><Link to="/" style={styles.link}>&larr; Back to Home</Link></p>
            </div>
        </div>
    );
}

export default Signup;