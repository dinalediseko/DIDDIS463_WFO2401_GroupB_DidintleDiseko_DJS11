// src/components/Error.js

import React from 'react';
import './Error.css'; // Import corresponding CSS file for styling

const Error = ({ message }) => {
    return (
        <div className="error-container">
            <p className="error-message">{message}</p>
        </div>
    );
};

export default Error;
