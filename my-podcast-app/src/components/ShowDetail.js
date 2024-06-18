// src/components/ShowDetail.js
import React, { useState } from 'react';
import SeasonList from './SeasonList';
import EpisodeList from './EpisodeList';
import './ShowDetail.css'; // Import the CSS for styling

const ShowDetail = ({ show, onBack }) => {
    const [selectedSeason, setSelectedSeason] = useState(null);

    return (
        <div className="show-detail">
            <button className="back-button" onClick={onBack}>Back to Shows</button>
            <img src={show.image} alt={show.title} className="show-detail-image" />
            <h2>{show.title}</h2>
            <p>{show.description}</p>
            <SeasonList seasons={show.seasons} onSeasonSelect={setSelectedSeason} />
            {selectedSeason && (
                <div>
                    <h3>Episodes for {selectedSeason.title}</h3>
                    <EpisodeList episodes={selectedSeason.episodes} />
                </div>
            )}
        </div>
    );
};

export default ShowDetail;
