import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <div>
      <h2>User Panel</h2>
      <p>{message}</p>
      <button onClick={() => navigate("/")}>Go Home</button>
    </div>
    </div>
  );
};

export default Home;
