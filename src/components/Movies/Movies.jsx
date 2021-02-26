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
        <section className={'movies-container'}>
            <Table
                columns={columns}
                dataSource={dataSource}
                pagination={false}
                loading={moviesAreLoading}
            />
        </section>
    );
}

export default Movies;