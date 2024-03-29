import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Col, Row, Table, Pagination, Button } from 'react-bootstrap';
import '../style/Home.css';

const UnapprovedBlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [users, setUsers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checkedState, setCheckedState] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
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

  const filteredBlogs = blogs.filter((blog) => blog.status === false && (checkedState.length === 0 || checkedState.includes(blog.cate_id)));
  const totalPages = Math.ceil(filteredBlogs.length / postsPerPage);
  const paginatedBlogs = filteredBlogs.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage);

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
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedBlogs.map((blog) => (
              <tr key={blog.id}>
                <td>{blog.id}</td>
                <td>{blog.name}</td>
                <td>{blog.create_date}</td>
                <td>{blog.brief_info}</td>
                <td>{users.find((user) => user.id === blog.user_id)?.name || ''}</td>
                <td>{categories.find((category) => category.id === blog.cate_id)?.name || ''}</td>
                <td>{blog.status ? 'Approved' : 'Unapproved'}</td>
                <td>
                  <Link to={`/detail/${blog.id}`}>
                    <Button variant="primary">Show Detail</Button>
                  </Link>
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

export default UnapprovedBlogList;
