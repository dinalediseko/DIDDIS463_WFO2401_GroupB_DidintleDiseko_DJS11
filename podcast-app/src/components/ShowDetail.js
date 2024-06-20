// src/components/ShowDetail.js

import React from 'react';

const ShowDetail = ({ show }) => {
    return (
        <div className="show-detail">
            <h2>{show.title}</h2>
            <img src={show.imageUrl} alt={show.title} />
            <p>{show.description}</p>
            <p>{show.seasons.length} Seasons</p>
            <p>Last Updated: {show.updatedAt}</p>
            <div className="genres">
                <h4>Genres:</h4>
                <ul>
                    {show.genres.map(genre => (
                        <li key={genre.id}>{genre.title}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ShowDetail;
