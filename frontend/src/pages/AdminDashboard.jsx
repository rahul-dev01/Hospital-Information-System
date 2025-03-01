import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "./AdminDashboard.css"; // Import CSS file

const BASE_URL = import.meta.env.VITE_BASE_URL; 

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [hospitals, setHospitals] = useState([]);

  // Fetch hospitals when component mounts
  useEffect(() => {
    fetchHospitals();
  }, []);

  const fetchHospitals = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/hospitals`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setHospitals(res.data);
    } catch (error) {
      console.error("Error fetching hospitals", error);
    }
  };

  // Delete hospital
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/hospitals/delete?id=${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      alert("Hospital deleted successfully!");
      fetchHospitals(); // Refresh list
    } catch (error) {
      console.error("Error deleting hospital", error);
      alert("Failed to delete hospital.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <p>Welcome, Admin! You can manage hospitals here.</p>

      <div className="admin-buttons">
        <button onClick={() => navigate("/add-hospital")}>Add New Hospital</button>
        <button onClick={handleLogout}>Logout</button>
      </div>

      {/* Hospital List */}
      <h2>Hospital List</h2>
      <div className="hospital-list">
        {hospitals.length > 0 ? (
          hospitals.map((hospital) => (
            <div key={hospital._id} className="hospital-card">
              <img
                src={hospital.imageUrl || "https://via.placeholder.com/300"}
                alt={hospital.name}
                className="hospital-image"
              />
              <h3>{hospital.name}</h3>
              <p><strong>City:</strong> {hospital.city}</p>
              <p><strong>Specialities:</strong> {hospital.specialities.join(", ")}</p>
              <p><strong>Rating:</strong> ⭐ {hospital.rating}</p>
              <div className="hospital-actions">
                {/* Pass hospital data when navigating to edit page */}
                <button onClick={() => navigate(`/edit-hospital/${hospital._id}`, { state: hospital })}>Edit</button>
                <button className="delete-btn" onClick={() => handleDelete(hospital._id)}>Delete</button>
              </div>
            </div>
          ))
        ) : (
          <p>No hospitals found.</p>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
