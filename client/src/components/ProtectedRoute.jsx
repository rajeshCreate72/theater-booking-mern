import { useEffect, useState } from "react";
import { GetCurrentUser } from "../api/users";
import { Link, useNavigate } from "react-router-dom";
import { message, Layout, Menu } from "antd";
import { HomeOutlined, UserOutlined, ProfileOutlined, LogoutOutlined } from "@ant-design/icons";
import { Header } from "antd/es/layout/layout";

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
            console.log(response.data);
            setUser(response.data);
        } catch (error) {
            console.error(error.message);
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
            <Layout>
                <Header
                    style={{
                        position: "sticky",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <h3
                        style={{ color: "white", margin: "0", cursor: "pointer" }}
                        onClick={() => {
                            navigate("/");
                        }}
                    >
                        Book my show
                    </h3>
                    <Menu
                        items={navItems}
                        theme="dark"
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            color: "white",
                        }}
                    />
                </Header>
                <div style={{ backgroundColor: "#1E2736" }}>{children}</div>
            </Layout>
        </>
    );
}

export default ProtectedRoute;
