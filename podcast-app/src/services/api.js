// src/services/api.js

const genreTitles = {
    1: "Personal Growth",
    2: "Investigative Journalism",
    3: "History",
    4: "Comedy",
    5: "Entertainment",
    6: "Business",
    7: "Fiction",
    8: "News",
    9: "Kids and Family"
};

export const fetchShows = async () => {
    try {
        const response = await fetch('https://podcast-api.netlify.app/shows');
        if (!response.ok) {
            throw new Error('Failed to fetch shows');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching shows:', error);
        throw error;
    }
};

export const fetchSeasons = async (showId) => {
    try {
        const response = await fetch(`https://podcast-api.netlify.app/shows/${showId}/seasons`);
        if (!response.ok) {
            throw new Error('Failed to fetch seasons');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Error fetching seasons for show ${showId}:`, error);
        throw error;
    }
};

export const fetchEpisodes = async (seasonId) => {
    try {
        const response = await fetch(`https://podcast-api.netlify.app/seasons/${seasonId}/episodes`);
        if (!response.ok) {
            throw new Error('Failed to fetch episodes');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Error fetching episodes for season ${seasonId}:`, error);
        throw error;
    }
};

export { genreTitles }; // Exporting genreTitles for use in other parts of the application