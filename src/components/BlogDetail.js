import { useState, useEffect } from "react";

import { Col, Container, FormLabel, Row , Button } from "react-bootstrap";
import { useParams, useNavigate } from 'react-router-dom';
// import "../styles/Detail.css"

const Detail = () => {
  const { bid } = useParams();
  const navigate = useNavigate();

  const [blog, setBlog] = useState([]);
  const [category_blog, setCategory_blog] = useState([]);
  const [author, setAuthor] = useState([]);

  useEffect(() => {
    fetch('http://localhost:9999/blog/' + bid)
      .then(resp => resp.json())
      .then(data => {
        setBlog(data)
      })
      .catch(error => {
        console.error("Error fetching blog:", error);
      });
  }, [bid]);

  useEffect(() => {
    fetch('http://localhost:9999/category_blog')
      .then(resp => resp.json())
      .then(data => {
        setCategory_blog(data)
      })
      .catch(error => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  useEffect(() => {
    fetch('http://localhost:9999/user')
      .then(resp => resp.json())
      .then(data => {
        setAuthor(data)
      })
      .catch(error => {
        console.error("Error fetching users:", error);
      });
  }, []);

  const handleApprove = () => {
    // Perform the update API call to set the status to true (approved)
    const updatedBlog = { ...blog, status: true };

    fetch(`http://localhost:9999/blog/${bid}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedBlog)
    })
      .then((response) => {
        if (response.ok) {
          alert('Blog approved successfully!');
          // Update the local state with the approved status
          setBlog(updatedBlog);
          // Navigate to '/approve' after approving
          navigate('/approve');
        } else {
          throw new Error('Error approving blog');
        }
      })
      .catch((error) => {
        console.error('Error approving blog:', error);
        alert('An error occurred while approving the blog.');
      });
  };

  const handleReject = () => {
    // Perform the delete API call for the blog with the given ID
    fetch(`http://localhost:9999/blog/${bid}`, {
      method: 'DELETE'
    })
      .then((response) => {
        if (response.ok) {
          alert('Blog rejected and deleted successfully!');
          // Navigate to '/approve' after rejecting
          navigate('/approve');
        } else {
          throw new Error('Error rejecting and deleting blog');
        }
      })
      .catch((error) => {
        console.error('Error rejecting and deleting blog:', error);
        alert('An error occurred while rejecting and deleting the blog.');
      });
  };
  return (
    <Container>
      <Row style={{ justifyContent: "center" }}>
        <Col xs={7}>
          <div>
            <label>
              Category: {category_blog.map((c) => (c.id === blog.cate_id ? c.name : ''))}
            </label>
            <h1>{blog.name}</h1>
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
          <div>
          </div>
          <div className="content">{blog.content}</div>

          {/* Show the Approve and Reject buttons if the status is false */}
          {!blog.status && (
            <div className="d-flex justify-content-end mt-4">
              <Button variant="success" onClick={handleApprove}>
                Approve
              </Button>
              <Button variant="danger" className="ml-2" onClick={handleReject}>
                Reject
              </Button>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
}


export default Detail;
