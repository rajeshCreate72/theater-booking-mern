import { Modal, Form, Row, Col, Input, Select, Button } from "antd";
import TextArea from "antd/es/input/TextArea";
import { addMovie } from "../../api/movies";

function MovieForm({ isModalOpen, setIsModalOpen }) {
    const onFinish = async (values) => {
        const response = await addMovie(values);
        console.log(response);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <Modal
            open={isModalOpen}
            style={{
                backgroundColor: "#181E28",
                color: "white",
                width: "60%",
            }}
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
                            label="Movie Name"
                            htmlFor="title"
                            name="title"
                            rules={[{ required: true, message: "Movie name is required!" }]}
                        >
                            <Input
                                id="title"
                                type="text"
                                placeholder="Enter the movie name"
                                style={{ color: "white" }}
                            ></Input>
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item
                            label="Description"
                            htmlFor="description"
                            name="description"
                            rules={[{ required: true, message: "Description required" }]}
                        >
                            <TextArea
                                id="description"
                                rows="4"
                                placeholder="Enter the movie's description"
                                style={{ color: "white" }}
                            ></TextArea>
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Row
                            gutter={{
                                xs: 6,
                                sm: 10,
                                md: 12,
                                lg: 16,
                            }}
                        >
                            <Col span={8}>
                                <Form.Item
                                    label="Movie Duriation(in min)"
                                    htmlFor="duration"
                                    name="duration"
                                    rules={[
                                        { required: true, message: "Movie duriation is required" },
                                    ]}
                                >
                                    <Input
                                        id="duration"
                                        type="number"
                                        placeholder="Enter the movie duration"
                                        style={{ color: "white" }}
                                    ></Input>
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item
                                    label="Select the movie language"
                                    htmlFor="language"
                                    name="lanaguage"
                                    rules={[
                                        { required: true, message: "Movie language is required" },
                                    ]}
                                    style={{ color: "white" }}
                                >
                                    <Select
                                        id="language"
                                        defaultValue="Select language"
                                        style={{
                                            width: "100%",
                                            heigth: "45px",
                                            backgroundColor: "#1E345B",
                                            color: "white",
                                        }}
                                        options={[
                                            { value: "English", label: "English" },
                                            { value: "Hindi", label: "Hindi" },
                                            { value: "Panjabi", label: "Panjabi" },
                                            { value: "Telugu", label: "Telugu" },
                                            { value: "Bengali", label: "Bengali" },
                                            { value: "Japanese", label: "Japanese" },
                                            { value: "German", label: "German" },
                                        ]}
                                    ></Select>
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item
                                    label="Release Date"
                                    htmlFor="Release Date"
                                    name="releaseDate"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Movie release date is required",
                                        },
                                    ]}
                                >
                                    <Input
                                        id="releaseDate"
                                        type="date"
                                        placeholder="Choose the release date"
                                        style={{ color: "white" }}
                                    ></Input>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={24}>
                        <Row
                            gutter={{
                                xs: 6,
                                sm: 10,
                                md: 12,
                                lg: 16,
                            }}
                        >
                            <Col span={8}>
                                <Form.Item
                                    label="Select movie genre"
                                    htmlFor="genre"
                                    name="genre"
                                    rules={[{ required: true, message: "Movie genre is required" }]}
                                >
                                    <Select
                                        defaultValue="Select Movie"
                                        style={{
                                            width: "100%",
                                            backgroundColor: "#1E345B",
                                            color: "white",
                                        }}
                                        options={[
                                            { value: "Action", label: "Action" },
                                            { value: "Comedy", label: "Comedy" },
                                            { value: "Horror", label: "Horror" },
                                            { value: "Romance", label: "Romance" },
                                            { value: "Patriot", label: "Patriot" },
                                            { value: "Bhakti", label: "Bhakti" },
                                            { value: "Thriller", label: "Thriller" },
                                            { value: "Mystery", label: "Mystery" },
                                        ]}
                                    ></Select>
                                </Form.Item>
                            </Col>
                        </Row>
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
    );
}

export default MovieForm;
