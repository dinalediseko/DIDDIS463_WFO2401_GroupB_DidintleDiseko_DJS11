// src/components/MediaPlayer.js

import React, { useState } from 'react';
import './MediaPlayer.css';

// MediaPlayer component handles playing media episodes and confirmation modal for closing
const MediaPlayer = ({ episode, onPause }) => {
    const [showConfirm, setShowConfirm] = useState(false); // State to manage visibility of confirmation modal

    if (!episode) {
        return null; // If no episode is provided, return null (component does not render)
    }

    // Function to show the confirmation modal
    const handleClose = () => {
        setShowConfirm(true);
    };

    // Function to confirm closing the episode
    const confirmClose = () => {
        setShowConfirm(false); // Hide the confirmation modal
        onPause(); // Callback function to pause the media playback
    };

    // Function to cancel closing the episode
    const cancelClose = () => {
        setShowConfirm(false); // Hide the confirmation modal
    };

    return (
        <>
            <div className="media-player">
                <div className="media-info">
                    <h4>{episode.title}</h4> 
                </div>
                <div className="media-controls">
                    <audio controls autoPlay> 
                        <source src={episode.file} type="audio/mp3" /> 
                        Your browser does not support the audio element.
                    </audio>
                    <button className="close-button" onClick={handleClose}>Close</button> 
                </div>
            </div>
            {showConfirm && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>Are you sure?</h3>
                        <p>You will lose your progress if you close this episode.</p>
                        <button className="confirm-button" onClick={confirmClose}>Yes, close it</button> 
                        <button className="cancel-button" onClick={cancelClose}>Cancel</button> 
                    </div>
                </div>
            )}
        </>
    );
};

export default MediaPlayer;

