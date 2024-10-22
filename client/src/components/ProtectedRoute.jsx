import { useEffect, useState } from "react";
import { GetCurrentUser } from "../api/users";
import { Link, useNavigate } from "react-router-dom";
import { message, Layout, Menu } from "antd";
import { HomeOutlined, UserOutlined, ProfileOutlined, LogoutOutlined } from "@ant-design/icons";

function ProtectedRoute({ children }) {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const navItems = [
        {
            label: "Home",
            icon: <HomeOutlined />,
        },
        {
            label: `${user ? user.name : ""}`,
            icon: <UserOutlined />,
            children: [
                {
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
            ],
        },
        {
            label: (
                <Link
                    to="/login"
                    onClick={() => {
                        localStorage.removeItem("token");
                    }}
                />
            ),
            icon: <LogoutOutlined />,
        },
    ];

    //validate the token
    const getValidUser = async () => {
        try {
            const response = await GetCurrentUser();
            setUser(response?.data?.data);
            // if (response) {
            //     navigate("/");
            // }
        } catch (error) {
            localStorage.removeItem("token");
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
        <div>
            <Menu items={navItems} />
            <div>{user?.name}</div>

            {children}
        </div>
    );
}

export default ProtectedRoute;
