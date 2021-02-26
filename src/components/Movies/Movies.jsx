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
import './Movies.css';

function Movies() {
    // Initialize state variables
    const [movies, setMovies] = useState([]);
    const [genres, setGenres] = useState([]);
    // Filter fields variables
    const [searchByTitle, setSearchByTitle] = useState('');
    const [selectedGenre, setSelectedGenre] = useState('');
    // For showing or hiding a loader of movies table
    const [moviesAreLoading, setMoviesAreLoading] = useState(true);
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
        setSelectedGenre(value);
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

        setCommentsAreVisible(true);
    }

    function handleCommentsModalClose() {
        setCommentsAreVisible(false);
    }

    // Create columns for the table
    const columns = constructColumnsForMoviesTable();

    // Extracting data for rows from movies
    const dataSource = mapMoviesToTableStructure(movies, { searchByTitle, selectedGenre });

    // Create fields for filtering movies
    const searchField = createSearchField(searchByTitle, handleSearchByTitleChange, 'Title');
    const genreSelectionField = createGenreSelectionField(selectedGenre, handleSelectedGenreChange, genres);

    // Add filter features to the table
    addMoviesTableFilterFeatures(dataSource, searchField, genreSelectionField);

    return (
        <section className='movies-container'>
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
                title={'Comments +++ here i need to add movie Title, but how?'}
                visible={commentsAreVisible}
                onModalClose={handleCommentsModalClose}
            />
        </section>
    );
}

export default Movies;