import React, { useState, useEffect, useContext } from 'react';
import "../style/AddBlog.css";
import UserContext from './UserContext';
import { format } from 'date-fns';
import { enGB } from 'date-fns/locale';

const AddBlog = () => {
    const { userId } = useContext(UserContext);

    const [blogs, setBlogs] = useState([]);
    const [name, setName] = useState('');
    const [img, setImg] = useState('');
    const [briefInfo, setBriefInfo] = useState('');
    const [content, setContent] = useState('');
    const [createDate, setCreateDate] = useState('');
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
        // Get the current date
        const currentDate = new Date();

        // Format the date as "dd/mm/yy"
        const formattedDate = currentDate.toLocaleDateString('en-GB');
        // Tạo đối tượng blog mới
        const newBlog = {
            id: blogs.length + 1, // Hãy tạo hàm generateUniqueId() để tạo id duy nhất
            name,
            img,
            briefInfo,
            content,
            createDate: formattedDate,
            status,
            cateId,
            userId
        };

        // Gửi đối tượng blog mới vào database.json
        saveBlogToDatabase(newBlog)
            .then(() => {
                // Reset các giá trị đầu vào
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

    const saveBlogToDatabase = (newBlog) => {
        return fetch('http://localhost:9999/blog', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newBlog)
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Lỗi khi lưu blog');
                }
            });
    };

    return (
        <div className="add-container">
            <h2>Tạo blog mới</h2>
            <form onSubmit={handleSubmit}>
                <label>Tên blog:</label>
                <div className="input-container">
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>

                <label>Ảnh:</label>
                <div className="input-container">
                    <input type="text" value={img} onChange={(e) => setImg(e.target.value)} required />
                </div>

                <label>Thông tin ngắn gọn:</label>
                <div className="input-container">
                    <input type="text" value={briefInfo} onChange={(e) => setBriefInfo(e.target.value)} required />
                </div>

                <label>Nội dung:</label>
                <div className="input-container">
                    <textarea value={content} onChange={(e) => setContent(e.target.value)} required />
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
        </div>
    );
};

export default AddBlog;
