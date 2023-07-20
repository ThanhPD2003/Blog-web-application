import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { Col, Container, FormLabel, Row } from "react-bootstrap";
// import "../styles/Detail.css"

const Detail = () => {
  const { bid } = useParams();

  const [blog, setBlog] = useState([]);
  const [category_blog, setCategory_blog] = useState([]);
  const [author, setAuthor] = useState([]);

  useEffect(() => {
    fetch('http://localhost:9999/blog/' + bid)
      .then(resp => resp.json())
      .then(data => {
        setBlog(data)
      })
  }, [bid]);


  useEffect(() => {
    fetch('http://localhost:9999/category_blog')
      .then(resp => resp.json())
      .then(data => {
        setCategory_blog(data)
      })
  }, []);

  useEffect(() => {
    fetch('http://localhost:9999/user')
      .then(resp => resp.json())
      .then(data => {
        setAuthor(data)
      })
  }, []);

  return (
    <Container>
      <Row style={{ justifyContent: "center" }}>
        <Col xs={7} >
          <div >
            <label >
              Category: {category_blog.map((c) => (c.id === blog.cate_id ? c.name : ''))}
            </label>
            <h1 >{blog.name}</h1>
            <i style={{ opacity: 0.8 }}>
              Author: {author.map((a) => (a.id === blog.user_id ? a.name : ''))}
            </i>
            <div className="create-date">This blog was written in: {blog.create_date}</div>
          </div>
          <div className="text-center align-items-center">
            <img
              src={blog.img}
              alt="Blog Image"
              className="img-fluid rounded mb-3 detail-image"
              style={{ maxHeight: "300px", width: "100%" }}
            />
          </div>
          <div >
          </div>
          <div className="content">{blog.content}</div>
        </Col>
      </Row>
    </Container>
  );
}

export default Detail