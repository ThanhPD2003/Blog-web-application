import { Col, Row, Pagination } from "react-bootstrap";
import React, { useEffect, useState } from 'react';
import '../style/UserProfile.css';
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";

const UserProfile = () => {
    const { uid } = useParams();
    const [user, setUser] = useState({});
    const [editMode, setEditMode] = useState(false);
    const [editedUser, setEditedUser] = useState({});

    useEffect(() => {
        fetch('http://localhost:9999/user/' + uid)
            .then(resp => resp.json())
            .then(data => {
                setUser(data);
                setEditedUser(data);
            })
    }, [uid]);

    const handleEditProfile = () => {
        setEditMode(true);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setEditedUser(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    return (
        <div className="container emp-profile">
            <div className="row">
                <div className="col-md-4">
                    <div className="profile-img">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS52y5aInsxSm31CvHOFHWujqUx_wWTS9iM6s7BAm21oEN_RiGoog" alt="" />
                        <div className="file btn btn-lg btn-primary">
                            Change Photo
                            <input type="file" name="file" />
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="profile-head">
                        <h5>
                            {user.name}
                        </h5>
                        <ul className="nav nav-tabs" id="myTab" role="tablist">
                            <li className="nav-item">
                                <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">About</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="col-md-2">
                        <Link to={`/update/${uid}`}><button className="profile-edit-btn">Edit Profile</button></Link>
                </div>
            </div>
            <div className="row">
                <div className="col-md-8">
                    <div className="tab-content profile-tab" id="myTabContent">
                        <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                            <div className="row">
                                <div className="col-md-6">
                                    <label>Name</label>
                                </div>
                                <div className="col-md-1">                                  
                                </div>
                                <div className="col-md-5">                                  
                                        <p>{user.name}</p>                                   
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <label>Email</label>
                                </div>
                                <div className="col-md-1">                                  
                                </div>
                                <div className="col-md-5">
                                        <p>{user.email}</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <label>Phone</label>
                                </div>
                                <div className="col-md-1">                                  
                                </div>
                                <div className="col-md-5">
                                        <p>{user.phone}</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <label>Address</label>
                                </div>
                                <div className="col-md-1">                                  
                                </div>
                                <div className="col-md-5">
                                        <p>{user.address}</p>                                   
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserProfile;