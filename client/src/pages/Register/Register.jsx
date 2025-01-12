import React from "react";
import { Button, Form, Input } from "antd";
import { Link } from "react-router-dom";
import "./Register.css";

function Register() {
    return (
        <header className="App-header">
            <main className="main-area">
                <section className="left-section">
                    <h1>Register</h1>
                </section>
                <section className="form-section">
                    <Form layout="vertical" style={{ maxWidth: "600px", width: "50%" }}>
                        <Form.Item
                            label="Name"
                            htmlFor="name"
                            name="name"
                            className="name"
                            rules={[{ required: true, message: "Name is required" }]}
                        >
                            <Input
                                id="name"
                                type="text"
                                placeholder="Enter your name"
                                style={{ height: "50px", color: "white" }}
                            ></Input>
                        </Form.Item>
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
                                style={{ height: "50px", color: "white" }}
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
                                style={{ height: "50px", color: "white" }}
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
                                Register
                            </Button>
                        </Form.Item>
                    </Form>
                </section>
                <div>
                    <h4>Already registered?</h4>
                    <span>
                        <Link to="/login">Login</Link>
                    </span>
                </div>
            </main>
        </header>
    );
}

export default Register;
