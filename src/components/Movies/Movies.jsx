import React, { useState, useEffect } from 'react';
import { getMovies, updateMovie } from '../../services/movieService';
import _cloneDeep from 'lodash-es/cloneDeep';
import {
    extractGenresFromMovies,
    constructColumnsForMoviesTable,
    mapMoviesToTableStructure,
    addMoviesTableFilterFeatures,
    createSearchField,
    createGenreSelectionField
} from '../../utils/movies';
import { entityExists } from "../../utils/common";
import Comments from '../Comments';
import { Table, notification } from 'antd';
import './Movies.scss';

function Movies() {
    // Initialize state variables
    const [movies, setMovies] = useState([]);
    const [genres, setGenres] = useState([]);
    // Filter fields variables
    const [searchByTitle, setSearchByTitle] = useState('');
    const [selectedGenreFilter, setSelectedGenreFilter] = useState('');
    // For showing or hiding a loader of movies table
    const [moviesAreLoading, setMoviesAreLoading] = useState(true);
    // A movie which was clicked in the table
    const [selectedMovie, setSelectedMovie] = useState(null);
    // Comments modal for a selected movie
    const [commentsAreVisible, setCommentsAreVisible] = useState(false);

    // Request movies from the Firebase and put them to state
    async function fetchMovies() {
        try {
            const movies = await getMovies();

            // In the real World we would have a separate API for genres
            // But in this case we need to extract them from requested movies
            const genres = extractGenresFromMovies(movies);

            // Update data
            setMovies(movies);
            setGenres(genres);
            // Hide a loader over the movies table
            setMoviesAreLoading(false);
        }
        catch (error) {
            // Hide a loader if an error occurred
            setMoviesAreLoading(false);
        }
    }

    // Fetch all the needed data
    useEffect(() => {
        fetchMovies();
    }, []);

    // Handle new genre selection
    function handleSelectedGenreChange(value) {
        setSelectedGenreFilter(value);
    }

    // Handle genre search
    function handleSearchByTitleChange(e) {
        setSearchByTitle(e.target.value);
    }

    // Handle row click in the movies table
    function handleMovieRowClick(movie, rowIndex) {
        // Ignore a row with filter features
        if (!entityExists(movie.id)) {
            return;
        }

        // Update a selected movie and show its comments
        setSelectedMovie(movie);
        setCommentsAreVisible(true);
    }

    async function handleMovieCommentAdd(comment, movieId) {
        const movieIndex = movies.findIndex(movie => movie.id === movieId);
        const movieCopy = _cloneDeep(movies[movieIndex]);

        // Add a comment to a movie
        movieCopy.comments.push(comment);

        // Create a new movies array for updating them
        const shallowMoviesCopy = [...movies];

        // Replace an old movie by the updated one
        shallowMoviesCopy[movieIndex] = movieCopy;

        // Update movies
        setMovies(shallowMoviesCopy);
        // Update a selected movie for showing an added comment
        setSelectedMovie(movieCopy);

        try {
            // Update movie comments on the server
            await updateMovie(movieCopy)
        }
        catch (error) {
            // Roll back to previous state in case of an error
            setMovies(movies);
            setSelectedMovie(movies[movieIndex]);
            notification.error({
                title: `Error during saving a comment: ${error.message}`,
                message: `Could not save your comment: ${comment.content}`,
                placement: 'topRight'
            });
        }
    }

    function handleCommentsModalClose() {
        setCommentsAreVisible(false);
    }

    // Create columns for the table
    const columns = constructColumnsForMoviesTable();

    // Extracting data for rows from movies
    const dataSource = mapMoviesToTableStructure(movies, { searchByTitle, selectedGenreFilter });

    // Create fields for filtering movies
    const searchField = createSearchField(searchByTitle, handleSearchByTitleChange, 'Title');
    const genreSelectionField = createGenreSelectionField(selectedGenreFilter, handleSelectedGenreChange, genres);

    // Add filter features to the table
    addMoviesTableFilterFeatures(dataSource, searchField, genreSelectionField);

    return (
        <section className='Movies'>
            <Table
                columns={columns}
                dataSource={dataSource}
                pagination={{ position: ['bottomCenter'], total: dataSource.length, defaultCurrent: 1, pageSize: 20 }}
                loading={moviesAreLoading}
                onRow={(record, rowIndex) => {
                    return {
                        onClick: () => handleMovieRowClick(record, rowIndex)
                    }
                }}
            />
            <Comments
                title={`${selectedMovie?.title} Comments`}
                visible={commentsAreVisible}
                movie={selectedMovie}
                onMovieCommentAdd={handleMovieCommentAdd}
                onModalClose={handleCommentsModalClose}
            />
        </section>
    );
}

export default Movies;