import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./RaiseIssue.css";

function RaiseIssue() {
     const navigate = useNavigate();
    const handleSubmit = () => {
        navigate("/dashboard");
    };
  return (
    <div id="container">
      <div id="card">
        <h2 id="title">Raise Issue...!!!</h2>
        <div className="input-group">
          <label>Category:</label>
          <select className="input">
            <option>Pothole</option>
            <option>Drainage</option>
            <option>Street Lights</option>
            <option>Barking Dogs</option>
            <option>Water Problem</option>
          </select>
        </div>
        <div className="input-group">
          <label>Description:</label>
          <textarea
            className="input textarea"
            placeholder="Enter issue description"
          ></textarea>
        </div>
        <div className="input-group">
          <label>Address:</label>
          <textarea
            className="input textarea"
            placeholder="Enter address"
          ></textarea>
        </div>
        <div className="input-group">
          <label>Upload Image:</label>
          <input type="file" className="input file-input" />
        </div>
        <div id="btn-container">
          <button onlick={handleSubmit}>Submit Issue</button>
        </div>

        <div id="link">
          <Link to="/citizen-dashboard">← Back to Home</Link>
        </div>
      </div>
    </div>
  );
}

export default RaiseIssue;