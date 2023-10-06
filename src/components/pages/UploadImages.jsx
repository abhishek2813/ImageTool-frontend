import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { uploadFetchImg } from "../actions";
import { toast } from "react-toastify";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import ImageCard from "../ImageCard";
import nodata from "../assets/nodata.jpg";

function UploadImages() {
  const [isLoading, setisLoading] = useState(true);
  const [images, setImages] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem("user"));
    if (!auth) {
      navigate("/login");
    }
    // console.warn(auth);
    const fetchData = async () => {
      const result = await uploadFetchImg(auth.id);
      if (result.status === 201) {
        setImages(result.data);
      } else {
        toast.error(result.error);
      }
    };
    fetchData();
    setisLoading(false)
  }, []);
  
  return (
    <div>
      <Container fluid>
        <Row>
        <h1 className="display-1 text-center">{isLoading && <Spinner animation="border" variant="primary" />}</h1>
          {images.length!==0 ?
            images.map((item) => (
              <Col lg={4} md={4} sm={6} xs={6}  key={item._id} className="mb-3">
                <div className="shadow p-3 bg-white rounded">
                  <ImageCard data={item} />
                </div>
              </Col>
            )) :
            <Col lg={6} md={6} sm={12} xs={10} className="my-5 shadow bg-white rounded">
              <h1>No Data</h1>
               <img src={nodata} alt="no-data" className="w-100" />
            </Col>
            }
        </Row>
      </Container>
    </div>
  );
}

export default UploadImages;
