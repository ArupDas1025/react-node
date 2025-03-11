import React from "react";
import { Link, useNavigate } from "react-router-dom"; // ✅ Import useNavigate

const Home = () => {
  const navigate = useNavigate(); // ✅ Use useNavigate
  const message = "Welcome to Home!"; // ✅ Defined message

  return (
    <div>
      <h2>User Panel</h2>
      <p>{message}</p>
      <button onClick={() => navigate("/")}>Go Home</button> {/* ✅ Fixed navigate */}
    </div>
  );
};

export default Home;
