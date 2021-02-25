import React from 'react';
import { Table } from 'antd';
import './Movies.css';

function Movies() {
    const columns = [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Year',
            dataIndex: 'year',
            key: 'year',
        },
        {
            title: 'Runtime',
            dataIndex: 'runtime',
            key: 'runtime',
        },
        {
            title: 'Revenue',
            dataIndex: 'revenue',
            key: 'revenue',
        },
        {
            title: 'Rating',
            dataIndex: 'rating',
            key: 'rating',
        },
        {
            title: 'Genres',
            dataIndex: 'genres',
            key: 'genres',
        }
    ];


    // Mocking rows data
    const dataSource = [
        {
            key: 1,
            title: 'Fantastic movie',
            year: 2000,
            runtime: '1h 30m',
            revenue: 600000,
            rating: 5.6,
            genres: 'Genre3'
        },
        {
            key: 1,
            title: 'Game changer',
            year: 1010,
            runtime: '34m',
            revenue: 1000000,
            rating: 9.9,
            genres: 'Genre1'
        },
        {
            key: 1,
            title: 'One chance',
            year: 1999,
            runtime: '1h',
            revenue: 50000,
            rating: 5.0,
            genres: 'Genre6'
        },
    ];

    return (
        <section className={'movies-container'}>
            <Table
                columns={columns}
                dataSource={dataSource}
                pagination={false}
            />
        </section>
    );
}

export default Movies;