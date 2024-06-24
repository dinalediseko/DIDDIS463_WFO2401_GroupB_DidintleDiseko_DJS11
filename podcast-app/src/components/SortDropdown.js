import React from 'react';

// SortDropdown component for selecting sorting criteria
const SortDropdown = ({ sortCriteria, onSortChange }) => {
    // Function to handle sorting criteria change
    const handleSortChange = e => {
        onSortChange(e.target.value); // Call onSortChange function with selected value
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
