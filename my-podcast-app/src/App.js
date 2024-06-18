import React, { useState, useEffect } from 'react';
import './App.css'; // Import the CSS for styling
import ShowList from './components/ShowList';
import ShowDetail from './components/ShowDetail';
import Loading from './components/Loading';
import Error from './components/Error';
import { fetchShows } from './services/api';

const App = () => {
    const [shows, setShows] = useState([]);
    const [selectedShow, setSelectedShow] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [theme, setTheme] = useState('dark');

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

    useEffect(() => {
        document.body.className = theme;
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prevTheme => (prevTheme === 'dark' ? 'light' : 'dark'));
    };

    if (loading) return <Loading />;
    if (error) return <Error message={error} />;

    return (
        <div className={`App ${theme}`}>
            <header className="App-header">
                <h1>Podcast App</h1>
                <button className="theme-toggle-button" onClick={toggleTheme}>
                    Toggle {theme === 'dark' ? 'Light' : 'Dark'} Mode
                </button>
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
