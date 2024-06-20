import React, { useState } from 'react';

const SearchBar = ({ onSearch, onClearSearch }) => {
    const [query, setQuery] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        onSearch(query);
    };

    const handleClear = () => {
        setQuery('');
        onClearSearch();
    };

    return (
        <form onSubmit={handleSearch}>
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search shows..."
            />
            <button type="submit">Search</button>
            {query && (
                <button type="button" onClick={handleClear}>
                    Clear
                </button>
            )}
        </form>
    );
};

export default SearchBar;

