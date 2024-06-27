import React, { useState, useEffect } from "react";
import "./ShowDetail.css";
import { fetchSeasons, fetchEpisodes } from "../services/api"; // Import API functions for fetching data
import MediaPlayer from "./MediaPlayer"; // Import MediaPlayer component for playing episodes
import Favorites from "./Favorites"; // Import Favorites component for displaying favorite episodes

// ShowDetail component displays details of a TV show including seasons, episodes, and player
const ShowDetail = ({ show }) => {
  const [seasons, setSeasons] = useState([]); // State to store seasons data
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [error, setError] = useState(null); // State to manage error state
  const [currentEpisode, setCurrentEpisode] = useState(null); // State to manage currently playing episode
  const [favoriteEpisodes, setFavoriteEpisodes] = useState([]); // State to manage favorite episodes

  // Effect to fetch seasons data when show id changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        const seasonsData = await fetchSeasons(show.id); // Fetch seasons data for the show
        setSeasons(seasonsData); // Update seasons state with fetched data
        setLoading(false); // Set loading state to false
      } catch (error) {
        setError(error.message); // Set error message if fetching seasons fails
        setLoading(false); // Set loading state to false
      }
    };

    fetchData(); // Invoke fetchData function
  }, [show.id]); // Dependency array ensures effect runs when show id changes

  // Function to fetch and update episodes for a season
  const fetchAndSetEpisodes = async (seasonId) => {
    try {
      const episodesData = await fetchEpisodes(seasonId); // Fetch episodes data for the season
      const updatedSeasons = seasons.map(
        (season) =>
          season.id === seasonId
            ? { ...season, episodes: episodesData }
            : season // Update specific season with episodes data
      );
      setSeasons(updatedSeasons); // Update seasons state with updated data
    } catch (error) {
      console.error(`Error fetching episodes for season ${seasonId}:`, error);
      setError(
        `Error fetching episodes for season ${seasonId}: ${error.message}`
      ); // Set error message if fetching episodes fails
    }
  };

  // Function to handle playing an episode
  const handleEpisodePlay = (episode) => {
    setCurrentEpisode(episode); // Set currentEpisode state to the selected episode
  };

  // Function to handle pausing the currently playing episode
  const handleEpisodePause = () => {
    setCurrentEpisode(null); // Clear currentEpisode state when episode is paused
  };

  // Function to add an episode to favorites
  const addToFavorites = (episode) => {
    const isAlreadyFavorite = favoriteEpisodes.some(
      (fav) =>
        fav.episodeId === episode.episodeId &&
        fav.showId === episode.showId &&
        fav.seasonId === episode.seasonId
    );

    if (!isAlreadyFavorite) {
      const updatedFavorites = [...favoriteEpisodes, episode];
      setFavoriteEpisodes(updatedFavorites); // Update favoriteEpisodes state with the new favorite episode
    } else {
      console.log("Episode is already in favorites.");
    }
  };

  // Function to remove an episode from favorites
  const removeFromFavorites = (episodeId, showId, seasonId) => {
    const updatedFavorites = favoriteEpisodes.filter(
      (fav) =>
        !(
          fav.episodeId === episodeId &&
          fav.showId === showId &&
          fav.seasonId === seasonId
        )
    );
    setFavoriteEpisodes(updatedFavorites); // Update favoriteEpisodes state by removing the specified episode
  };

  return (
    <div className="show-detail">
      <div className="show-header">
        <img src={show.image} alt={show.title} className="show-image" />{" "}
        {/* Display show image */}
        <div className="show-info">
          <h2>{show.title}</h2> 
          <p>{show.description}</p> 
        </div>
      </div>
      <h3>Seasons:</h3>
      {loading /* Conditional rendering for loading state */ ? (
        <p>Loading...</p>
      ) : error /* Conditional rendering for error state */ ? (
        <p>Error: {error}</p>
      ) : seasons.length ===
        0 /* Conditional rendering if no seasons available */ ? (
        <p>No seasons available.</p>
      ) : (
        <div className="seasons">
          {seasons.map((season) => (
            <div key={season.id} className="season-card">
              <img
                src={season.image}
                alt={`Season ${season.title}`}
                className="season-image"
              />{" "}
              
              <div className="season-details">
                <h4>{`Season ${season.id}`}</h4> 
                <p>{season.description}</p> 
                {season.episodes &&
                  season.episodes.length >
                    0 /* Conditional rendering for episodes */ && (
                    <ul className="episode-list">
                      {season.episodes.map((episode) => (
                        <li key={episode.id} className="episode-item">
                          <div className="episode-title">{episode.title}</div>{" "}
                      
                          <div className="episode-actions">
                            <button
                              className="play-button"
                              onClick={() => handleEpisodePlay(episode)}
                            >
                              Play
                            </button>
                            <button
                              className="favorite-button"
                              onClick={() => addToFavorites(episode)}
                            >
                              Favorite
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
              </div>
            </div>
          ))}
        </div>
      )}
      <Favorites
        favoriteEpisodes={favoriteEpisodes}
        removeFromFavorites={removeFromFavorites}
      />{" "}
   
      <MediaPlayer episode={currentEpisode} onPause={handleEpisodePause} /> 
    </div>
  );
};

export default ShowDetail;
