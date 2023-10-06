import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { savedFetchImg } from "../actions";
import { toast } from "react-toastify";
import { Col, Container, Row } from "react-bootstrap";
import ImageCard from "../ImageCard";
import nodata from "../assets/nodata.jpg";

function UserImages() {
  const [images, setImages] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem("user"));
    if (!auth) {
      navigate("/login");
    }
    // console.warn(auth);
    const fetchData = async () => {
      const result = await savedFetchImg(auth.id);
      if (result.status === 201) {
        setImages(result.data);
      } else {
        toast.error(result.error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <Container fluid>
        <Row>
          {images.length!=0 ?
            images.map((item) => (
              <Col xs={4} lg={4} key={item._id} className="mb-3">
                <div className="shadow p-3 bg-white rounded">
                  <ImageCard data={item} />
                </div>
              </Col>
            )) :
            <Col xs={{span:6,offset:3}} lg={4} className="my-5 shadow bg-white rounded">
              <h1>No Data</h1>
               <img src={nodata} alt="no-data" className="w-100" />
            </Col>
            }
        </Row>
      </Container>
    </div>
  );
}

export default UserImages;
