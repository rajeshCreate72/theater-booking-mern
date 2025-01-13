import { useEffect, useState } from "react";
import { GetCurrentUser } from "../api/users";
import { Link, useNavigate } from "react-router-dom";
import { message, Layout, Menu } from "antd";
import { HomeOutlined, UserOutlined, ProfileOutlined, LogoutOutlined } from "@ant-design/icons";
import { Header } from "antd/es/layout/layout";
import moment from "moment";

function ProtectedRoute({ children }) {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const navItems = [
        {
            key: 1,
            label: (
                <span
                    onClick={() => {
                        navigate("/");
                    }}
                    style={{ width: "100%", height: "100%" }}
                >
                    Home
                </span>
            ),
            icon: <HomeOutlined />,
        },
        {
            key: 2,
            label: `${user ? user.name : ""}`,
            icon: <UserOutlined />,
            children: [
                {
                    key: 3,
                    label: (
                        <span
                            onClick={() => {
                                user.isAdmin ? navigate("/admin") : navigate("/profile");
                            }}
                            style={{ width: "100%", height: "100%" }}
                        >
                            My Profile
                        </span>
                    ),
                    icon: <ProfileOutlined />,
                },
                {
                    key: 4,
                    label: (
                        <Link
                            to="/login"
                            onClick={() => {
                                localStorage.removeItem("token");
                            }}
                        >
                            Log out
                        </Link>
                    ),
                    icon: <LogoutOutlined />,
                },
            ],
        },
    ];

    //validate the token
    const getValidUser = async () => {
        try {
            const response = await GetCurrentUser();
            if (response === "Request failed with status code 401") {
                localStorage.removeItem("token");
                navigate("/login");
                message.info("Session Expired. Please Login");
            } else {
                setUser(response.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    //If token exist token will be validated by "getValidUser()"
    useEffect(() => {
        if (localStorage.getItem("token")) {
            getValidUser();
        } else {
            navigate("/login");
        }
    }, []);

    return (
        <>
            <Layout
                style={{
                    overflow: "none",
                }}
            >
                <Header
                    style={{
                        position: "sticky",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        top: "0",
                        zIndex: 3,
                    }}
                >
                    <h3
                        style={{ color: "white", margin: "0", cursor: "pointer" }}
                        onClick={() => {
                            navigate(`/movie/${movie._id}?date=${moment().format("YYYY-MM-DD")}`);
                        }}
                    >
                        Theater Booking website
                    </h3>
                    <Menu
                        items={navItems}
                        theme="dark"
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            color: "white",
                        }}
                        triggerSubMenuAction="click"
                    />
                </Header>
                <div
                    style={{
                        backgroundColor: "#1E2736",
                        overflow: "hidden",
                        padding: "3rem",
                    }}
                >
                    {children}
                </div>
            </Layout>
        </>
    );
}

export default ProtectedRoute;
