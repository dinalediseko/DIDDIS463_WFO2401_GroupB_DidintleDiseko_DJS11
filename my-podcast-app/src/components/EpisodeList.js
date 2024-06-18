// src/components/EpisodeList.js
import React from 'react';

const EpisodeList = ({ episodes }) => {
    return (
        <div className="episode-list">
            <h2>Episodes</h2>
            {episodes.map(episode => (
                <div key={episode.id}>
                    <h3>{episode.title}</h3>
                    <p>{episode.description}</p>
                    {/* Add audio player or link to listen to the episode */}
                </div>
            ))}
        </div>
    );
};

export default EpisodeList;
