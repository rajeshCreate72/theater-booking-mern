import React from "react";

function TheatersLlist() {
    const theaterCols = [
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
            title: "Description",
            dataIndex: "description",
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
        <div>
            <Table></Table>
        </div>
    );
}

export default TheatersLlist;
