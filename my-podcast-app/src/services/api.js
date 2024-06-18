// src/services/api.js
const API_URL = 'https://podcast-api.netlify.app'; // Replace with your actual API URL

export const fetchShows = async () => {
    try {
        const response = await fetch(`${API_URL}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching shows:', error);
        throw error;
    }
};
