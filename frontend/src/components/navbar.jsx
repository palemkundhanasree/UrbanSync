import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useNavigate} from "react-router-dom";
import logo from "../assets/logo.png";

function Navbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const navigate = useNavigate();
    
    useEffect(() => {
        const user = localStorage.getItem("user");
        if (user) {
            setIsLoggedIn(true);
        } 
    }, []);
    useEffect(() => {
    const handleResize = () => {
        setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => {
        window.removeEventListener("resize", handleResize);
    };
}, []);
    
    const handleLogout = () => {
        localStorage.removeItem("user");
        setIsLoggedIn(false);
        alert("Logged out successfully!");
        navigate("/");
        setMenuOpen(false);
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
            margin: 0,
             alignItems: "center"
        },
        linkStyle: {
            textDecoration: "none",
            color: "#f3e8d3",
            cursor: "pointer",
            fontWeight: "500"
        },
         hamburger: {
            display: "none",
            fontSize: "2rem",
            background: "none",
            border: "none",
            color: "#f3e8d3",
            cursor: "pointer",
            marginLeft: "auto"
        },
        mobileMenuOpen: {
            right: "0"
        },
        mobileMenu: {
            position: "fixed",
            top: 0,
            right: menuOpen ? "0" : "-260px",
            width: "25%",
            minWidth: "220px",
            height: "100vh",
            backgroundColor: "#1c1c1c",
            display: "flex",
            flexDirection: "column",
            padding: "80px 20px",
            gap: "30px",
            transition: "0.3s ease",
            zIndex: 2000
        },
        overlay: {
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.5)",
            zIndex: 1500
        }
    
    };
    
    if (isMobile) {
    styles.navbar = {
        ...styles.navbar,
        padding: "20px"
    };
    styles.logoContainer = {
        width: "160px"
    };
    styles.hamburger = {
        ...styles.hamburger,
        display: "block"
    };
    styles.menu = {
        display: "none"
    };
   }
    return (
        <>
        <nav style={styles.navbar}>
            <div style={styles.logoContainer}>
                <img src={logo} alt="UrbanSync Logo" style={styles.logoImg} />
            </div>
            <button style={styles.hamburger} onClick={() => setMenuOpen(!menuOpen)}>☰</button>
           <ul style={{...styles.menu,...(menuOpen ? styles.mobileMenuOpen : {})}}>
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
            {
                menuOpen && (
                    <div
                        style={styles.overlay}
                        onClick={() => setMenuOpen(false)}
                    ></div>
                )
            }
         {
        menuOpen&&(
            <div style={styles.mobileMenu}>
                <Link to="/"style={styles.linkStyle}  onClick={() => setMenuOpen(false)}>Home</Link>
                <Link to="/howitworks"style={styles.linkStyle}onClick={() => setMenuOpen(false)} >WorkFlow</Link>
                <Link to="/aboutus" style={styles.linkStyle}onClick={() => setMenuOpen(false)} > AboutUs</Link>
                {isLoggedIn ? (
                    <Link to="/"style={styles.linkStyle}onClick={handleLogout} >Logout</Link>
                ) : (
                    <Link to="/login"style={styles.linkStyle} onClick={() => setMenuOpen(false)}>Login</Link>
                )}
            </div>
    )
}
            </>
    );
    
}

export default Navbar;