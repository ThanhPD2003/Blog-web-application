import { Col, Row, Table, Pagination } from "react-bootstrap";
import React, { useEffect, useState } from 'react';
import '../style/Home.css';
import { Link } from "react-router-dom";

const BlogList = () => {
    const [blogs, setBlogs] = useState([]);
    const [user, setUsers] = useState([]);
    const [categories, setCategory] = useState([]);
    const [checkedState, setCheckedState] = useState([]);
    const [radioFilter, setRadioFilter] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 5;

    useEffect(() => {
        fetch('http://localhost:9999/user')
            .then(resp => resp.json())
            .then(data => {
                setUsers(data)
            })
            .catch(error => {
                console.error("Error fetching users:", error);
            });
    }, []);

    useEffect(() => {
        fetch('http://localhost:9999/blog')
            .then(resp => resp.json())
            .then(data => {
                // Filter the blogs where blog.status is true
                const filteredBlogs = data.filter(blog => blog.status === true);

                // Update the blogs state with the filtered blogs
                setBlogs(filteredBlogs);

                // Calculate the total number of pages for pagination
                const totalPages = Math.ceil(filteredBlogs.length / postsPerPage);

                // Reset the current page to 1 when filtering changes
                setCurrentPage(1);
            })
            .catch(error => {
                console.error("Error fetching blogs:", error);
            });
    }, [checkedState]);

    useEffect(() => {
        fetch('http://localhost:9999/category_blog')
            .then(resp => resp.json())
            .then(data => {
                setCategory(data);
            })
            .catch(error => {
                console.error("Error fetching categories:", error);
            });
    }, []);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleFilterChecked = (e, category) => {
        const categoryId = category.id;
        if (checkedState.includes(categoryId)) {
            // User ID is already present, remove it
            setCheckedState(checkedState.filter((id) => id !== categoryId));
        } else {
            // User ID is not present, add it
            setCheckedState([...checkedState, categoryId]);
        }
    };

    return (
        <Row>
            <Col xs={8}>
                <tbody>
                    <div>
                        {
                            blogs.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage).map(p => (
                                <tr key={p.id}>
                                    <div style={{ paddingLeft: '30%' }}>
                                        <Row>
                                            <div className="col-lg-6">
                                                <Link to={'/detail/' + p.id}>
                                                    <img className="card-img" src={p.img} alt="..." />
                                                </Link>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="card-body">
                                                    <div className="small text-muted">
                                                        {p.create_date}
                                                    </div>
                                                    <p>Author: {user.map(u =>
                                                        (u.id === p.user_id ? u.name : '')
                                                    )}</p>
                                                    <p>Category: {categories.map(c =>
                                                        (c.id === p.cate_id ? c.name : '')
                                                    )}</p>
                                                    <h2 className="card-title h4">
                                                        {p.name}
                                                    </h2>
                                                    <p className="card-text">{
                                                        p.content.split(' ').length > 50 ? `${p.content.split(' ').slice(0, 25).join(' ')}...` : p.content}</p>
                                                    <Link to={'/detail/' + p.id} className="btn btn-primary">Read more →</Link>
                                                    <a className="btn btn-primary" href="#!">
                                                        Read more →
                                                    </a>
                                                </div>
                                            </div>
                                        </Row>
                                    </div>
                                </tr>
                            ))
                        }
                    </div>
                    <Col xs={12} className="d-flex justify-content-center mt-4">
                        <Pagination>
                            {Array.from({ length: Math.ceil(blogs.length / postsPerPage) }).map((_, index) => (
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
                </tbody>
            </Col>
            <div style={{ paddingLeft: '10%' }}>
                Category
                {categories.map((category) => (
                    <div key={category.id}>
                        <input type="checkbox" checked={checkedState.includes(category.id)} onChange={(e) => handleFilterChecked(e, category)} />
                        <span>{category.name}</span>
                    </div>
                ))}
            </div>

        </Row>
    );
}

export default BlogList;