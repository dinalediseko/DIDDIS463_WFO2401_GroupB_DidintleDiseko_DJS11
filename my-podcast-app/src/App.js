// src/App.js
import React from 'react';
import ShowList from './components/ShowList';

const App = () => {
    return (
        <div className="App">
            <header className="App-header">
                <h1>Podcast App</h1>
            </header>
            <main>
                <ShowList />
                {/* Add other components/routes here */}
            </main>
            <footer>
                {/* Add footer content */}
            </footer>
        </div>
    );
};

export default App;
