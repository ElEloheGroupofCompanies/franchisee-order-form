import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import { Card } from "react-bootstrap";
import { useState } from "react";
import useApi from "../utils/http";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import useLocalStorage from "../hooks/useLocalStorage";
import Link from "react-bootstrap/Link";

function Register() {
  const { setItem } = useLocalStorage();
  const [name, setName] = useState("");
  const [email, setEmailAddress] = useState("");
  const [business_name, setBusinessName] = useState("");
  const [outlet, setOutlet] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");
  const api = useApi();
  const navigate = useNavigate();

  async function handleRegister(e) {
    e.preventDefault();
    try {
      const body = {
        name,
        email,
        business_name,
        outlet,
        address,
        password,
        password_confirmation,
      };
      const { data } = await api.post("/register", body);
      setItem("token", data.token);
      setItem("user", JSON.stringify(data.user));
      navigate("/home");
    } catch (e) {
      if (e.response && e.response.data) {
        toast.error(e.response.data.message);
      } else {
        toast.error("An error occurred during registration.");
      }
    }
  }

  return (
    <>
          <Container fluid>
      <ToastContainer />
      <Card
        className="mx-auto mb-5 mt-5"
        style={{ maxWidth: "600px", width: "100%", fontFamily: "Helvetica" }}
      >
        <Card.Body>
          <Card.Title>
            <h3 className="text-center">Register</h3>
          </Card.Title>
          <Form onSubmit={handleRegister}>
            <Form.Group
              className="mb-3"
              value={name}
              onChange={(e) => setName(e.target.value)}
            >
              <Form.Label>Full Name</Form.Label>
              <Form.Control type="text" placeholder="Full Name" />
            </Form.Group>
           
            <Form.Group
              className="mb-3"
              value={email}
              onChange={(e) => setEmailAddress(e.target.value)}
            >
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>
            <Form.Group
              className="mb-3"
              value={business_name}
              onChange={(e) => setBusinessName(e.target.value)}
            >
              <Form.Label>Business Name</Form.Label>
              <Form.Control type="text" placeholder="Business Name" />
            </Form.Group>
            <Form.Group
              className="mb-3"
              value={outlet}
              onChange={(e) => setOutlet(e.target.value)}
            >
              <Form.Label>Outlet</Form.Label>
              <Form.Control type="text" placeholder="Outlet" />
            </Form.Group>
            <Form.Group
              className="mb-3"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            >
              <Form.Label>Address</Form.Label>
              <Form.Control type="text" placeholder="Address" />
            </Form.Group>
            <Form.Group
              className="mb-3"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            >
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Form.Group
              className="mb-3"
              value={password_confirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
            >
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Confirm Password" />
            </Form.Group>
            <Button variant="info" type="submit">
              Submit
            </Button>
          </Form>
          <Card.Footer>Already have an Account?<Card.Link  onClick={() => navigate("/")}>Login</Card.Link></Card.Footer>
        </Card.Body>
      </Card>
      <ToastContainer />
      </Container>
    </>
  );
}

export default Register;