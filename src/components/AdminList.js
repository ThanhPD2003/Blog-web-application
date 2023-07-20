import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Col, Row, Table, Pagination, Button } from 'react-bootstrap';
import '../style/Home.css';

const AdminBlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [users, setUsers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checkedState, setCheckedState] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const postsPerPage = 5;

  useEffect(() => {
    fetchBlogs();
    fetchUsers();
    fetchCategories();
  }, []);

  const fetchBlogs = () => {
    fetch('http://localhost:9999/blog')
      .then((resp) => resp.json())
      .then((data) => {
        setBlogs(data);
      })
      .catch((error) => {
        console.error('Error fetching blogs:', error);
      });
  };

  const fetchUsers = () => {
    fetch('http://localhost:9999/user')
      .then((resp) => resp.json())
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
      });
  };

  const fetchCategories = () => {
    fetch('http://localhost:9999/category_blog')
      .then((resp) => resp.json())
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
      });
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleFilterChecked = (e, category) => {
    const categoryId = category.id;
    if (checkedState.includes(categoryId)) {
      // Category ID is already present, remove it
      setCheckedState((prevState) => prevState.filter((id) => id !== categoryId));
    } else {
      // Category ID is not present, add it
      setCheckedState((prevState) => [...prevState, categoryId]);
    }
  };

  const handleEdit = (blogId) => {
    // Handle navigation to the edit page programmatically using history.push
    navigate(`/edit/${blogId}`);
  };

  const handleDelete = (blogId) => {
    // Perform the delete API call for the blog with the given ID
    fetch(`http://localhost:9999/blog/${blogId}`, {
      method: 'DELETE'
    })
      .then((response) => {
        if (response.ok) {
          alert('Blog deleted successfully!');
          // Fetch the updated blog list after deletion
          fetchBlogs();
        } else {
          throw new Error('Error deleting blog');
        }
      })
      .catch((error) => {
        console.error('Error deleting blog:', error);
        alert('An error occurred while deleting the blog.');
      });
  };

  const totalPages = Math.ceil(blogs.length / postsPerPage);
  const paginatedBlogs = blogs.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage);

  return (
    <Row>
      <Col xs={1}></Col>
      <Col xs={10}>
        <Table striped bordered>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Date</th>
              <th>Brief Info</th>
              <th>Author</th>
              <th>Category</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedBlogs.map((blog) => (
              <tr key={blog.id}>
                <td>
                  {blog.id}
                </td>
                <td >{blog.name}</td>
                <td>{blog.create_date}</td>
                <td>{blog.brief_info}</td>
                <td>{users.find((user) => user.id === blog.user_id)?.name || ''}</td>
                <td>{categories.find((category) => category.id === blog.cate_id)?.name || ''}</td>
                <td>
                  <Button variant="primary" onClick={() => handleEdit(blog.id)}>
                    Edit
                  </Button>{' '}
                  <Button variant="danger" onClick={() => handleDelete(blog.id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Col xs={12} className="d-flex justify-content-center mt-4">
          <Pagination>
            {Array.from({ length: totalPages }).map((_, index) => (
              <Pagination.Item
                key={index + 1}
                active={currentPage === index + 1}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </Pagination.Item>
            ))}
          </Pagination>
        </Col>
      </Col>
    </Row>
  );
};

export default AdminBlogList;