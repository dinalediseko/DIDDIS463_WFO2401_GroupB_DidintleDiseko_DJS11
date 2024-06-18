// src/components/ShowDetail.js
import React, { useState, useEffect } from 'react';
import SeasonList from './SeasonList';
import EpisodeList from './EpisodeList';

const ShowDetail = ({ show }) => {
    const [selectedSeason, setSelectedSeason] = useState(null);

    const handleSeasonSelect = (seasonId) => {
        setSelectedSeason(seasonId);
    };

    return (
        <div className="show-detail">
            <h2>{show.title}</h2>
            <p>{show.description}</p>
            <SeasonList seasons={show.seasons} onSeasonSelect={handleSeasonSelect} />
            {selectedSeason && (
                <EpisodeList episodes={show.seasons.find(season => season.id === selectedSeason).episodes} />
            )}
        </div>
    );
};

export default ShowDetail;
