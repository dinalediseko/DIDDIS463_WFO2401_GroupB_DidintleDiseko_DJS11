import React, { useState } from 'react';
import './ShowList.css'; // Import corresponding CSS file for styling
import { genreTitles } from '../services/api';

const ShowList = ({ shows, onSelectShow }) => {
    const [hoveredShow, setHoveredShow] = useState(null);

    const handleMouseEnter = (show) => {
        setHoveredShow(show);
    };

    const handleMouseLeave = () => {
        setHoveredShow(null);
    };

    return (
        <div className="show-list">
            {shows.map((show) => (
                <div
                    key={show.id}
                    className="show-card"
                    onClick={() => onSelectShow(show)}
                    onMouseEnter={() => handleMouseEnter(show)}
                    onMouseLeave={handleMouseLeave}
                >
                    <img src={show.image} alt={show.title} className="show-image" />
                    <div className="show-info">
                        <h3>{show.title}</h3>
                        <p>{hoveredShow === show ? show.description : null}</p>
                        <div className="show-details">
                            <p>
                                Seasons: {show.seasons.length}
                            </p>
                            <p>
                                Genres: {show.genres.map(genreId => genreTitles[genreId]).join(', ')}
                            </p>
                            <p>
                                Updated: {new Date(show.updated).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                            </p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ShowList;
