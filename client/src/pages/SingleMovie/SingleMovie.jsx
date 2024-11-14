import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { GetMovieByID } from "../../api/movies";
import { Input, message, Row, Col } from "antd";
import { GetAllShowsByMovie } from "../../api/shows";
import moment from "moment";
import process from "process";
import "./main.css";

function SingleMovie() {
    const [movie, setMovie] = useState(null);
    const [theaters, setTheaters] = useState([]);
    const [date, setDate] = useState(moment().format("YYYY-MM-DD"));
    const navigate = useNavigate();
    const params = useParams();

    const getData = async () => {
        try {
            const response = await GetMovieByID(params.id);
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
        console.log(process.env);
        getData();
    }, []);

    const getAllTheaters = async () => {
        try {
            const response = await GetAllShowsByMovie({ movie: params.id, date });
            if (response.success) {
                setTheaters(response.data);
            } else {
                console.log(response);
                message.error("Shows not found on this date");
            }
        } catch (error) {
            message.error(error.message);
        }
    };

    useEffect(() => {
        getAllTheaters();
    }, [date]);

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
                    </div>
                </div>
            )}
            <div>
                {theaters.length > 0 && (
                    <div>
                        <h2>Theaters</h2>
                        {theaters.map((theater) => {
                            return (
                                <div key={theater._id}>
                                    <Row gutter={24} key={theater._id}>
                                        <Col xs={{ span: 24 }} lg={{ span: 8 }}>
                                            <h3>{theater.name}</h3>
                                            <p>{theater.address}</p>
                                        </Col>
                                        <Col xs={{ span: 24 }} lg={{ span: 16 }}>
                                            <ul className="shows-ul">
                                                {/* sorting the show */}
                                                {theater.shows
                                                    .sort((a, b) => {
                                                        moment(a.time, "HH:mm") -
                                                            moment(b.time, "HH:mm");
                                                    })
                                                    // mapping the shows
                                                    .map((show) => {
                                                        return (
                                                            <li
                                                                key={show._id}
                                                                onClick={() => {
                                                                    navigate(
                                                                        `/book-show/${show._id}`
                                                                    );
                                                                }}
                                                                className="shows-li"
                                                            >
                                                                {show.time}
                                                            </li>
                                                        );
                                                    })}
                                            </ul>
                                        </Col>
                                    </Row>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}

export default SingleMovie;
