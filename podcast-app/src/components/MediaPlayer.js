// src/components/MediaPlayer.js

import React, { useState } from 'react';
import './MediaPlayer.css';

const MediaPlayer = ({ episode, onPause }) => {
    const [showConfirm, setShowConfirm] = useState(false);

    if (!episode) {
        return null;
    }

    const handleClose = () => {
        setShowConfirm(true);
    };

    const confirmClose = () => {
        setShowConfirm(false);
        onPause();
    };

    const cancelClose = () => {
        setShowConfirm(false);
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

