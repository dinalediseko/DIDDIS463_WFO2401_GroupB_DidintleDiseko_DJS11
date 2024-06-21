import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import ShowList from './components/ShowList';
import ShowDetail from './components/ShowDetail';
import Loading from './components/Loading';
import Error from './components/Error'; // Ensure Error component is imported
import SearchBar from './components/SearchBar';
import FilterDropdown from './components/FilterDropdown';
import ThemeToggle from './components/ThemeToggle';
import Favorites from './components/Favorites';
import ScrollUpButton from './components/ScrollUpButton';
import { fetchShows, genreTitles } from './services/api';

const App = () => {
    const [shows, setShows] = useState([]);
    const [filteredShows, setFilteredShows] = useState([]);
    const [selectedShow, setSelectedShow] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [theme, setTheme] = useState('dark');
    const [searchQuery, setSearchQuery] = useState('');
    const [filterCriteria, setFilterCriteria] = useState(null);
    const [favoriteEpisodes, setFavoriteEpisodes] = useState([]);
    const [sortCriteria, setSortCriteria] = useState('A-Z'); // Default sort criteria

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchShows();
                console.log('Shows data:', data); // Debug log
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
    }, [theme]);

    const filterAndSortShows = useCallback(() => {
        let filtered = shows;

        // Filter by search query
        if (searchQuery.trim() !== '') {
            filtered = filtered.filter(show =>
                show.title.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Filter by genre criteria
        if (filterCriteria !== null) {
            filtered = filtered.filter(show =>
                show.genres && show.genres.includes(filterCriteria)
            );
        }

        // Sort by criteria
        if (sortCriteria === 'A-Z') {
            filtered.sort((a, b) => a.title.localeCompare(b.title));
        } else if (sortCriteria === 'Z-A') {
            filtered.sort((a, b) => b.title.localeCompare(a.title));
        } else if (sortCriteria === 'Newest') {
            filtered.sort((a, b) => new Date(b.updated) - new Date(a.updated));
        } else if (sortCriteria === 'Oldest') {
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
            // Simulating API call or data processing
            const filtered = shows.filter(show =>
                show.title.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredShows(filtered);
            if (filtered.length === 0) {
                throw new Error('Show not found.');
            }
        } catch (error) {
            throw error;
        }
    };

    const handleClearSearch = () => {
        setSearchQuery('');
        setError(null); // Clear error message on clear search
    };

    const handleFilterByGenre = (genreId) => {
        setFilterCriteria(genreId);
    };

    const handleSortChange = (e) => {
        setSortCriteria(e.target.value);
    };

    const toggleTheme = () => {
        setTheme(prevTheme => (prevTheme === 'dark' ? 'light' : 'dark'));
    };

    const removeFromFavorites = (episodeId, showId, seasonId) => {
        const updatedFavorites = favoriteEpisodes.filter(fav =>
            !(fav.episodeId === episodeId && fav.showId === showId && fav.seasonId === seasonId)
        );
        setFavoriteEpisodes(updatedFavorites);
    };

    const handleBackClick = () => {
        setSelectedShow(null);
    };

    const appClass = theme === 'dark' ? 'App dark' : 'App light';
    const headerClass = theme === 'dark' ? 'App-header dark' : 'App-header light';

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
                    <h1>Podcast App</h1>
                </div>
                <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
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
                        <Favorites
                            favoriteEpisodes={favoriteEpisodes}
                            removeFromFavorites={removeFromFavorites}
                        />
                        <SearchBar onSearch={handleSearch} onClearSearch={handleClearSearch} />
                    </div>
                </div>
            </header>
            <main className="App-main">
                {selectedShow ? (
                    <ShowDetail show={selectedShow} />
                ) : (
                    <ShowList shows={filteredShows.length > 0 ? filteredShows : shows} onSelectShow={setSelectedShow} />
                )}
            </main>
            <ScrollUpButton />
        </div>
    );
};

export default App;

