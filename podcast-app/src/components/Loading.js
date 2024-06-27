// src/components/Loading.js

import React from "react";
import "./Loading.css"; // Import CSS file for Loading component

// Loading component displays a loading animation
const Loading = () => {
  return (
    <div className="loading-overlay">
      <div className="loading-container">
        <div className="loading-dot"></div> 
        <div className="loading-dot"></div> 
        <div className="loading-dot"></div> 
      </div>
    </div>
  );
};

export default Loading;
