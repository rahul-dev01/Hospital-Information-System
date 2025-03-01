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
      setHospitals(res.data);
      setError("");
    } catch (err) {
      setError("Failed to fetch hospitals");
    }
    setLoading(false);
  };

  // Fetch hospitals when city is updated
  useEffect(() => {
    fetchHospitals();
  }, [city]);

  return (
    <div className="dashboard-container">
      <h1>User Dashboard</h1>
      <p>Welcome to the hospital management dashboard.</p>

      {/* Filter by City */}
      <input
        type="text"
        placeholder="Search by city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="search-input"
      />

      {/* Hospital List in Card Format */}
      {loading && <p>Loading hospitals...</p>}
      {error && <p className="error-message">{error}</p>}

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
          <p>No hospitals found.</p>
        )}
      </div>

      {/* Logout Button */}
      <button onClick={handleLogout} className="logout-button">Logout</button>
    </div>
  );
};

export default UserDashboard;
