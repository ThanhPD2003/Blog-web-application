import { Col, Row, Table } from "react-bootstrap";
import React, { useEffect, useState } from 'react';
import '../style/Home.css';
import { Link } from "react-router-dom";
// import BlogList1 from '../images/BlogList1.jpg';
// import BlogList2 from '../images/BlogList2.jpg';
// import BlogList3 from '../images/BlogList3.jpg';
// import BlogList4 from '../images/BlogList4.jpg';
// import BlogList5 from '../images/BlogList5.jpg';
// import BlogList6 from '../images/BlogList6.jpg';

const Home = () => {

    const [blog, setBlogs] = useState([]);
    const [user, setUsers] = useState([]);
    const [categories, setCategory] = useState([]);

    useEffect(() => {
        fetch(' http://localhost:9999/blog')
            .then(resp => resp.json())
            .then(data => {
                setBlogs(data)
            })
    }, []);

    useEffect(() => {
        fetch(' http://localhost:9999/user')
            .then(resp => resp.json())
            .then(data => {
                setUsers(data)
            })
    }, []);

    useEffect(() => {
        fetch(' http://localhost:9999/category')
            .then(resp => resp.json())
            .then(data => {
                setCategory(data)
            })
    }, []);

    return (
        <Row>
            <Row>
                <Col xs={8}>
                    <tbody>
                        <div>
                            {
                                blog.map(p => (
                                    <tr key={p.id}>
                                        <div>
                                            <div>
                                                <div style={{ paddingLeft: '20%' }}>
                                                    <Row>
                                                        <div class="col-lg-6">
                                                            <a href="#!"><img class="card-img" src={p.img} alt="..." /></a>
                                                        </div>
                                                        <div class="card-body">
                                                            <div class="small text-muted">{p.create_date}</div>
                                                            <p>Author: {user.map(u => u.id === p.user_id ? u.name : '')}</p>
                                                            <h2 class="card-title h4">{p.name}</h2>
                                                            <p class="card-text">{p.content}</p>
                                                            <a class="btn btn-primary" href="#!">Read more →</a>
                                                        </div>
                                                    </Row>
                                                </div>
                                            </div>
                                        </div>
                                    </tr>
                                ))
                            }
                        </div>
                    </tbody>
                </Col>
            </Row >
        </Row >
    );

}
export default Home;