import React from 'react';

const ThemeToggle = ({ theme, toggleTheme }) => {
    return (
        <button className="theme-toggle-button" onClick={toggleTheme}>
            Toggle {theme === 'dark' ? 'Light' : 'Dark'} Mode
        </button>
    );
};

export default ThemeToggle;
