// src/components/Error.js

import React from 'react';
import './Error.css'; // Import the CSS for error animation

const Error = ({ message }) => {
    return (
        <div className="error">
            <p>{message}</p>
        </div>
    );
};

export default Error;
