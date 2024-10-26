import { useEffect, useState } from "react";
import { GetAllMovies } from "../../api/movies";
import { Table } from "antd";

function MoviesList() {
    const [movies, setMovies] = useState([]);

    const getMovies = async () => {
        const response = await GetAllMovies();
        const allMovies = response.data;
        const mappedMovies = allMovies.map((item) => {
            return { ...item, key: `movie${item._id}` };
        });
        setMovies(mappedMovies);
    };

    useEffect(() => {
        getMovies();
    }, []);

    const moviesCols = [
        {
            title: "Poster",
            dataIndex: "poster",
            render: (text, data) => {
                return <img src={data.poster} width="100" height="115" />;
            },
        },
        {
            title: "Movie name",
            dataIndex: "title",
        },
        {
            title: "Duration",
            dataIndex: "duration",
        },
        {
            title: "Genre",
            dataIndex: "genre",
        },
        {
            title: "Release Date",
            dataIndex: "releaseDate",
            render: (text) => {
                let dateToFormat = new Date(text);
                const formatDate = dateToFormat.toDateString();
                return <span>{formatDate}</span>;
            },
        },
        {
            title: "Language",
            dataIndex: "language",
        },
    ];

    return (
        <Table
            className="custom-dark-table"
            columns={moviesCols}
            dataSource={movies}
            style={{
                backgroundColor: "#1E2736",
                color: "white",
            }}
        />
    );
}

export default MoviesList;
