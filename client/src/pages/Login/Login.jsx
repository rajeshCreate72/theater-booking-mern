import { Button, Form, Input } from "antd";
import { LoginUser } from "../../api/users";
import "./Login.css";

function Login() {
  const onFinish = async (values) => {
    const response = await LoginUser(values);
    console.log(response);
  };
  return (
    <header className="App-header">
      <main className="main-area">
        <section className="left-section">
          <h1>Login to BookMyShow</h1>
        </section>
        <section>
          <Form
            layout="vertical"
            onFinish={onFinish}
            style={{ maxWidth: "600px" }}
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
                style={{ height: "5vh" }}
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
                style={{ height: "5vh" }}
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
                  height: "5vh",
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
