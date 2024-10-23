import { useEffect } from "react";
import { Button, Form, Input, message } from "antd";
import { GetCurrentUser, LoginUser } from "../../api/users";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
    const navigate = useNavigate();

    const onFinish = async (values) => {
        try {
            const response = await LoginUser(values);

            if (response.success) {
                localStorage.setItem("token", response.token);
                message.success("Login success");
                window.location.href = "/";
            } else {
                console.log(response.message);
                message.info(response.message);
            }
            console.log(response);
        } catch (error) {
            console.log(error);
            message.error("Network error");
        }
    };

    useEffect(() => {
        if (localStorage.getItem("token")) {
            navigate("/");
        }
    }, []);

    return (
        <header className="App-header">
            <main className="main-area">
                <section className="left-section">
                    <h1>Login to BookMyShow</h1>
                </section>
                <section className="form-section">
                    <Form
                        layout="vertical"
                        onFinish={onFinish}
                        style={{ maxWidth: "1280px", width: "50%" }}
                    >
                        <Form.Item
                            label="Email"
                            htmlFor="email"
                            name="email"
                            className="email"
                            rules={[{ required: true, message: "Email is required" }]}
                        >
                            <Input
                                id="email"
                                type="text"
                                placeholder="Enter your email"
                                style={{ height: "50px" }}
                            ></Input>
                        </Form.Item>
                        <Form.Item
                            label="Password"
                            htmlFor="password"
                            name="password"
                            className="password"
                            rules={[{ required: true, message: "Password is required" }]}
                        >
                            <Input
                                id="password"
                                type="password"
                                placeholder="Enter your password"
                                style={{ height: "50px" }}
                            ></Input>
                        </Form.Item>
                        <Form.Item>
                            <Button
                                type="primary"
                                block
                                htmlType="submit"
                                style={{
                                    fontSize: "1rem",
                                    fontWeight: "600",
                                    backgroundColor: "#1E345B",
                                    height: "50px",
                                }}
                            >
                                Login
                            </Button>
                        </Form.Item>
                    </Form>
                </section>
            </main>
        </header>
    );
}

export default Login;
