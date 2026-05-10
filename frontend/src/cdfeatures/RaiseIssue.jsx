import React ,{ useState, useEffect }from "react";
import LiveCamera from "./LiveCamera";
import "./RaiseIssue.css";

function RaiseIssue({ onClose, onReportSubmitted }) {
    const[capturedImage, setCapturedImage] = useState(null);

    const [formData, setFormData] = React.useState({
        category: 'pothole',
        description: '',
        address: '',
    });

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const loggedInUser = JSON.parse(localStorage.getItem('user'));
        const userId = loggedInUser ? loggedInUser._id : null;

        const reportData = {  
            category: formData.category,
            description: formData.description,
            address: formData.address,
            Image: capturedImage,
            userId: userId
        };

        try{
          const response =  await fetch('http://localhost:5000/api/reports/add', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(reportData)
        });

        const data = await response.json();

        if(response.ok){
            alert('Issue submitted successfully');
            onClose();
            window.location.reload();
        }else{
            alert('Failed to submit issue',data.message);
        }
      } 
      catch (error) {
          console.error('Error to submit issue:', error);
          alert('An error occurred while submitting the issue: ', error.message);
      }
    };

    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);

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
            <label>Evidence(Live Photo)</label>
            <LiveCamera 
              onCapture={(imageData) => setCapturedImage(imageData)}
              onCancel={() => setCapturedImage(null)}
            />
            {capturedImage && <p className="file-name" style={{textAlign: 'center', color: '#baf087'}}>✅ Live Proof Attached</p>}
          </div>

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

          <div>
            <button type="submit" className="submit-btn">Submit Issue</button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default RaiseIssue;