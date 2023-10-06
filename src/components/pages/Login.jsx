import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row, Form, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import { loginUser } from "../actions";
import { useNavigate } from "react-router-dom";

function Login({ setIsLogin }) {
  const [isLoading, setisLoading] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  //chcek if user is there
  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem("user"));
    if (auth) {
      setIsLogin(auth);
      navigate("/");
    }
  }, [setIsLogin, navigate]);

  // handle Login
  const handleLogin = async () => {
    setisLoading(true)
    if (formData.email === "" || formData.password === "") {
      toast.error("All Filed are Required");
      setisLoading(false)
      return;
    }
    const loginData = await loginUser(formData);
    if (loginData.status === 201) {
      toast.success(loginData.message);
      localStorage.setItem("user", JSON.stringify(loginData.data));
      setIsLogin(loginData.data);
      setisLoading(false)
      navigate("/");
    } else {
      setisLoading(false)
      toast.error(loginData.error);
    }
    setisLoading(false)
    // console.warn("Login details",loginData);
  };

  return (
    <div>
      <Container fluid className="my-3">
        <Row>
          <Col  lg={{span:6,offset:3}} md={12} sm={12} xs={12}>
            <Card className="my-3 shadow p-3 mb-5 bg-white rounded">
              <Card.Body>
                <Card.Title className="text-center">Login
                <h1 className="display-1">{isLoading && <Spinner animation="border" variant="primary" />}</h1>
                </Card.Title>
                <Card.Text>
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
                  <Button variant="primary" onClick={handleLogin}>
                    Submit
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

export default Login;
