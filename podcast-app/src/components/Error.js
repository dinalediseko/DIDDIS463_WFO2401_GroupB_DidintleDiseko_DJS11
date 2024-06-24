// src/components/Error.js

import React from 'react';
import './Error.css'; // Import corresponding CSS file for styling

// Error component displays an error message passed as a prop
const Error = ({ message }) => {
    return (
        <div className="error-container">
            <p className="error-message">{message}</p> 
        </div>
    );
};

export default Error;
