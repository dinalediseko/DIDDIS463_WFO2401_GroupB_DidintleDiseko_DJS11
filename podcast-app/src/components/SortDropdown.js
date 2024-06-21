import React from 'react';

const SortDropdown = ({ sortCriteria, onSortChange }) => {
    const handleSortChange = e => {
        onSortChange(e.target.value);
    };

    return (
        <div className="sort">
            <h3>Sort by:</h3>
            <select value={sortCriteria} onChange={handleSortChange}>
                <option value="A-Z">Title: A-Z</option>
                <option value="Z-A">Title: Z-A</option>
                <option value="Newest">Most Recently Updated</option>
                <option value="Oldest">Least Recently Updated</option>
            </select>
        </div>
    );
};

export default SortDropdown;
