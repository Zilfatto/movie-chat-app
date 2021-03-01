import firebase from 'firebase/app';
import { normalizeMoviesQuerySnapshot } from '../utils/movies';
import { notification } from 'antd';

// Request movies from the firestore
export function getMovies() {
    const db = firebase.firestore();

    return db.collection('movies')
        .orderBy('rating', 'desc')
        .get()
        // Normalize querySnapshot b extracting movies data and adding IDs to them
        .then(normalizeMoviesQuerySnapshot)
        .catch(error => {
            notification.error({
                title: 'Error during fetching movies',
                message: error.message,
                placement: 'topRight'
            });
        });
}

// Update a movie after a change
export function updateMovie(updatedMovie) {
    const db = firebase.firestore();
    // Copy a movie object in oder to delete id property from it before sending to the server
    const updatedMovieCopy = { ...updatedMovie };
    delete updatedMovieCopy.id;

    // Save updated movie
    return db.collection('movies').doc(updatedMovie.id).set(updatedMovieCopy);
}