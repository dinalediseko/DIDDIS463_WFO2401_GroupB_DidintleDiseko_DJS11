// src/components/ShowDetail.js

import React, { useState, useEffect } from 'react';
import './ShowDetail.css';
import { fetchSeasons, fetchEpisodes } from '../services/api';
import ReactPlayer from 'react-player'; // Example library for media playback

const ShowDetail = ({ show }) => {
    const [seasons, setSeasons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedSeason, setSelectedSeason] = useState(null); // State to hold the selected season
    const [episodes, setEpisodes] = useState([]); // State to hold episodes of the selected season
    const [playing, setPlaying] = useState(false); // State to manage playback
    const [currentEpisode, setCurrentEpisode] = useState(null); // State to track current episode for playback

    useEffect(() => {
        const fetchData = async () => {
            try {
                const seasonsData = await fetchSeasons(show.id);
                setSeasons(seasonsData);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchData();
    }, [show.id]);

    const fetchAndDisplayEpisodes = async (seasonId) => {
        try {
            const episodesData = await fetchEpisodes(seasonId);
            console.log('Episodes data:', episodesData); // Debug log
            setEpisodes(episodesData); // Set episodes data for the selected season
            setSelectedSeason(seasonId); // Set the selected season
        } catch (error) {
            console.error('Error loading episodes:', error);
            // Handle error loading episodes
        }
    };

    const handlePlayPause = (episodeId) => {
        if (currentEpisode === episodeId) {
            setPlaying(!playing); // Toggle play/pause if the same episode is clicked again
        } else {
            setCurrentEpisode(episodeId); // Set the current episode for playback
            setPlaying(true); // Start playing the episode
        }
    };

    return (
        <div className="show-detail">
            <div className="show-header">
                <img src={show.image} alt={show.title} className="show-image" />
                <div className="show-info">
                    <h2>{show.title}</h2>
                    <p>{show.description}</p>
                </div>
            </div>
            <h3>Seasons:</h3>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>Error: {error}</p>
            ) : seasons.length === 0 ? (
                <p>No seasons available.</p>
            ) : (
                <div className="seasons">
                    {seasons.map((season) => (
                        <div key={season.id} className="season-card">
                            <img src={season.image} alt={`Season ${season.title}`} className="season-image" />
                            <div className="season-details">
                                <h4>{season.title}</h4>
                                <p>{season.description}</p>
                                <p>{season.episodes.length} Episodes</p>
                                <button onClick={() => fetchAndDisplayEpisodes(season.id)}>Episodes</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {selectedSeason && (
                <div className="episodes">
                    <h3>Episodes of Season {selectedSeason}</h3>
                    <ul>
                        {episodes.map((episode) => (
                            <li key={episode.id}>
                                {episode.title}
                                <button onClick={() => handlePlayPause(episode.id)}>
                                    {currentEpisode === episode.id && playing ? 'Pause' : 'Play'}
                                </button>
                                {currentEpisode === episode.id && (
                                    <ReactPlayer
                                        url={episode.file} // Replace with actual episode file URL
                                        playing={playing}
                                        controls={true}
                                        width="100%"
                                    />
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default ShowDetail;