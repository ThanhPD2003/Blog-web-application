import { Col, Row, Pagination } from "react-bootstrap";
import React, { useEffect, useState } from 'react';
import '../style/Home.css';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUsers] = useState([]);
  const [categories, setCategory] = useState([]);
  const [checkList, setCheckList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchName, setSearchName] = useState('');
  const [filteredResults, setFilteredResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const postsPerPage = 5;

  useEffect(() => {
    fetch('http://localhost:9999/user')
      .then(resp => resp.json())
      .then(data => {
        setUsers(data)
      })
  }, []);

  useEffect(() => {
    console.log(checkList);
    fetch('http://localhost:9999/blog')
      .then(res => res.json())
      .then(data => {
        let newBlogs = [];
        if (checkList.length > 0) {
          checkList.forEach(uId => {
            newBlogs = [...newBlogs, ...data.filter(t => t.cate_id === uId)];
          });
          setBlogs(newBlogs);
        } else {
          setBlogs(data);
        }
        setFilteredResults([]);
        setShowSearchResults(false);
        setCurrentPage(1);
      })
  }, [checkList]);

  useEffect(() => {
    fetch('http://localhost:9999/category_blog')
      .then(resp => resp.json())
      .then(data => {
        setCategory(data)
      })
  }, []);

  const addCheckList = (e, uid) => {
    if (e.target.checked)
      setCheckList(current => [...current, uid]);
    else
      setCheckList(current => current.filter(id => { return id !== uid }))
  }

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearchChange = (e) => {
    setSearchName(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchName.trim() !== '') {
      const filteredBlogs = blogs.filter(blog =>
        blog.name.toLowerCase().includes(searchName.toLowerCase())
      );
      setFilteredResults(filteredBlogs);
      setCurrentPage(1);
      setShowSearchResults(true);
    } else {
      setFilteredResults([]);
      setCurrentPage(1);
      setShowSearchResults(false);
    }
  };

  return (
    <Row>
      <Col xs={8}>
        {((showSearchResults ? filteredResults : blogs).length > 0) ? (
          <table>
            <tbody>
              {(showSearchResults ? filteredResults : blogs).slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage).map(p => (
                <tr key={p.id}>
                  <td style={{ paddingLeft: '30%' }}>
                    <Row>
                      <div className="col-lg-6">
                        <a href="#!">
                          <img className="card-img" src={p.img} alt="..." />
                        </a>
                      </div>
                      <div className="col-lg-6">
                        <div className="card-body">
                          <div className="small text-muted">{p.create_date}</div>
                          <p>Author: {user.map(u => (u.id === p.user_id ? u.name : ''))}</p>
                          <p>Category: {categories.map(c => (c.id === p.cate_id ? c.name : ''))}</p>
                          <h2 className="card-title h4">{p.name}</h2>
                          <p className="card-text">{p.content.split(' ').length > 50
                            ? `${p.content.split(' ').slice(0, 25).join(' ')}...`
                            : p.content}</p>
                          <a className="btn btn-primary" href="#!">
                            Read more →
                          </a>
                        </div>
                      </div>
                    </Row>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No blogs found.</p>
        )}
        <Col xs={12} className="d-flex justify-content-center mt-4">
          <Pagination>
            {Array.from({ length: Math.ceil((showSearchResults ? filteredResults : blogs).length / postsPerPage) }).map((_, index) => (
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
      <div style={{ paddingLeft: '10%' }}>
        <div>
          <div>
            <form onSubmit={handleSearchSubmit}>
              Search by name:
              <input type="text" value={searchName} onChange={handleSearchChange} />
              <button type="submit">Search</button>
            </form>
          </div>
          Category
          {categories.map((category) => (
            <div key={category.id}>
              <input type='checkbox' onChange={e => addCheckList(e, category.id)} />
              <span>{category.name}</span>
            </div>
          ))}
        </div>
      </div>
    </Row>
  );
}

export default BlogList;
