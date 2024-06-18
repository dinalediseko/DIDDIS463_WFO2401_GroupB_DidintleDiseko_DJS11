// src/components/SeasonList.js
import React from 'react';

const SeasonList = ({ seasons, onSeasonSelect }) => {
    return (
        <div className="season-list">
            <h2>Seasons</h2>
            {seasons.map(season => (
                <div key={season.id} onClick={() => onSeasonSelect(season.id)}>
                    <h3>{season.title}</h3>
                    <p>{season.description}</p>
                    {/* Add more season details as needed */}
                </div>
            ))}
        </div>
    );
};

export default SeasonList;
