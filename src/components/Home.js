import { Col, Row} from "react-bootstrap";
import React, { useEffect, useState } from 'react';
import '../style/Home.css';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
// import BlogList1 from '../images/BlogList1.jpg';
// import BlogList2 from '../images/BlogList2.jpg';
// import BlogList3 from '../images/BlogList3.jpg';
// import BlogList4 from '../images/BlogList4.jpg';
// import BlogList5 from '../images/BlogList5.jpg';
// import BlogList6 from '../images/BlogList6.jpg';

const Home = () => {

    const [blogs, setBlogs] = useState([]);
    const [user, setUsers] = useState([]);
    const [categories, setCategory] = useState([]);

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

    useEffect(() => {
        fetch(' http://localhost:9999/blog')
            .then(resp => resp.json())
            .then(data => {
                setBlogs(data.slice(0, 4))
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
        fetch(' http://localhost:9999/category_blog')
            .then(resp => resp.json())
            .then(data => {
                setCategory(data)
            })
    }, []);

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
        height: "100vh",
        width: "100vw",
    };

    return (
        <div>
            <Col>
                <div className="container">
                    <Slider {...sliderSettings}>
                        {slideImages.map((slide, index) => (
                            <div key={index} className="slide-item">
                            <Link to={'/detail/'+ (index+1)}>
                                <img src={slide.img}  alt={`Slide ${index + 1}`} />
                            </Link>
                                <p className="slide-name"> {slide.name}</p>
                            </div>
                        ))}
                    </Slider>
                </div>
            </Col>
            <Col xs={12} >
            <h2 style={{ marginTop: '30px', marginLeft: '15%'}}>New Blogs: </h2>
            </Col>
            <div>
                <div class="container">
                    {
                        blogs.map(p => (
                            <tr key={p.id}>
                                <div class="row">
                                    <Row>
                                        <div class="col" className="content">
                                            <Link to={'/detail/'+ p.id}>
                                                <img className="image" src={p.img} alt="..." />
                                            </Link>
                                        </div>
                                        <div class="col"> {/* Add a column wrapper for the second div */}
                                            <div className="card-body">
                                                <div className="small text-muted">{p.create_date}</div>
                                                <p>Author: {user.map(u => (u.id === p.user_id ? u.name : ''))}</p>
                                                <p>Category: {categories.map(c => (c.id === p.cate_id ? c.name : ''))}</p>
                                                <h2 className="card-title h4">{p.name}</h2>
                                                <p className="card-text">{p.content.split(' ').length > 50
                                                    ? `${p.content.split(' ').slice(0, 25).join(' ')}...`
                                                    : p.content}</p>

                                                <Link to={'/detail/'+ p.id} className="btn btn-primary">Read more →</Link>
                                                
                                            </div>
                                        </div>
                                    </Row>
                                </div>
                            </tr>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}
export default Home;


