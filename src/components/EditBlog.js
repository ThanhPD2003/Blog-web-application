import React, { useState, useEffect, useContext } from 'react';
import '../style/EditBlog.css';
import { useParams } from 'react-router-dom';
import { Image } from 'cloudinary-react';
import { CloudinaryContext, upload } from 'cloudinary-react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const cloudinaryConfig = {
  presetKey: 's67nuwqf',
  cloudName: 'dayubishj',
  apiKey: '847367825969199',
  apiSecret: 'MBNbpIcpr2W0IbLT7tKJFzsBdEI',
};

const EditBlog = () => {
  const { bid } = useParams();

  const [blog, setBlog] = useState(null);
  const [name, setName] = useState('');
  const [img, setImg] = useState('');
  const [brief_info, setBriefInfo] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    fetchBlog();
  }, []);

  const fetchBlog = () => {
    fetch(`http://localhost:9999/blog/${bid}`)
      .then((response) => response.json())
      .then((data) => {
        setBlog(data);
        setName(data.name);
        setImg(data.img);
        setBriefInfo(data.brief_info);
        setContent(data.content);
      })
      .catch((error) => {
        console.error('Error fetching blog:', error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Prepare the updated blog data
    const updatedBlog = {
      id: blog.id,
      name,
      img: img !== '' ? img : blog.img, // Use existing image link if img state is empty
      brief_info,
      content,
      create_date: blog.create_date, // Retain the original value
      status: blog.status, // Retain the original value
      cate_id: blog.cate_id, // Retain the original value
      user_id: blog.user_id // Retain the original value
    };

    // Perform the update API call
    fetch(`http://localhost:9999/blog/${bid}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedBlog)
    })
      .then((response) => {
        if (response.ok) {
          alert('Blog updated successfully!');
          window.location.href = '/adminBlogList';
        } else {
          throw new Error('Error updating blog');
        }
      })
      .catch((error) => {
        console.error('Error updating blog:', error);
        alert('An error occurred while updating the blog.');
      });
  };

  const uploadImage = (file) => {
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', cloudinaryConfig.presetKey);
      formData.append('folder', 'blogs');

      fetch(`https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/upload`, {
        method: 'PUT',
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            reject(data.error.message);
          } else {
            resolve(data);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  return (
    <div className="edit-container">
      <h2>Edit Blog</h2>
      {blog && (
        <CloudinaryContext {...cloudinaryConfig}>
          <form onSubmit={handleSubmit}>
            <label>Tên blog:</label>
            <div className="input-container">
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>

            <label>Ảnh:</label>
            <div className="input-container">
              <Image
                cloudName={cloudinaryConfig.cloudName}
                publicId={img}
                width="100%"
                height="300"
                crop="fill"
              />
              <input
                type="file"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    uploadImage(file)
                      .then((response) => {
                        setImg(response.public_id);
                      })
                      .catch((error) => {
                        console.error('Error uploading image:', error);
                      });
                  }
                }}
              />
            </div>

            <label>Thông tin ngắn gọn:</label>
            <div className="input-container">
              <input
                type="text"
                value={brief_info}
                onChange={(e) => setBriefInfo(e.target.value)}
                required
              />
            </div>

            <label>Nội dung:</label>
            <div className="input-container">
              <CKEditor
                editor={ClassicEditor}
                data={content}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setContent(data);
                }}
                required
              />
            </div>

            <button type="submit">Lưu thay đổi</button>
          </form>
        </CloudinaryContext>
      )}
    </div>
  );
};

export default EditBlog;
