import _union from 'lodash-es/union';
import moment from 'moment';
import 'moment-duration-format';

// Extract unique genres from movies
export function extractGenresFromMovies(movies) {
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
                const time = moment.duration(runtime, 'minutes');
                return `${time.hours()}h ${time.minutes()}m`;
            }
        },
        {
            title: 'Revenue',
            dataIndex: 'revenue',
            key: 'revenue',
            render: revenue => `$${revenue} M`
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
            render: genres => genres.join(', ')
        }
    ];
}

// Extracting data for rows from movies
export function mapMoviesToTableStructure(movies) {
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