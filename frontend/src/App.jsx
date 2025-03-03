import React from "react";
import { Link } from "react-router-dom";

function App() {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>🏠 Welcome to the Home Page</h1>
      <p>Please login or register to continue.</p>

      <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
        <Link to="/login">
          <button style={{ padding: "10px 20px", fontSize: "16px" }}>Login</button>
        </Link>
        <Link to="/register">
          <button style={{ padding: "10px 20px", fontSize: "16px" }}>Register</button>
        </Link>
      </div>
    </div>
  );
}

export default App;
