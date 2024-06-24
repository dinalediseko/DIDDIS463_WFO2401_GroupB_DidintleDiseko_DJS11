import React from 'react';

// ThemeToggle component for toggling between dark and light themes
const ThemeToggle = ({ theme, toggleTheme }) => {
    return (
        <button className="theme-toggle-button" onClick={toggleTheme}>
            Toggle {theme === 'dark' ? 'Light' : 'Dark'} Mode 
        </button>
    );
};

export default ThemeToggle;
