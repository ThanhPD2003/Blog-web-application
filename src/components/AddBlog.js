import React, { useState, useEffect, useContext } from 'react';
import "../style/AddBlog.css";
import UserContext from './UserContext';
import { format } from 'date-fns';
import { enGB } from 'date-fns/locale';
import { Image } from 'cloudinary-react';
import { CloudinaryContext, upload } from 'cloudinary-react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { v4 as uuidv4 } from 'uuid';


const cloudinaryConfig = {
  presetKey: 's67nuwqf',
  cloudName: 'dayubishj',
  apiKey: '847367825969199',
  apiSecret: 'MBNbpIcpr2W0IbLT7tKJFzsBdEI'
};

const AddBlog = () => {
  const { userId } = useContext(UserContext);

  const [blogs, setBlogs] = useState([]);
  const [name, setName] = useState('');
  const [img, setImg] = useState('');
  const [brief_info, setBriefInfo] = useState('');
  const [content, setContent] = useState('');
  const [create_date, setCreateDate] = useState('');
  const [status, setStatus] = useState(false);
  const [cateId, setCateId] = useState('');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchBlogs();
    fetchCategories();
  }, []);

  const fetchBlogs = () => {
    fetch('http://localhost:9999/blog')
      .then((response) => response.json())
      .then((data) => {
        setBlogs(data);
      })
      .catch((error) => {
        console.error('Error fetching new blog:', error);
      });
  };

  const fetchCategories = () => {
    fetch('http://localhost:9999/category_blog')
      .then((response) => response.json())
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('en-GB');
  
    const newBlog = {
      id: uuidv4(), // Generate a unique id using uuidv4
      name,
      img: `https://res.cloudinary.com/${cloudinaryConfig.cloudName}/image/upload/${img}`,
      brief_info,
      content,
      create_date: formattedDate,
      status,
      cate_id: parseInt(cateId), // Convert cateId to an integer
      user_id: parseInt(userId), // Convert userId to an integer
    };
  
    saveBlogToDatabase(newBlog)
      .then(() => {
        setName('');
        setImg('');
        setBriefInfo('');
        setContent('');
        setCreateDate('');
        setStatus(true);
        setCateId('');
  
        alert('Blog mới đã được tạo thành công!');
      })
      .catch((error) => {
        console.error('Lỗi khi lưu blog:', error);
        alert('Đã xảy ra lỗi khi lưu blog.');
      });
  };
  
  const saveBlogToDatabase = async (newBlog) => {
    try {
      const response = await fetch('http://localhost:9999/blog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newBlog),
      });
  
      if (!response.ok) {
        throw new Error('Lỗi khi lưu blog');
      }
    } catch (error) {
      console.error('Error saving blog:', error);
      throw error; // Rethrow the error to handle it in the handleSubmit function
    }
  };
  

  const uploadImage = (file) => {
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', cloudinaryConfig.presetKey);
      formData.append('folder', 'blogs');

      fetch(`https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/upload`, {
        method: 'POST',
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
    <div className="add-container addblog-container">
      <h2>Tạo blog mới</h2>
      <CloudinaryContext {...cloudinaryConfig}>
        <form onSubmit={handleSubmit} s>
          <label>Tên blog:</label>
          <div className="input-container">
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>

          <label>Ảnh:</label>
          <div className="input-container">
            <Image
              cloudName={cloudinaryConfig.cloudName}
              publicId={img}
              width="600"
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
                      console.error('Lỗi khi tải lên ảnh:', error);
                      alert('Đã xảy ra lỗi khi tải lên ảnh.');
                    });
                }
              }}
              required
            />
          </div>

          <label>Thông tin ngắn gọn:</label>
          <div className="input-container">
            <input type="text" value={brief_info} onChange={(e) => setBriefInfo(e.target.value)} required />
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


          <label>Thể loại:</label>
          <div className="input-container">
            <select value={cateId} onChange={(e) => setCateId(e.target.value)}>
              <option value="">Chọn thể loại</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <button className="addblog-button" type="submit">Tạo blog</button>
        </form>
      </CloudinaryContext>
    </div>
  );
};

export default AddBlog;
