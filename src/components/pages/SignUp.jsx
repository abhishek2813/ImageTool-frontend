import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Row,
  Form,
  Spinner,
} from "react-bootstrap";
import { toast } from "react-toastify";
import { signupUser } from "../actions";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [isLoading, setisLoading] = useState(false);
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
    setisLoading(true);
    if (
      formData.name === "" ||
      formData.email === "" ||
      formData.password === ""
    ) {
      toast.error("All Filed are Required");
      setisLoading(false);
      return;
    }
    const signup = await signupUser(formData);
    if (signup.status === 201) {
      toast.success(signup.message);
      setisLoading(false);
      navigate("/login");
    } else {
      setisLoading(false);
      toast.error(signup.error);
    }
    setisLoading(false);
    // console.warn("signup details", signup);
  };

  return (
    <div>
      <Container fluid className="my-3">
        <Row>
          <Col lg={{ span: 6, offset: 3 }} md={12} sm={12} xs={12}>
            <Card className="my-3 shadow p-3 mb-5 bg-white rounded">
              <Card.Body>
                <Card.Title className="text-center">
                  Signup
                  <h1 className="display-1">
                    {isLoading && (
                      <Spinner animation="border" variant="primary" />
                    )}
                  </h1>
                </Card.Title>
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
