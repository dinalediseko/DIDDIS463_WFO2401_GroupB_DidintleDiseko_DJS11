import React, { useState } from 'react';
import './SearchBar.css'; // Import corresponding CSS file for styling

const SearchBar = ({ onSearch, onClearSearch }) => {
    const [query, setQuery] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSearch = async (e) => {
        e.preventDefault();
        
        try {
            await onSearch(query);
            setErrorMessage('');
        } catch (error) {
            setErrorMessage('Show not found.');
        }
    };

    const handleClear = () => {
        setQuery('');
        onClearSearch();
        setErrorMessage('');
    };

    return (
        <form className="search-bar" onSubmit={handleSearch}>
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search shows..."
                className="search-input"
            />
            <button type="submit" className="search-button">Search</button>
            {query && (
                <button type="button" className="clear-button" onClick={handleClear}>
                    Clear
                </button>
            )}
            {errorMessage && <p className="error-message">{errorMessage}</p>}
        </form>
    );
};

export default SearchBar;
