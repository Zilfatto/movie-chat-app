import React from 'react';
import _union from 'lodash-es/union';
import moment from 'moment';
import 'moment-duration-format';
import { Input, Select } from 'antd';

// Extract unique genres from movies
export function extractGenresFromMovies(movies = []) {
    let genres = [];
    // Iterate over each movie
    movies.forEach(movie => {
        const { genre: movieGenres } = movie;
        // Add to all genres only unique ones
        genres = _union(genres, movieGenres);
    });
    return genres;
}

// Create table columns for movies
export function constructColumnsForMoviesTable() {
    return [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title'
        },
        {
            title: 'Year',
            dataIndex: 'year',
            key: 'year'
        },
        {
            title: 'Runtime',
            dataIndex: 'runtime',
            key: 'runtime',
            render: runtime => {
                // Convert movie runtime to hours and minutes
                return runtime
                    ? moment.duration(runtime, 'minutes').format('h[h] m[m]', { trim: false })
                    : '';
            }
        },
        {
            title: 'Revenue',
            dataIndex: 'revenue',
            key: 'revenue',
            render: revenue => revenue ? `$${revenue} M` : ''
        },
        {
            title: 'Rating',
            dataIndex: 'rating',
            key: 'rating'
        },
        {
            title: 'Genres',
            dataIndex: 'genre',
            key: 'genre',
            render: genres => Array.isArray(genres) ? genres.join(', ') : genres
        }
    ];
}

// Extracting data for rows from movies
export function mapMoviesToTableStructure(
    movies = [],
    filters = { searchByTitle: '', selectedGenre: '' }
    ) {

    // Filters values
    const { searchByTitle, selectedGenre } = filters;
    // If at least one of two filters are used, then apply them
    if (searchByTitle || selectedGenre) {
        movies = movies.filter(movie => {
            // Check whether each filter is provided, if so, apply it
            return (!searchByTitle || movie.title.toLowerCase().startsWith(searchByTitle.toLowerCase()))
                && (!selectedGenre || movie.genre.find(genre => genre === selectedGenre));
        });
    }

    // Return movies data according to the table structure
    return movies.map((movie, index) => {
        // Extract needed data from a movie
        const { title, year, runtime, revenue, rating, genre } = movie;

        // Return object with properties for each column
        return {
            key: index,
            title,
            year,
            runtime,
            revenue,
            rating,
            genre
        };
    });
}

// Insert a row with filter features to a table
export function addMoviesTableFilterFeatures(rows = [], search = '', genresSelection = '') {
    const tableFiltersRow = {
        key: -1,
        title: search,
        genre: genresSelection
    };
    // Insert a row at the very top of a table
    rows.unshift(tableFiltersRow);
}

// Create an input field for filtering genres by the entered value
export function createSearchField(value = '', handler = null, placeholder = '') {
    return <Input value={value} onChange={handler} placeholder={placeholder} />;
}

// Create a selection for filtering genres
export function createGenreSelectionField(value = '', handler = null, items = []) {
    const { Option } = Select;
    return (
        <Select defaultValue={value} onChange={handler} style={{ width: 200 }} >
            <Option value={''} key={'-1'}>All</Option>
            {items.map((item, index) => <Option value={item} key={index} >{item}</Option>)}
        </Select>
    );
}