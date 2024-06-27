import React from 'react';

// FilterDropdown component displays a dropdown menu to filter genres
const FilterDropdown = ({ genreTitles, selectedGenre, onSelectGenre }) => {
    return (
        <div className="filters">
            <h3>Filters:</h3>
            <select
                value={selectedGenre || ''}
                onChange={(e) => onSelectGenre(e.target.value === '' ? null : parseInt(e.target.value))}
            >
                <option value="">All Genres</option> 
                {Object.entries(genreTitles).map(([id, title]) => ( 
                    <option key={id} value={id}>
                        {title} 
                    </option>
                ))}
            </select>
        </div>
    );
};

export default FilterDropdown;
