// src/components/ShowList.js
import React, { useState, useEffect } from 'react';
import { fetchShows } from '../services/api';

const ShowList = () => {
    const [shows, setShows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchShows();
                setShows(data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="show-list">
            {shows.map(show => (
                <div key={show.id}>
                    <h2>{show.title}</h2>
                    <p>{show.description}</p>
                    {/* Add more show details as needed */}
                </div>
            ))}
        </div>
    );
};

export default ShowList;
