import React, { useEffect, useState } from 'react';
import '../style/UserProfile.css';
import { Link, useParams } from 'react-router-dom';
import { CloudinaryContext, upload } from 'cloudinary-react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const cloudinaryConfig = {
    presetKey: 's67nuwqf',
    cloudName: 'dayubishj',
    apiKey: '847367825969199',
    apiSecret: 'MBNbpIcpr2W0IbLT7tKJFzsBdEI',
};

const UpdateProfile = () => {
    const { uid } = useParams();

    const [user, setUser] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        fetchUser();
    }, []);

    const fetchUser = () => {
        fetch(`http://localhost:9999/user/${uid}`)
            .then((response) => response.json())
            .then((data) => {
                setUser(data)
                setName(data.name);
                setEmail(data.email);
                setAddress(data.address);
                setPhone(data.phone);
            })
            .catch((error) => {
                console.error('Update error', error);
            });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Prepare the updated user data
        const updatedUser = {
            id: user.id,
            name: name,
            email: email,
            address: address,
            phone: phone
        };

        // Perform the update API call
        fetch(`http://localhost:9999/user/${uid}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedUser)
        })
            .then((response) => {
                if (response.ok) {
                    alert('Profile updated successfully!');
                } else {
                    throw new Error('Error updating user');
                }
            })
            .catch((error) => {
                console.error('Error updating user:', error);
                alert('An error occurred while updating the profile.');
            });
    }
    const handleEditProfile = () => {
        setEditMode(true);
    };

    return (
        <div className="container emp-profile">
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
                                Update Profile
                            </h5>
                            <ul className="nav nav-tabs" id="myTab" role="tablist">
                                <li className="nav-item">
                                    <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">About</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="tab-content profile-tab" id="myTabContent">
                            <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                {user && (
                                    <form onSubmit={handleSubmit}>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>Name</label>
                                            </div>
                                            <div className="col-md-4">
                                            </div>
                                            <div className="col-md-2">
                                                <input
                                                    className="btn btn-blue"
                                                    type="text"
                                                    name="name"
                                                    value={name || ''}
                                                    onChange={(e) => setName(e.target.value)}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>Email</label>
                                            </div>
                                            <div className="col-md-4">
                                            </div>
                                            <div className="col-md-2">
                                                <input
                                                    class="btn btn-blue"
                                                    type="text"
                                                    name="email"
                                                    value={email || ''}
                                                    onChange={(e) => setEmail(e.target.value)} required
                                                />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>Phone</label>
                                            </div>
                                            <div className="col-md-4">
                                            </div>
                                            <div className="col-md-2">
                                                <input
                                                    class="btn btn-blue"
                                                    type="text"
                                                    name="phone"
                                                    value={phone || ''}
                                                    onChange={(e) => setPhone(e.target.value)} required
                                                />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>Address</label>
                                            </div>
                                            <div className="col-md-4">
                                            </div>
                                            <div className="col-md-2">
                                                <input
                                                    class="btn btn-blue"
                                                    type="text"
                                                    name="profession"
                                                    value={address || ''}
                                                    onChange={(e) => setAddress(e.target.value)} required
                                                />
                                            </div>
                                        </div>
                                        <div className="center">
                                            <button className="profile-edit-btn2" type="submit">Save Profile</button>
                                        </div>
                                    </form>
                                )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    )
};
export default UpdateProfile;