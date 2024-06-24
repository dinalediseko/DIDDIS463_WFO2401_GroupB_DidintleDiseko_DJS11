// Define genreTitles object mapping genre IDs to genre names
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

// Function to fetch list of shows
export const fetchShows = async () => {
    try {
        const response = await fetch('https://podcast-api.netlify.app/shows');
        if (!response.ok) {
            throw new Error('Failed to fetch shows');
        }
        const data = await response.json();
        return data; // Return JSON data received from the API
    } catch (error) {
        console.error('Error fetching shows:', error);
        throw error; // Throw error if fetch operation fails
    }
};

// Function to fetch seasons for a specific show
export const fetchSeasons = async (showId) => {
    try {
        const response = await fetch(`https://podcast-api.netlify.app/id/${showId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch show data');
        }
        const data = await response.json();
        return data.seasons; // Return seasons array from the show data
    } catch (error) {
        console.error(`Error fetching seasons for show ${showId}:`, error);
        throw error; // Throw error if fetch operation fails
    }
};

// Function to fetch episodes for a specific season
export const fetchEpisodes = async (seasonId) => {
    try {
        const response = await fetch(`https://podcast-api.netlify.app/seasons/${seasonId}/episodes`);
        if (!response.ok) {
            throw new Error('Failed to fetch episodes');
        }
        const data = await response.json();
        return data; // Return episodes data received from the API
    } catch (error) {
        console.error(`Error fetching episodes for season ${seasonId}:`, error);
        throw error; // Throw error if fetch operation fails
    }
};

// Export the genreTitles object for external use
export { genreTitles };
