import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Signup() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'citizen'
    });

    const styles = {
        container: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "80vh",
            backgroundColor: "#133215",
            color: "#f3e8d3",
            padding: "20px"
        },
        card: {
            backgroundColor: "rgba(255, 255, 255, 0.05)",
            padding: "40px",
            borderRadius: "15px",
            boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
            width: "100%",
            maxWidth: "400px",
            textAlign: "center",
            border: "1px solid rgba(255, 255, 255, 0.1)"
        },
        title: { fontSize: "2rem", marginBottom: "10px", color: "#baf087" },
        inputGroup: { marginBottom: "15px", textAlign: "left" },
        label: { display: "block", marginBottom: "5px", fontSize: "0.9rem" },
        input: {
            width: "100%",
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #444",
            backgroundColor: "#1a3d1c",
            color: "#fff",
            fontSize: "1rem",
            outline: "none",
            boxSizing: "border-box"
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
        footerText: { marginTop: "20px", fontSize: "0.9rem", color: "#ccc" },
        link: { color: "#baf087", textDecoration: "none", fontWeight: "600" }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSignup =  async (e) => {
        e.preventDefault();
        console.log("Creating account for:", formData);
        // Backend API call
        try{
            if(formData.password.length <= 8){
                alert("Password must be at least 8 characters long.");
                return;
            }

            const response = await fetch('http://localhost:5000/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const data= await response.json();
            
            if(response.ok){
                alert("Account created successfully! Please log in.");
                window.location.href="/login";
            } else {
                alert(data.message || "Failed to create account. Please try again.");
            }
        }
        catch (error) {
            console.error("Error creating account:", error);
            alert("Failed to create account. Please try again.");
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2 style={styles.title}>Join UrbanSync</h2>
                <p style={{marginBottom: '20px'}}>Create an account to improve your city</p>
                
                <form onSubmit={handleSignup}>
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

                    <button type="submit" style={styles.button}>Create Account</button>
                </form>

                <p style={styles.footerText}>
                    Already have an account? <Link to="/login" style={styles.link}>Log In</Link>
                </p>
                <p style={{marginTop: '10px'}}><Link to="/" style={styles.link}>&larr; Back to Home</Link></p>
            </div>
        </div>
    );
}

export default Signup;