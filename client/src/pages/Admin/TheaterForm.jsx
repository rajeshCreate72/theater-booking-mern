import React from "react";
import { Modal, Form, Row, Col, Input, Select, Button, message } from "antd";
import { AddTheater } from "../../api/theaters";

function TheaterForm({ isModalOpen, setIsModalOpen }) {
    const onFinish = async (values) => {
        await AddTheater(values);
        message.info("Theater has been added");
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <div>
            <Modal
                open={isModalOpen}
                style={{
                    backgroundColor: "#181E28",
                    color: "white",
                    width: "60%",
                }}
                footer={null}
            >
                <Form layout="vertical" style={{ width: "100%" }} onFinish={onFinish}>
                    <Row
                        gutter={{
                            xs: 6,
                            sm: 10,
                            md: 12,
                            lg: 16,
                        }}
                    >
                        <Col span={24}>
                            <Form.Item
                                label="Theater Name"
                                htmlFor="name"
                                name="name"
                                rules={[{ required: true, message: "Theater name is required!" }]}
                            >
                                <Input
                                    id="name"
                                    type="text"
                                    placeholder="Enter the theater name"
                                    style={{ color: "white" }}
                                ></Input>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row
                        gutter={{
                            xs: 6,
                            sm: 10,
                            md: 12,
                            lg: 16,
                        }}
                    >
                        <Col span={24}>
                            <Form.Item
                                label="Phone Number"
                                htmlFor="phone"
                                name="phone"
                                rules={[{ required: true, message: "Phone number is required!" }]}
                            >
                                <Input
                                    id="phone"
                                    type="text"
                                    placeholder="Enter the phone number"
                                    style={{ color: "white" }}
                                ></Input>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row
                        gutter={{
                            xs: 6,
                            sm: 10,
                            md: 12,
                            lg: 16,
                        }}
                    >
                        <Col span={24}>
                            <Form.Item
                                label="Email"
                                htmlFor="email"
                                name="email"
                                rules={[{ required: true, message: "Email is required!" }]}
                            >
                                <Input
                                    id="email"
                                    type="text"
                                    placeholder="Enter the theater name"
                                    style={{ color: "white" }}
                                ></Input>
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item
                                label="Owner"
                                htmlFor="email"
                                name="email"
                                rules={[{ required: true, message: "Email is required!" }]}
                            >
                                <Input
                                    id="email"
                                    type="text"
                                    placeholder="Enter the theater name"
                                    style={{ color: "white" }}
                                ></Input>
                            </Form.Item>
                        </Col>
                        <Col>
                            <Form.Item
                                label="Select the movie language"
                                htmlFor="language"
                                name="lanaguage"
                                rules={[{ required: true, message: "Movie language is required" }]}
                                style={{ color: "white" }}
                            >
                                <Select
                                    className="select-status"
                                    id="isActive"
                                    defaultValue="Set status"
                                    style={{
                                        width: "100%",
                                        heigth: "45px",
                                    }}
                                    options={[
                                        { value: "active", label: "Active" },
                                        { value: "not-active", label: "Not Active" },
                                    ]}
                                ></Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item>
                        <Button
                            block
                            type="primary"
                            htmlType="submit"
                            style={{
                                fontSize: "1rem",
                                fontWeight: "600",
                                backgroundColor: "#1E345B",
                                marginBottom: "1rem",
                            }}
                        >
                            Submit the data
                        </Button>
                        <Button block onClick={handleCancel}>
                            Cancel
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}

export default TheaterForm;
