import React, { useState, useEffect, useCallback } from "react";
import "./App.css";
import ShowList from "./components/ShowList";
import ShowDetail from "./components/ShowDetail";
import Loading from "./components/Loading";
import Error from "./components/Error";
import SearchBar from "./components/SearchBar";
import FilterDropdown from "./components/FilterDropdown";
import ThemeToggle from "./components/ThemeToggle";
import ScrollUpButton from "./components/ScrollUpButton";
import MediaPlayer from "./components/MediaPlayer";
import logo from "./assets/logo.svg";
import { fetchShows, fetchSeasons, genreTitles } from "./services/api";

const App = () => {
  const [shows, setShows] = useState([]);
  const [filteredShows, setFilteredShows] = useState([]);
  const [selectedShow, setSelectedShow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [theme, setTheme] = useState("dark");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCriteria, setFilterCriteria] = useState(null);
  const [favoriteEpisodes, setFavoriteEpisodes] = useState([]);
  const [sortCriteria, setSortCriteria] = useState("A-Z");
  const [seasons, setSeasons] = useState([]);
  const [currentEpisode, setCurrentEpisode] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchShows();
        console.log("Shows data:", data);
        setShows(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    document.body.className = theme;

    // Retrieve the last played episode and progress
    const savedEpisode = JSON.parse(localStorage.getItem("currentEpisode"));
    const savedProgress = localStorage.getItem("currentEpisodeProgress");

    if (savedEpisode) {
      setCurrentEpisode(savedEpisode);
    }

    // Update the audio player to start from the saved progress
    if (savedProgress) {
      const audio = document.querySelector("audio");
      if (audio) {
        audio.currentTime = savedProgress;
      }
    }
  }, [theme]);

  const filterAndSortShows = useCallback(() => {
    let filtered = shows;

    if (searchQuery.trim() !== "") {
      filtered = filtered.filter((show) =>
        show.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (filterCriteria !== null) {
      filtered = filtered.filter(
        (show) => show.genres && show.genres.includes(filterCriteria)
      );
    }

    if (sortCriteria === "A-Z") {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortCriteria === "Z-A") {
      filtered.sort((a, b) => b.title.localeCompare(a.title));
    } else if (sortCriteria === "Newest") {
      filtered.sort((a, b) => new Date(b.updated) - new Date(a.updated));
    } else if (sortCriteria === "Oldest") {
      filtered.sort((a, b) => new Date(a.updated) - new Date(b.updated));
    }

    setFilteredShows(filtered);
  }, [shows, searchQuery, filterCriteria, sortCriteria]);

  useEffect(() => {
    filterAndSortShows();
  }, [filterAndSortShows]);

  const handleSearch = async (query) => {
    setSearchQuery(query);
    try {
      const filtered = shows.filter((show) =>
        show.title.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredShows(filtered);
      if (filtered.length === 0) {
        throw new Error("Show not found.");
      }
    } catch (error) {
      throw error;
    }
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setError(null);
  };

  const handleFilterByGenre = (genreId) => {
    setFilterCriteria(genreId);
  };

  const handleSortChange = (e) => {
    setSortCriteria(e.target.value);
  };

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  const removeFromFavorites = (episodeId, showId, seasonId) => {
    const updatedFavorites = favoriteEpisodes.filter(
      (fav) =>
        !(
          fav.episodeId === episodeId &&
          fav.showId === showId &&
          fav.seasonId === seasonId
        )
    );
    setFavoriteEpisodes(updatedFavorites);
  };

  const handleBackClick = () => {
    setSelectedShow(null);
  };

  const handleShowSelect = async (show) => {
    setSelectedShow(show);
    try {
      const seasonsData = await fetchSeasons(show.id);
      setSeasons(seasonsData);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleEpisodePlay = (episode) => {
    setCurrentEpisode(episode);
    localStorage.setItem("currentEpisode", JSON.stringify(episode));
  };

  const handlePause = () => {
    setCurrentEpisode(null);
    localStorage.removeItem("currentEpisode");
    localStorage.removeItem("currentEpisodeProgress");
  };

  const handleTimeUpdate = (e) => {
    localStorage.setItem("currentEpisodeProgress", e.target.currentTime);
  };

  const appClass = theme === "dark" ? "App dark" : "App light";
  const headerClass = theme === "dark" ? "App-header dark" : "App-header light";

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;

  return (
    <div className={appClass}>
      <header className={headerClass}>
        <div className="header-left">
          {selectedShow && (
            <button className="back-button" onClick={handleBackClick}>
              Back
            </button>
          )}
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
        </div>
        <img src={logo} alt="Logo" className="logo" />
        <div className="header-content">
          <div className="header-left">
            <FilterDropdown
              genreTitles={genreTitles}
              selectedGenre={filterCriteria}
              onSelectGenre={handleFilterByGenre}
            />
            <div className="sort">
              <h3>Sort by:</h3>
              <select value={sortCriteria} onChange={handleSortChange}>
                <option value="A-Z">Title: A-Z</option>
                <option value="Z-A">Title: Z-A</option>
                <option value="Newest">Most Recently Updated</option>
                <option value="Oldest">Least Recently Updated</option>
              </select>
            </div>
          </div>
          <div className="header-right">
            <SearchBar
              onSearch={handleSearch}
              onClearSearch={handleClearSearch}
            />
          </div>
        </div>
      </header>
      <main className="App-main">
        {selectedShow ? (
          <ShowDetail
            show={selectedShow}
            seasons={seasons}
            onEpisodePlay={handleEpisodePlay}
          />
        ) : (
          <ShowList
            shows={filteredShows.length > 0 ? filteredShows : shows}
            onSelectShow={handleShowSelect}
          />
        )}
      </main>
      <ScrollUpButton />
      <MediaPlayer
        episode={currentEpisode}
        onPause={handlePause}
        onTimeUpdate={handleTimeUpdate}
      />
    </div>
  );
};

export default App;
