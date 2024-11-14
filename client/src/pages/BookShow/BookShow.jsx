import { message } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, Row, Col, Button } from "antd";
import { GetShowById } from "../../api/shows";
import StripeCheckout from "react-stripe-checkout";
import moment from "moment";
import "./main.css";

function BookShow() {
    const [show, setShow] = useState({});
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
                <ul className="seat-list-style">
                    {Array.from(Array(rows).keys()).map((row) => {
                        return Array.from(Array(columns).keys()).map((column) => {
                            let seatNumber = row * columns + column + 1;

                            let seatClass = "selected-seat";

                            if (selectedSeats.includes(seatNumber)) {
                                seatClass += "selected-seat";
                            }

                            if (show.bookedSeats && show.bookedSeats.includes(seatNumber)) {
                                seatClass += "booked-seat";
                            }

                            if (seatNumber <= totalSeats) {
                                return (
                                    <li style={{ listStyle: "none" }} key={row + column}>
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
                <div>
                    <h3>
                        Selected Seats: <span>{selectedSeats.join(", ")}</span>
                    </h3>
                    <h2>
                        Total price: <span>Rs. {selectedSeats.length * show.ticketPrice}</span>/-
                    </h2>
                </div>
            </div>
        );
    };

    const book = async (transactionId) => {
        try {
            const response = await bookShow({
                show: params.id,
                transactionId,
                seats: selectedSeats,
                user: "666a6bf13c3c74c37c9ad81a",
            });
            if (response.success) {
                message.success("Show Booking done!");
                navigate("/profile");
            } else {
                message.error(response.message);
            }
        } catch (err) {
            message.error(err.message);
        }
    };

    const onToken = async (token) => {
        try {
            const response = await makePayment(
                token,
                selectedSeats.length * show.ticketPrice * 100
            );
            if (response.success) {
                message.success(response.message);
                book(response.data);
                // console.log(response);
            } else {
                message.error(response.message);
            }
        } catch (err) {
            message.error(err.message);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <div>
            <Row gutter={24}>
                <Col span={24}>
                    <div>
                        <div>
                            <h3>
                                <span>Show Name:</span> {show.name}
                            </h3>
                            <h3>
                                <span>Date & Time: </span>
                                {moment(show.date).format("MMM Do YYYY")} at{" "}
                                {moment(show.time, "HH:mm").format("hh:mm A")}
                            </h3>
                            <h3>
                                <span>Ticket Price:</span> Rs. {show.ticketPrice}/-
                            </h3>
                            <h3>
                                <span>Total Seats:</span> {show.totalSeats}
                                <span> &nbsp;|&nbsp; Available Seats:</span>{" "}
                                {show.totalSeats - show?.bookedSeats?.length}{" "}
                            </h3>
                        </div>
                        {getSeats()}
                        {selectedSeats.length > 0 && (
                            <StripeCheckout
                                token={onToken}
                                billingAddress
                                amount={selectedSeats.length * show.ticketPrice * 100}
                                stripeKey="pk_test_eTH82XLklCU1LJBkr2cSDiGL001Bew71X8"
                            >
                                <Button
                                    type="primary"
                                    shape="round"
                                    size="large"
                                    block
                                    style={{
                                        fontSize: "1rem",
                                        fontWeight: "600",
                                        backgroundColor: "#1E345B",
                                        height: "50px",
                                        marginTop: "10px",
                                        width: "20%",
                                    }}
                                >
                                    Pay Now
                                </Button>
                            </StripeCheckout>
                        )}
                    </div>
                </Col>
            </Row>
        </div>
    );
}

export default BookShow;
