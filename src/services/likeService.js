export function likeMovie(movieId) {
    // Retrieve the existing movie IDs from local storage or initialize an empty array
    const currentMovieIds = JSON.parse(localStorage.getItem('movieIds')) || [];
    
    // Check if the movie is already liked
    if (!currentMovieIds.includes(movieId)) {
        // Add the movie ID to the array
        currentMovieIds.push(movieId);
        
        // Save the updated array back to local storage
        localStorage.setItem('movieIds', JSON.stringify(currentMovieIds));
        console.log(`Movie with ID ${movieId} liked and added to the list.`);
    } else {
        const updatedMovieIds = currentMovieIds.filter((ids)=>movieId!=ids);
        localStorage.setItem('movieIds',JSON.stringify(updatedMovieIds))
        console.log(`Movie with ID ${movieId} is removed from the list.`);
    }
}
