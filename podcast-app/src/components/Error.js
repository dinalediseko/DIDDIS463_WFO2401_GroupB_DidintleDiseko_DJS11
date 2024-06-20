// src/components/Error.js

import React from 'react';

const Error = ({ message }) => {
    return (
        <div className="error">
            <p>{message}</p>
        </div>
    );
};

export default Error;
