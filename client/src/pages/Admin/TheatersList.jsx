import React, { useEffect, useState } from "react";
import { GetAllTheaters } from "../../api/theaters";
import { Table, Button } from "antd";
import TheaterForm from "./TheaterForm";

function TheatersList() {
    const [theatersList, setTheatersList] = useState([]);
    const [user, setUser] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);

    const fetchAllTheaters = async () => {
        const response = await GetAllTheaters();
        const allTheaters = response.data;
        const mapTheatersToRender = allTheaters.map((theater) => {
            return {
                ...theater,
                key: `theater${theater._id}`,
            };
        });
        console.log(mapTheatersToRender);
        setTheatersList(mapTheatersToRender);
    };

    const fetchUserData = async () => {
        try {
            const response = await GetCurrentUser();
            setUser(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchAllTheaters();
        fetchUserData();
    }, []);

    const theaterCols = [
        {
            title: "Theater Name",
            dataIndex: "name",
        },
        {
            title: "Address",
            dataIndex: "address",
        },
        {
            title: "Phone Number",
            dataIndex: "phone",
        },
        {
            title: "Email",
            dataIndex: "email",
        },
        {
            title: "Status",
            render: (text) => {
                if (text.isActive) {
                    return <h3 style={{ color: "green" }}>Active</h3>;
                } else {
                    return <h3 style={{ color: "red" }}>Not Active</h3>;
                }
            },
        },
    ];
    return (
        <div>
            <div>
                {user.isAdmin && (
                    <Button
                        onClick={() => {
                            setIsModalOpen(true);
                        }}
                        style={{
                            fontSize: "1rem",
                            fontWeight: "600",
                            backgroundColor: "#1E345B",
                            marginBottom: "10px",
                            height: "50px",
                            color: "white",
                        }}
                    >
                        Add Theater
                    </Button>
                )}
            </div>
            {isModalOpen && (
                <TheaterForm isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
            )}
            <Table
                className="custom-dark-table"
                columns={theaterCols}
                dataSource={theatersList}
                style={{
                    backgroundColor: "#1E2736",
                    color: "white",
                }}
            />
        </div>
    );
}

export default TheatersList;
