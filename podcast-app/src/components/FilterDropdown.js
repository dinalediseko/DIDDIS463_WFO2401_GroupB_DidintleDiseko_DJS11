import React from 'react';

// FilterDropdown component displays a dropdown menu to filter genres
const FilterDropdown = ({ genreTitles, selectedGenre, onSelectGenre }) => {
    return (
        <div className="filters">
            <h3>Filters:</h3> /* Heading for the section */
            <select
                value={selectedGenre || ''}
                onChange={(e) => onSelectGenre(e.target.value === '' ? null : parseInt(e.target.value))}
            >
                <option value="">All Genres</option> /* Default option to show all genres */
                {Object.entries(genreTitles).map(([id, title]) => ( /* Map through genreTitles object to display each genre */
                    <option key={id} value={id}>
                        {title} /* Display the title of each genre */
                    </option>
                ))}
            </select>
        </div>
    );
};

export default FilterDropdown;
