import React ,{ useState, useEffect }from "react";
import LiveCamera from "./LiveCamera";
import "./RaiseIssue.css";

function RaiseIssue({ onClose, onReportSubmitted }) {
    const[capturedImage, setCapturedImage] = useState(null);

    const [formData, setFormData] = React.useState({
        category: 'Pothole',
        description: '',
        address: '',
    });

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!capturedImage) {
          alert('Please capture a photo of the issue before submitting.');
          return;
        }
        
        const userString = localStorage.getItem("user");
        if (!userString) {
          alert("User not logged in. Please log in to submit an issue.");
          return;
        }
        const loggedInUser = JSON.parse(userString);
        const userId = loggedInUser.id ||loggedInUser._id;
        if (!userId) {
          alert("User session invalid. Please log out and log back in.");
          return;
        }

        const  data= new FormData();
        data.append('category', formData.category);
        data.append('description', formData.description);
        data.append('address', formData.address);
        data.append('userId', userId);
        try{
          const res = await fetch(capturedImage);
          const blob = await res.blob();
          data.append('image', blob, 'capture.jpg');
        }
        catch(error){
          console.error('image conversion failed:', error);
        }

        try{
          const response =  await fetch('http://localhost:5000/api/reports/add', {
            method: 'POST',
            body: data
          });

        const result = await response.json();

        if(response.ok){
            alert('Issue submitted successfully');
            onClose();
            window.location.reload();
        }else{
            alert('Failed to submit issue', result.message);
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