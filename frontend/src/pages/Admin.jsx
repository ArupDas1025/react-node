import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Admin = () => {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("http://localhost:5000/admin", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setMessage(res.data.message))
      .catch(() => {
        alert("Access Denied");
        navigate("/login"); // Redirect to login if not admin
      });
  }, [navigate]);

  return (
    <div>
      <h2>Admin Panel</h2>
      <p>{message}</p>
      <button onClick={() => navigate("/")}>Go Home</button>
    </div>
  );
};

export default Admin;
