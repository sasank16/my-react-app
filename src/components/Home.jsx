import React from "react";

const Home = () => {
  return (
    <div
      style={{
        background: "url('pic9.jpg') no-repeat center center/cover",
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "black",
        textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)",
      }}
    >
      <h1>Welcome to the Task Manager</h1>
      <p>Stay organized and productive!</p>
    </div>
  );
};

export default Home;
