import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { GetMovieByID } from "../../api/movies";
import { Input, Button } from "antd";
import moment from "moment";
import "./main.css";

function SingleMovie() {
    const [movie, setMovie] = useState(null);
    const [date, setDate] = useState(moment().format("YYYY-MM-DD"));
    const navigate = useNavigate();
    const params = useParams();

    const getData = async () => {
        try {
            const response = await GetMovieByID(params.id);
            console.log(response);
            if (response.success) {
                setMovie(response.data);
            } else {
                message.error(response.message);
            }
        } catch (error) {
            message.error(error.message);
        }
    };

    const handleData = (event) => {
        setDate(moment(event.target.value).format("YYYY-MM-DD"));
        navigate(`/movie/${params.id}?date=${event.target.value}`);
    };

    useEffect(() => {
        getData();
    }, []);

    const getAllShows = async () => {};

    return (
        <div>
            {movie && (
                <div className="movie-details">
                    <div className="movie-details-image">
                        <img
                            src={movie.poster}
                            alt="movie_poster"
                            width={200}
                            height={240}
                            style={{ borderRadius: "10px" }}
                        />
                    </div>
                    <div className="movie-details-info">
                        <h1>
                            <span>{movie.title}</span>
                        </h1>
                        <p>
                            Language: <span>{movie.language}</span>
                        </p>
                        <p>
                            Genre: <span>{movie.genre}</span>
                        </p>
                        <p>
                            Release Date:{" "}
                            <span>{moment(movie.releaseDate).format("MMM Do YYYY")}</span>
                        </p>
                        <p>
                            Duration: <span>{movie.duration}</span>
                        </p>
                    </div>
                    <div className="bookings-style">
                        <label htmlFor="date">Choose the Date: </label>
                        <Input
                            onChange={handleData}
                            type="date"
                            value={date}
                            style={{
                                color: "white",
                                width: "200px",
                            }}
                        ></Input>
                        <span>
                            <Button
                                style={{
                                    marginTop: "1rem",
                                }}
                            >
                                Book a show
                            </Button>
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
}

export default SingleMovie;
