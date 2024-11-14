import { message } from "antd";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function BookShow() {
    const [show, setShow] = useState();
    const [selectedSeats, setSelectedSeats] = useState([]);
    const params = useParams();
    const navigate = useNavigate();

    const getData = async () => {
        try {
            const response = await GetShowById({ showId: params.id });
            if (response.success) {
                setShow(response.data);
            } else {
                message.error(response.message);
            }
        } catch (error) {
            message.error(error.message);
        }
    };

    const getSeats = () => {
        let columns = 12;
        let totalSeats = show.totalSeats || 120;
        let rows = Math.ceil(totalSeats / columns);

        return (
            <div>
                <div>
                    <p>Screen is this side</p>
                    <div className="screen-div"></div>
                </div>
                <ul>
                    {Array.from(Array(rows).keys()).map((row) => {
                        return Array.from(Array(columns).keys()).map((column) => {
                            let seatNumber = row * columns + column + 1;

                            let seatClass = "selected-seat";

                            if (selectedSeats.includes(seatNumber)) {
                                seatClass += "selected-seat";
                            }

                            if (show.bookedSeats.includes(seatNumber)) {
                                seatClass += "booked-seat";
                            }

                            if (seatNumber <= totalSeats) {
                                return (
                                    <li>
                                        <button
                                            className={seatClass}
                                            onClick={() => {
                                                if (selectedSeats.includes(seatNumber)) {
                                                    setSelectedSeats(
                                                        selectedSeats.filter((currentSeat) => {
                                                            currentSeat !== seatNumber;
                                                        })
                                                    );
                                                } else {
                                                    setSelectedSeats([
                                                        ...selectedSeats,
                                                        seatNumber,
                                                    ]);
                                                }
                                            }}
                                        >
                                            {seatNumber}
                                        </button>
                                    </li>
                                );
                            }
                        });
                    })}
                </ul>
            </div>
        );
    };

    return <div></div>;
}

export default BookShow;
