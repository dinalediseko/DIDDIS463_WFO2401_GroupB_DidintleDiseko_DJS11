import React, { useState } from 'react';
import './SearchBar.css'; // Import corresponding CSS file for styling

// SearchBar component for searching shows with error handling
const SearchBar = ({ onSearch, onClearSearch }) => {
    const [query, setQuery] = useState(''); // State to manage search query
    const [errorMessage, setErrorMessage] = useState(''); // State to manage error message

    // Function to handle search submission
    const handleSearch = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        
        try {
            await onSearch(query); // Call onSearch function passed from props
            setErrorMessage(''); // Clear error message if search is successful
        } catch (error) {
            setErrorMessage('Show not found.'); // Set error message if search fails
        }
    };

    // Function to handle clearing search input
    const handleClear = () => {
        setQuery(''); // Clear search query
        onClearSearch(); // Call onClearSearch function passed from props
        setErrorMessage(''); // Clear error message
    };

    return (
        <form className="search-bar" onSubmit={handleSearch}>
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)} // Update query state on input change
                placeholder="Search shows..."
                className="search-input"
            />
            <button type="submit" className="search-button">Search</button> {/* Button to submit search */}
            {query && (
                <button type="button" className="clear-button" onClick={handleClear}>
                    Clear
                </button>
            )}
            {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Display error message if present */}
        </form>
    );
};

export default SearchBar;
