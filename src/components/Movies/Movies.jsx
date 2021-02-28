import React, { useState, useEffect } from 'react';
import { getMovies } from '../../services/movieService';
import {
    extractGenresFromMovies,
    constructColumnsForMoviesTable,
    mapMoviesToTableStructure,
    addMoviesTableFilterFeatures,
    createSearchField,
    createGenreSelectionField
} from '../../utils/movies';
import { Table } from 'antd';
import Comments from '../Comments';
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

    // Request movies from an EndPoint and put them to state
    async function fetchMovies() {
        const response = await getMovies();
        const movies = response.data;

        // In the real World we would have a separate API for genres
        // But in this case we need to extract them from requested movies
        const genres = extractGenresFromMovies(movies);
        setMovies(movies);
        setGenres(genres);

        // Hide a loader over the movies table
        setMoviesAreLoading(false);
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
        if (rowIndex === 0) {
            return;
        }

        // Update a selected movie and show its comments
        setSelectedMovie(movie);
        setCommentsAreVisible(true);
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
                onModalClose={handleCommentsModalClose}
            />
        </section>
    );
}

export default Movies;