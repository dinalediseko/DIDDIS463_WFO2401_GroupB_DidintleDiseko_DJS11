import React, { useState, useEffect } from 'react';
import './ShowDetail.css';
import { fetchSeasons, fetchEpisodes } from '../services/api';
import MediaPlayer from './MediaPlayer';

const ShowDetail = ({ show }) => {
    const [seasons, setSeasons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentEpisode, setCurrentEpisode] = useState(null);

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

    const fetchAndSetEpisodes = async (seasonId) => {
        try {
            const episodesData = await fetchEpisodes(seasonId);
            const updatedSeasons = seasons.map(season =>
                season.id === seasonId ? { ...season, episodes: episodesData } : season
            );
            setSeasons(updatedSeasons);
        } catch (error) {
            console.error(`Error fetching episodes for season ${seasonId}:`, error);
            setError(`Error fetching episodes for season ${seasonId}: ${error.message}`);
        }
    };

    const handleEpisodePlay = (episode) => {
        if (currentEpisode) {
            const confirmChange = window.confirm('Are you sure you want to stop the current episode? Your progress will be lost.');
            if (!confirmChange) {
                return;
            }
        }
        setCurrentEpisode(episode);
    };

    const handleEpisodePause = () => {
        setCurrentEpisode(null);
    };

    return (
        <div className={`show-detail ${localStorage.getItem('theme') || 'dark'}`}>
            <div className="show-header">
                <img src={show.image} alt={show.title} className="show-image" />
                <div className="show-info">
                    <h2>{show.title}</h2>
                    <p className="description">{show.description}</p>
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
                                <h4>{`Season ${season.id}`}</h4>
                                <p className="description">{season.description}</p>
                                {season.episodes && season.episodes.length > 0 && (
                                    <ul className="episode-list">
                                        {season.episodes.map((episode, index) => (
                                            <li key={episode.id} className="episode-item">
                                                <div className="episode-title">{`Episode ${index + 1}: ${episode.title}`}</div>
                                                <div className="episode-actions">
                                                    <button className="play-button" onClick={() => handleEpisodePlay(episode)}>
                                                        Play
                                                    </button>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                                {!season.episodes && (
                                    <button className="load-episodes-button" onClick={() => fetchAndSetEpisodes(season.id)}>
                                        Load Episodes
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
            <MediaPlayer episode={currentEpisode} onPause={handleEpisodePause} />
        </div>
    );
};

export default ShowDetail;
