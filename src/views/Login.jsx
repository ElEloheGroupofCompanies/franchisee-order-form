import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import { Card } from "react-bootstrap";
import { useState } from "react";
import useApi from "../utils/http";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Link from "react-bootstrap/Link";
import useLocalStorage from "../hooks/useLocalStorage";

function Login() {
  const { setItem } = useLocalStorage();
  const [email, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const api = useApi();
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const body = {
        email,
        password,
      };
      const { data } = await api.post("/login", body);
      setItem("token", data.token);
      setItem("user", JSON.stringify(data.user));
      navigate("/home");
    } catch (e) {
      toast.error(e.response.data.message);
    }
  }

  return (
    <>
      <Container fluid >
      <ToastContainer />
      <Card
        className="mx-auto mt-5 mb-5"
        style={{ maxWidth: "600px", width: "100%", fontFamily: "Helvetica" }}
      >
        <Card.Body>
          <Card.Title>
            <h3 className="text-center">Login</h3>
          </Card.Title>
          <Form onSubmit={handleLogin}>
            <Form.Group
              className="mb-3"
              value={email}
              onChange={(e) => setEmailAddress(e.target.value)}
              controlId="formBasicEmail"
            >
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>
            <Form.Group
              className="mb-3"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              controlId="formBasicPassword"
            >
              <Form.Label>Password</Form.Label>
              <Form.Control
                type={showPassword ? "text" : "password"} // Change the type based on the state
                placeholder="Password"
                onClick={() => setShowPassword(!showPassword)} // Toggle password visibility on click
              />
            </Form.Group>
            <Button variant="success" type="submit">
              Submit
            </Button>
          </Form>
          <Card.Footer>Don't have an Account?<Card.Link  onClick={() => navigate("/register")}>Register</Card.Link></Card.Footer>
        </Card.Body>
      </Card>
    </Container>
    </>
  );
}

export default Login;