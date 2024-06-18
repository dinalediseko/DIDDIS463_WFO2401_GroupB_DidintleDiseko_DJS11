// src/components/ShowList.js
import React from 'react';
import './ShowList.css'; // Import the CSS for styling

const ShowList = ({ shows, onSelectShow }) => {
    return (
        <div className="show-list">
            {shows.map(show => (
                <div key={show.id} className="show-card" onClick={() => onSelectShow(show)}>
                    <img src={show.image} alt={show.title} className="show-image" />
                    <div className="show-info">
                        <h3>{show.title}</h3>
                        <p>{show.description}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ShowList;
