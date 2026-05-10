import React ,{ useState }from "react";
import "./RaiseIssue.css";

function RaiseIssue({ onClose }) {
    const [formData, setFormData] = React.useState({
        category: 'pothole',
        description: '',
        address: '',
        image: null
    });

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleFileChange = (e) => {
        setFormData({...formData, image: e.target.files[0]});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Issue Submitted:", formData);
        alert("Issue submitted successfully!");
        onClose();
    };

  return (
    <div className="modal-overlay">
      <div id="card" className="modal-card">
        <button id="close-btn" onClick={onClose}>&times;</button>
        <header id="form-header">
          <h2 id="title">Raise an Issue</h2>
          <p id="subtitle">Report urban problems to your local municipality</p>
        </header>
        <form onSubmit={handleSubmit}>

          <div className="input-group">
            <label>Issue Category</label>
            <select name="category" className="input" value={formData.category} onChange={handleChange}>
              <option value="Pothole">Pothole</option>
              <option value="Drainage">Drainage</option>
              <option value="Street Lights">Street Lights</option>
              <option value="Barking Dogs">Barking Dogs</option>
              <option value="Water Problem">Water Problem</option>
            </select>
          </div>

          <div className="input-group">
            <label>Description</label>
            <textarea
              name="description"
              className="input textarea"
              placeholder="Describe the issue in detail"
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <div className="input-group">
            <label>Address</label>
            <textarea
              name="address"
              className="input textarea"
              placeholder="Enter landmarks or exact address"
              required
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="input-group">
            <label className="file-label">
              <span>Upload Image</span>
              <input type="file" className="file-input" onChange={handleFileChange} accept="image/*" />
            </label>
            {formData.image && <p className="file-name">Selected:{formData.image.name}</p>}
          </div>

          <div id="btn-container">
            <button type="submit" className="submit-btn">Submit Issue</button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default RaiseIssue;