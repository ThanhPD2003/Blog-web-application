import { Col, Container, Row } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import "../style/Home.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Home = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:9999/blog");
        const data = await response.json();
        setBlogs(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Lấy dữ liệu ảnh cho các slide
  const slideImages = blogs
    .filter((blog) => [1, 2, 3].includes(blog.id)) // Chỉ lấy blog với blog_id là 1, 2, 3
    .map((blog) => ({ img: blog.img, name: blog.name }));

  // Cấu hình cho slider (sử dụng trong trường hợp này)
  const sliderSettings = {
    dots: true, // Hiển thị điểm chuyển tiếp
    infinite: true, // Lặp vô hạn
    speed: 500,
    slidesToShow: 1, // Hiển thị 1 ảnh trên mỗi slide
    slidesToScroll: 1,
    autoplay: true, // Tự động chuyển tiếp ảnh
    autoplaySpeed: 3000, // Thời gian chờ giữa các lượt chuyển tiếp (3000ms = 3 giây)
  };

  return (
    <Row >
        <Col xs={12} >
          <div className="container">
            <Slider {...sliderSettings}>
              {slideImages.map((slide, index) => (
                <div key={index} className="slide-item">
                  <img src={slide.img} alt={`Slide ${index + 1}`} />
                  <p className="slide-name"> {slide.name}</p>
                </div>
              ))}
            </Slider>
          </div>
        </Col>
      <Container className="home-component">
        <Row>
          <Col xs={12}>
            <h1>Front-End Web Development with React</h1>
          </Col>
        </Row>
      </Container>
    </Row>
  );
};

export default Home;
