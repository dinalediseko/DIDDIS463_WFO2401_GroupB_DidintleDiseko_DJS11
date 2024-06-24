export const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
};

export const getGenreTitles = (genreIds, genres) => {
    return genreIds.map(id => genres[id] || 'Unknown Genre');
};