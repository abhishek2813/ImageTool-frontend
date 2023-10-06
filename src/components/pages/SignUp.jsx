import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { signupUser } from "../actions";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  //chcek if user is there
  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem("user"));
    if (auth) {
      navigate("/");
    }
  }, [navigate]);

  //handle signup
  const handleSignup = async () => {
    if (
      formData.name === "" ||
      formData.email === "" ||
      formData.password === ""
    ) {
      toast.error("All Filed are Required");
      return;
    }
    const signup = await signupUser(formData);
    if (signup.status === 201) {
      toast.success(signup.message);
      navigate("/login");
    } else {
      toast.error(signup.error);
    }
    console.warn("signup details", signup);
  };

  return (
    <div>
      <Container fluid className="my-3">
        <Row>
          <Col xs={{ span: 6, offset: 3 }}>
            <Card className="my-3 shadow p-3 mb-5 bg-white rounded">
              <Card.Body>
                <Card.Title className="text-center">Signup</Card.Title>
                <Card.Text>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Full name"
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      value={formData.name}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      name="email"
                      value={formData.email}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                      name="password"
                      value={formData.password}
                    />
                  </Form.Group>
                  <Button variant="primary" onClick={handleSignup}>
                    SignUp
                  </Button>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default SignUp;
