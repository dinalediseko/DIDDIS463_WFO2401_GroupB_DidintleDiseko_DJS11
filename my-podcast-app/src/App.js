// src/App.js
import React, { useState, useEffect } from 'react';
import './App.css'; // Import the CSS for styling
import ShowList from './components/ShowList';
import ShowDetail from './components/ShowDetail';
import { fetchShows } from './services/api';

const App = () => {
    const [shows, setShows] = useState([]);
    const [selectedShow, setSelectedShow] = useState(null);
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
        <div className="App">
            <header className="App-header">
                <h1>Podcast App</h1>
            </header>
            <main>
                {selectedShow ? (
                    <ShowDetail show={selectedShow} onBack={() => setSelectedShow(null)} />
                ) : (
                    <ShowList shows={shows} onSelectShow={setSelectedShow} />
                )}
            </main>
        </div>
    );
};

export default App;
