// src/components/SeasonList.js

import React from 'react';

const SeasonList = ({ seasons, onSelectSeason }) => {
    return (
        <div className="season-list">
            <h2>Seasons</h2>
            {seasons.map(season => (
                <div key={season.id} className="season-card" onClick={() => onSelectSeason(season.id)}>
                    <img src={season.imageUrl} alt={`Season ${season.title}`} />
                    <h5>{season.title}</h5>
                    <p>{season.episodes.length} Episodes</p>
                </div>
            ))}
        </div>
    );
};

export default SeasonList;

