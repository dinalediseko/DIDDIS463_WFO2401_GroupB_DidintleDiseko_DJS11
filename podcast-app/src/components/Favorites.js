import React from 'react';

// Favorites component displays a list of favorite episodes and provides a way to remove them
const Favorites = ({ favoriteEpisodes, removeFromFavorites }) => {
    return (
        <div className="favorites">
            <h3>Favorite Episodes</h3>
            {favoriteEpisodes.length === 0 ? ( 
                <p>No favorite episodes yet.</p> 
            ) : (
                <ul>
                    {favoriteEpisodes.map((fav) => ( 
                        <li key={`${fav.showId}-${fav.seasonId}-${fav.episodeId}`}>
                            <h4>{fav.title}</h4> 
                            <button onClick={() => removeFromFavorites(fav.episodeId, fav.showId, fav.seasonId)}>Remove</button> 
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Favorites;
