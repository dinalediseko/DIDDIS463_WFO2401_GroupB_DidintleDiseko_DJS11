// src/components/EpisodeList.js
import React from 'react';
import './EpisodeList.css'; // Import the CSS for styling

const EpisodeList = ({ episodes }) => {
    return (
        <div className="episode-list">
            {episodes.map(episode => (
                <div key={episode.id} className="episode-card">
                    <h5>{episode.title}</h5>
                    <p>{episode.description}</p>
                    <audio controls>
                        <source src={episode.audioUrl} type="audio/mpeg" />
                        Your browser does not support the audio element.
                    </audio>
                </div>
            ))}
        </div>
    );
};

export default EpisodeList;

