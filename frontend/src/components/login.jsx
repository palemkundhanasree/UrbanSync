import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Login() {

    const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('citizen');

    const styles = {
        container: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "80vh",
            backgroundColor: "#133215", // Matching your theme
            color: "#f3e8d3"
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
        title: { 
            fontSize: "2rem",
            marginBottom: "10px", 
            color: "#baf087" 
        },
        inputGroup: { 
            marginBottom: "20px", 
            textAlign: "left" 
        },
        label: { 
            display: "block", 
            marginBottom: "8px", 
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
            marginTop: "10px"
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

    const handleLogin = async (e) => {
        e.preventDefault();
        console.log("Logging in as:", role,name, email);
        //  Backend API call 
        try{
            const response = await fetch(`${API_BASE}/api/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const data = await response.json();
            if (response.ok) {
                localStorage.setItem("user", JSON.stringify(data.user));
                alert("successfully logged in !!");
                // Redirect based on role
                if (data.user.role === "citizen") {
                    window.location.href = "/citizen-dashboard";
                } else {
                    window.location.href = "/official-dashboard";
                }
            } else {
                alert("Error logging in: " + data.message);
            }
        } catch (error) {
            console.error("Error logging in:", error);
            alert("Failed to login. Please try again.");
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2 style={styles.title}>Login</h2>
                <p style={{marginBottom: '30px'}}>Access your UrbanSync dashboard</p>
                
                <form onSubmit={handleLogin}>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Select Role</label>
                        <select 
                            style={styles.input} 
                            value={role} 
                            onChange={(e) => setRole(e.target.value)}
                        >
                            <option value="citizen">Citizen</option>
                            <option value="official">Municipality Official</option>
                        </select>
                    </div>

                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Email Address</label>
                        <input 
                            type="email" 
                            style={styles.input} 
                            placeholder="name@gmail.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required 
                        />
                    </div>

                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Password</label>
                        <input 
                            type="password" 
                            style={styles.input} 
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required 
                        />
                    </div>

                    <button type="submit" style={styles.button} onClick={handleLogin}>
                        Log In
                    </button>
                </form>

                <p style={styles.footerText}>
                    New to UrbanSync? <Link to="/signup" style={styles.link}>Create Account</Link>
                </p>
                <p style={{marginTop: '10px'}}><Link to="/" style={styles.link}>&larr; Back to Home</Link></p>
            </div>
        </div>
    );
}

export default Login;