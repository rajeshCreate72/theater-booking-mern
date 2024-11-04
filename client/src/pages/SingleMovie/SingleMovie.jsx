import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { GetMovieByID } from "../../api/movies";
import moment from "moment";
import { Input, Button } from "antd";

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
    return (
        <div>
            {movie && (
                <div>
                    <div>
                        <img src={movie.poster} alt="movie_poster" width={300} height={400} />
                    </div>
                    <div>
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
                    <div>
                        <label htmlFor="date">Choose the Date: </label>
                        <Input
                            onChange={handleData}
                            type="date"
                            value={date}
                            style={{
                                color: "white",
                                width: "10%",
                            }}
                        ></Input>
                    </div>
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
            )}
        </div>
    );
}

export default SingleMovie;
