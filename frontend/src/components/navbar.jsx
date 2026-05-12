import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useNavigate} from "react-router-dom";
import logo from "../assets/logo.png";

function Navbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();
    
    useEffect(() => {
        const user = localStorage.getItem("user");
        if (user) {
            setIsLoggedIn(true);
        } 
    }, []);
    
    const handleLogout = () => {
        const isConfirmed = confirm("Are you sure to logout?");

        if (isConfirmed){
            localStorage.removeItem("user");
            setIsLoggedIn(false); 
            navigate("/");
            window.location.reload();
        }
        
    }

    const styles = {
        navbar: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "30px 60px",
            position: "sticky",
            top: "0px",
            zIndex:1000,
            backgroundColor:"#133215"
        },
        logoContainer: {
            width: "330px" 
        }, 
        logoImg: {
            width: "100%" 
        },
        menu: {
            display: "flex",
            gap: "50px",
            fontSize: "1.3rem",
            listStyle: "none",
            margin: 0
        },
        linkStyle: {
            textDecoration: "none",
            color: "#f3e8d3",
            cursor: "pointer",
            fontWeight: "500"
        }
    };
    return (
        <nav style={styles.navbar}>
            <div style={styles.logoContainer}>
                <img src={logo} alt="UrbanSync Logo" style={styles.logoImg} />
            </div>
            <ul style={styles.menu}>
                <li><Link to="/" style={styles.linkStyle}>Home</Link></li>
                <li><Link to="/howitworks" style={styles.linkStyle}>WorkFlow</Link></li>
                <li><Link to="/aboutus" style={styles.linkStyle}>AboutUs</Link></li>
                {isLoggedIn ? (
                    <li><Link to="/" style={styles.linkStyle} onClick={handleLogout}>Logout</Link></li>
                ) : (
                    <li><Link to="/login" style={styles.linkStyle}>Login</Link></li>
                )}
            </ul>
        </nav>
    )
}
export default Navbar;