import React ,{ useState, useEffect }from "react";
import LiveCamera from "./LiveCamera";
import "./RaiseIssue.css";
import IssueMap from "../cdfeatures/IssueMap";
import {MapContainer,TileLayer,Marker,Popup,useMap,useMapEvents} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",

  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",

  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

function AutoZoomToLocation({ coordinates }) {
    const map = useMap();
    useEffect(() => {
        if (
            coordinates.latitude &&
            coordinates.longitude )
             {
            map.flyTo(
                [
                    coordinates.latitude,
                    coordinates.longitude
                ],
                18,
                {
                    duration: 2
                }
            );
        }
    }, [coordinates, map]);
    return null;
}
function MapClickHandler({setCoordinates,setFormData})
 {
    useMapEvents({
        click: async (e) => {
            const lat = e.latlng.lat;
            const lng = e.latlng.lng;
            // move marker
            setCoordinates({
                latitude: lat,
                longitude: lng
            });
            try {
                // reverse geocoding
                const response = await fetch(
                    `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
                );
                const data = await response.json();
                // update textarea
                setFormData((prev) => ({
                    ...prev,
                    address: data.display_name || ""
                }));
            } catch (error) {
                console.log("Error fetching address:", error);
            }
        }
    });
    return null;
}
function RaiseIssue({ onClose, onReportSubmitted }) {
    const[capturedImage, setCapturedImage] = useState(null);
    const[loadingLocation, setLoadingLocation]=useState(false);
     const [reports, setReports] = useState([]);
     const [showMap, setShowMap] = useState(false);
    const[coordinates,setCoordinates]=useState({
        latitude:null,
        longitude:null
    });

    const [formData, setFormData] = React.useState({
        category: 'Pothole',
        description: '',
        address: '',
    });

// Function to get user's current location 
const getCurrentLocation = () => {
    if (!navigator.geolocation) {
        alert("Geolocation is not supported by your browser");
        return;
    }
    setLoadingLocation(true);
    navigator.geolocation.getCurrentPosition(
        async (position) => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            setCoordinates({
                latitude: lat,
                longitude: lng
            });
            setShowMap(true);
            try {
                // Reverse Geocoding API
                const response = await fetch(
                    `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
                );
                const data = await response.json();
                setFormData((prev) => ({
                    ...prev,
                    address: data.display_name || ""
                }));
            } catch (error) {
                console.log("Error fetching address:", error);
            }
            setLoadingLocation(false);
        },
        (error) => {
            console.log(error);
            alert("Unable to fetch location");
            setLoadingLocation(false);
        }
    );
};

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
        data.append('latitude', coordinates.latitude);
        data.append('longitude', coordinates.longitude);
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
            onReportSubmitted();
            onClose();
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
            <button type="button" onClick={getCurrentLocation} style={{ marginBottom: "10px", padding: "8px 14px",
             borderRadius: "8px", border: "none", backgroundColor: "#baf087",cursor: "pointer",fontWeight: "bold" }}>
            {loadingLocation ? "Fetching Location..." : "Use Current Location"}
            </button>
            <div className="input-group">
           {
            showMap && (
           <MapContainer
            center={[17.0005, 81.8040]}
            zoom={13}
            style={{height: "300px",width: "100%",borderRadius: "12px",marginBottom: "20px"}}>
            <TileLayer
                attribution='&copy; OpenStreetMap contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <AutoZoomToLocation coordinates={coordinates} />
       <MapClickHandler
                setCoordinates={setCoordinates}
                setFormData={setFormData}
            />
            {
                coordinates.latitude &&
                coordinates.longitude && (
                    <Marker
                        position={[
                            coordinates.latitude,
                            coordinates.longitude]}>
                        <Popup>
                            Current Location
                        </Popup>
                    </Marker>
                )
            }
         </MapContainer>)}
          </div>
            <textarea name="address" className="input textarea" placeholder="Enter landmarks or exact address" required
             value={formData.address}onChange={handleChange} ></textarea>  
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