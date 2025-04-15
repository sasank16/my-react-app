import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 

const Login = () => {
  const navigate = useNavigate(); 
  const [showPassword, setShowPassword] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userError, setUserError] = useState("");
  const [passError, setPassError] = useState("");

  const images = ["pic5.jpg", "pic6.jpg", "pic7.jpg", "pic8.jpg"];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const validateLogin = () => {
    const usernameRegex = /^[a-zA-Z0-9_]{5,20}$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    setUserError("");
    setPassError("");

    if (!usernameRegex.test(username)) {
      setUserError("Username must be 5-20 characters (letters, numbers, underscore).");
      return;
    }
    if (!passwordRegex.test(password)) {
      setPassError("Password must be 8+ characters, 1 uppercase, 1 number, 1 special character.");
      return;
    }

    
    navigate("/main");
  };

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh",
      color: "white",
      fontFamily: "Arial, sans-serif",
      position: "relative"
    }}>
      
      <div style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        overflow: "hidden",
        zIndex: -1
      }}>
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt="Slide"
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: index === currentSlide ? 1 : 0,
              transition: "opacity 2s ease-in-out"
            }}
          />
        ))}
      </div>

      
      <header style={{
        width: "100%",
        padding: "15px",
        textAlign: "center",
        background: "black",
        color: "white",
        fontSize: "20px",
        fontWeight: "bold",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 1000,
      }}>
        Welcome to Task Manager
      </header>

      
      <div style={{
        background: "white",
        padding: "40px",
        borderRadius: "10px",
        boxShadow: "0 0 15px rgba(0, 0, 0, 0.2)",
        width: "400px",
        textAlign: "center",
        marginTop: "80px",
      }}>
        <h2 style={{ color: "black" }}>Login</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <label style={{ color: "black", textAlign: "left" }}>Username:</label>
          <input
            type="text"
            placeholder="Enter Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
          />
          <span style={{ color: "red", fontSize: "12px" }}>{userError}</span>

          <label style={{ color: "black", textAlign: "left" }}>Password:</label>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
          />
          <span style={{ color: "red", fontSize: "12px" }}>{passError}</span>

          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <input type="checkbox" onClick={() => setShowPassword(!showPassword)} />
            <span style={{ color: "black" }}>Show Password</span>
          </div>

          <button 
            onClick={validateLogin}
            style={{
              background: "#007BFF",
              color: "white",
              padding: "12px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "16px",
              transition: "0.3s",
            }}>
            Login →
          </button>
        </div>
      </div>

      
      <div style={{
        background: "white",
        padding: "20px",
        borderRadius: "10px",
        width: "350px",
        textAlign: "left",
        marginTop: "20px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
        color: "black"
      }}>
        <strong>Password Requirements:</strong>
        <ul style={{ paddingLeft: "20px", marginTop: "10px" }}>
          <li>At least 8 characters long</li>
          <li>Contains at least one uppercase letter</li>
          <li>Contains at least one number</li>
          <li>Contains at least one special character (@$!%*?&)</li>
        </ul>
      </div>

      
      <div style={{
        background: "#3a3a3a",
        padding: "40px",
        borderRadius: "10px",
        width: "80%",
        maxWidth: "900px",
        marginTop: "30px",
        textAlign: "center",
        color: "white",
      }}>
        <h2>About Us</h2>
        <p>
          Welcome to <span style={{ color: "#FFD700", fontWeight: "bold" }}>Task Manager</span>,
          your go-to platform for organizing and managing your daily tasks efficiently.
        </p>
        <p>
          Our mission is to enhance productivity by providing easy-to-use tools for task tracking,
          scheduling, and time management.
        </p>
        <p>
          Whether you're a professional, student, or entrepreneur,
          <span style={{ color: "#FFD700", fontWeight: "bold" }}> Task Manager</span> helps you stay
          focused, meet deadlines, and achieve your goals.
        </p>
        <img src="taskmanager.png" alt="Task Manager" style={{ width: "150px", marginTop: "10px" }} />
      </div>

      
      <footer style={{
        width: "100%",
        padding: "10px",
        textAlign: "center",
        background: "black",
        color: "white",
        fontSize: "14px",
        position: "fixed",
        bottom: 0,
        left: 0,
        zIndex: 1000,
      }}>
        © 2025 S&S All rights reserved
      </footer>
    </div>
  );
};

export default Login;
