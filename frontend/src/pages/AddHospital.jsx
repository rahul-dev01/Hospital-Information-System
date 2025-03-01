import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL; 

const AddHospital = () => {
  const [hospital, setHospital] = useState({
    name: "",
    city: "",
    imageUrl: "",
    specialities: "",
    rating: "",
    description: "",
    numberOfDoctors: "",
    numberOfDepartments: "",
  });

  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    setHospital({ ...hospital, [e.target.name]: e.target.value });
  };

  // Add a new hospital
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${BASE_URL}/hospitals/create`, hospital, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      alert("Hospital added successfully!");
      navigate("/admin-dashboard"); // Redirect to admin dashboard after adding
    } catch (error) {
      console.error("Error adding hospital", error);
      alert("Failed to add hospital.");
    }
  };

  return (
    <div>
      <h2>Add Hospital</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Hospital Name" value={hospital.name} onChange={handleChange} required />
        <input type="text" name="city" placeholder="City" value={hospital.city} onChange={handleChange} required />
        <input type="text" name="imageUrl" placeholder="Image URL" value={hospital.imageUrl} onChange={handleChange} />
        <input type="text" name="specialities" placeholder="Specialities (comma-separated)" value={hospital.specialities} onChange={handleChange} required />
        <input type="number" name="rating" placeholder="Rating" value={hospital.rating} onChange={handleChange} />
        <input type="text" name="description" placeholder="Description" value={hospital.description} onChange={handleChange} />
        <input type="number" name="numberOfDoctors" placeholder="Number of Doctors" value={hospital.numberOfDoctors} onChange={handleChange} />
        <input type="number" name="numberOfDepartments" placeholder="Number of Departments" value={hospital.numberOfDepartments} onChange={handleChange} />
        <button type="submit">Add Hospital</button>
      </form>
    </div>
  );
};

export default AddHospital;
