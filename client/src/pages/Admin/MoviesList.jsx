import { useEffect, useState } from "react";
import { GetAllMovies } from "../../api/movies";
import { Table } from "antd";

function MoviesList() {
    const [movies, setMovies] = useState([]);

    const getMovies = async () => {
        const response = await GetAllMovies();
        const allMovies = response.data;
        setMovies(
            allMovies.map((item) => {
                return { ...item, key: `movie${item._id}` };
            })
        );
        console.log(movies);
    };

    useEffect(() => {
        getMovies();
    }, []);

    const moviesCols = [
        {
            title: "Poster",
            dataIndex: "poster",
            render: (text, data) => {
                return <img src={data.poster} width="75" height="115" />;
            },
        },
        {
            title: "Movie name",
            dataIndex: "title",
        },
        {
            title: "Duriation",
            dataIndex: "duriation",
        },
        {
            title: "Genre",
            dataIndex: "genre",
        },
        {
            title: "Release Date",
            dataIndex: "releaseDate",
        },
        {
            title: "Language",
            dataIndex: "language",
        },
    ];

    return <Table columns={moviesCols} data={movies} />;
}

export default MoviesList;
