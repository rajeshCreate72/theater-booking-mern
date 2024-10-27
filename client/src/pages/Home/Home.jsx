import React, { useEffect, useState } from "react";
import moment from "moment";
import { GetAllMovies } from "../../api/movies";
import { Col, message, Row } from "antd";
import "./Home.css";
import { useNavigate } from "react-router-dom";

function Home() {
    const [movies, setMovies] = useState(null);
    const navigate = useNavigate();

    const getData = async () => {
        try {
            const response = await GetAllMovies();
            if (response.success) {
                setMovies(response.data);
            } else {
                message.error(response.message);
            }
        } catch (error) {
            message.error(error.message);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <>
            <Row
                gutter={{
                    xs: 6,
                    sm: 10,
                    md: 12,
                    lg: 16,
                }}
            >
                {movies &&
                    movies.map((movie) => {
                        return (
                            <Col
                                span={{
                                    xs: 24,
                                    sm: 24,
                                    md: 12,
                                    lg: 10,
                                }}
                                key={movie._id}
                            >
                                <div
                                    className="movie-item"
                                    onClick={() =>
                                        navigate(
                                            `/movie/${movie._id}?date=${moment().format(
                                                "YYYY-MM-DD"
                                            )}`
                                        )
                                    }
                                >
                                    <img
                                        src={movie.poster}
                                        alt={movie.title}
                                        width={200}
                                        height={300}
                                        style={{
                                            borderRadius: "8px",
                                            cursor: "pointer",
                                            objectFit: "cover",
                                        }}
                                    />
                                    <h3 style={{ cursor: "pointer" }}>{movie.title}</h3>
                                </div>
                            </Col>
                        );
                    })}
            </Row>
        </>
    );
}

export default Home;
