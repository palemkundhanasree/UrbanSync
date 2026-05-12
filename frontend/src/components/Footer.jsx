import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="app-footer">
        <div className="footer-content">
            <div className="footer-section">
                <h3 className="footer-logo">Urban<span>Sync</span></h3>
                <p className="footer-tagline">Building better communities, one report at a time.</p>
            </div>

            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} UrbanSync Municipality Portal. All rights reserved.</p>
            </div>
        </div>
    </footer>
  );
};

export default Footer;