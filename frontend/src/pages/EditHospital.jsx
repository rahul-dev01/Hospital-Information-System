import { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL; 

const EditHospital = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams(); // Get hospital ID from URL params
  const hospitalData = location.state || {}; // Get hospital data from navigation state

  const [hospital, setHospital] = useState(hospitalData);

  // Fetch hospital details if state is empty
  useEffect(() => {
    if (!hospitalData.name) {
      fetchHospitalDetails();
    }
  }, []);

  const fetchHospitalDetails = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/hospitals/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setHospital(res.data);
    } catch (error) {
      console.error("Error fetching hospital details", error);
      alert("Failed to load hospital details.");
    }
  };

  const handleChange = (e) => {
    setHospital({ ...hospital, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${BASE_URL}/hospitals/update?id=${hospital._id}`, hospital, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      alert("Hospital updated successfully!");
      navigate("/admin-dashboard"); // Redirect to Admin Dashboard
    } catch (error) {
      console.error("Error updating hospital", error);
      alert("Failed to update hospital.");
    }
  };

  return (
    <div>
      <h2>Edit Hospital</h2>
      <form onSubmit={handleUpdate}>
        <input type="text" name="name" placeholder="Hospital Name" value={hospital.name || ""} onChange={handleChange} required />
        <input type="text" name="city" placeholder="City" value={hospital.city || ""} onChange={handleChange} required />
        <input type="text" name="imageUrl" placeholder="Image URL" value={hospital.imageUrl || ""} onChange={handleChange} />
        <input type="text" name="specialities" placeholder="Specialities (comma-separated)" value={hospital.specialities || ""} onChange={handleChange} required />
        <input type="number" name="rating" placeholder="Rating" value={hospital.rating || ""} onChange={handleChange} />
        <input type="text" name="description" placeholder="Description" value={hospital.description || ""} onChange={handleChange} />
        <input type="number" name="numberOfDoctors" placeholder="Number of Doctors" value={hospital.numberOfDoctors || ""} onChange={handleChange} />
        <input type="number" name="numberOfDepartments" placeholder="Number of Departments" value={hospital.numberOfDepartments || ""} onChange={handleChange} />
        <button type="submit">Update Hospital</button>
      </form>
    </div>
  );
};

export default EditHospital;
