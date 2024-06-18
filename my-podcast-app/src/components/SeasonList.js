// src/components/SeasonList.js
import React from 'react';
import './SeasonList.css'; // Import the CSS for styling

const SeasonList = ({ seasons, onSeasonSelect }) => {
    return (
        <div className="season-list">
            {seasons.map(season => (
                <div key={season.id} className="season-card" onClick={() => onSeasonSelect(season)}>
                    <img src={season.image} alt={season.title} className="season-image" />
                    <h4>{season.title}</h4>
                    <p>{season.description}</p>
                </div>
            ))}
        </div>
    );
};

export default SeasonList;

