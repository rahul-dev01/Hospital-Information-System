import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./UserDashboard.css";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const UserDashboard = () => {
  const navigate = useNavigate();
  const [hospitals, setHospitals] = useState([]);
  const [city, setCity] = useState(""); // Filter by city
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  // Fetch hospitals based on city (case-insensitive)
  const fetchHospitals = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/hospitals?city=${city.toLowerCase()}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      if (res.data.length === 0) {
        setHospitals([]); // Clear hospitals list
        setError("No hospitals found!");
      } else {
        setHospitals(res.data);
        setError(""); // Clear previous error message
      }
    } catch (err) {
      setHospitals([]); // Ensure hospitals array is empty on error
      
    }
    setLoading(false);
  };

  // Fetch hospitals when city is updated
  useEffect(() => {
    fetchHospitals();
  }, [city]);

  return (
    <div className="dashboard-container">
      
      {/* User Top Bar */}
      <div className="user-top-bar">
        <h1>User Dashboard</h1>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </div>

      <p className="welcome-message">🏥 Welcome to the <strong>Hospital Management Dashboard</strong>. Find the best hospitals in your city with ease!</p>

      {/* Search Input */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search hospitals by city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="search-input"
        />
      </div>

      {/* Loading and Error Messages */}
      {loading && <p className="loading-text">Loading hospitals...</p>}
      {error && <p className="error-message">{error}</p>}

      {/* Hospital List */}
      <div className="hospital-grid">
        {hospitals.length > 0 ? (
          hospitals.map((hospital) => (
            <div key={hospital._id} className="hospital-card">
              <img src={hospital.imageUrl || "https://via.placeholder.com/300"} alt={hospital.name} />
              <h3>{hospital.name}</h3>
              <p><strong>City:</strong> {hospital.city}</p>
              <p><strong>Specialities:</strong> {hospital.specialities.join(", ")}</p>
              <p><strong>Rating:</strong> ⭐ {hospital.rating}</p>
            </div>
          ))
        ) : (
          !loading && <p className="no-hospitals-text">No hospitals found.</p>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
