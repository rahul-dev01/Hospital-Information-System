import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL; 

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user", 
  });

  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleToggle = () => {
    setFormData({ ...formData, role: formData.role === "user" ? "admin" : "user" });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${BASE_URL}/auth/register`, formData);
      navigate("/");
    } catch (error) {
      setError("Registration failed");
    }
  };

  return (
    <div>
      <h2>Register</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleRegister}>
        <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />

        {/* Role Toggle Switch */}
        <div>
          <label>User</label>
          <div
            onClick={handleToggle}
            style={{
              display: "inline-block",
              width: "50px",
              height: "25px",
              background: formData.role === "admin" ? "#4CAF50" : "#ccc",
              borderRadius: "25px",
              position: "relative",
              cursor: "pointer",
              transition: "background 0.3s",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "3px",
                left: formData.role === "admin" ? "26px" : "3px",
                width: "20px",
                height: "20px",
                background: "white",
                borderRadius: "50%",
                transition: "left 0.3s",
              }}
            ></div>
          </div>
          <label>Admin</label>
        </div>

        <button type="submit">Register</button>
      </form>

      <p>Already have an account?</p>
      <button onClick={() => navigate("/")}>Go to Login</button>
    </div>
  );
};

export default Register;
