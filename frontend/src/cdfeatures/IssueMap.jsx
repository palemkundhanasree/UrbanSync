import React from "react";

import {
    MapContainer,
    TileLayer,
    Marker,
    Popup
} from "react-leaflet";
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

function IssueMap({ reports }) {
    return (
        <MapContainer
            center={[17.0005, 81.8040]}
            zoom={13}
            style={{
                height: "500px",
                width: "100%",
                borderRadius: "12px"
            }}
        >
            <TileLayer
                attribution='&copy; OpenStreetMap contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {
                reports.map((report) => (

                    report.latitude &&
                    report.longitude && (

                        <Marker
                            key={report._id}
                            position={[
                                report.latitude,
                                report.longitude
                            ]}
                        >
                            <Popup>

                                <h3>{report.category}</h3>

                                <p>{report.description}</p>

                                <p>Status: {report.status}</p>

                                <p>{report.address}</p>

                            </Popup>
                        </Marker>
                    )
                ))
            }
        </MapContainer>
    );
}

export default IssueMap;