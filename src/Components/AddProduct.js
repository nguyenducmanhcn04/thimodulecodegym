import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddProduct = () => {
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    description: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/products', formData);
      navigate('/');
      alert('Đã thêm sản phẩm thành công!');
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Đã xảy ra lỗi khi thêm sản phẩm. Vui lòng thử lại sau.');
    }
  };

  const styles = `
    .add-product-container {
      width: 400px;
      margin: 0 auto;
      padding: 20px;
      border: 1px solid #ccc;
      border-radius: 8px;
    }

    .form-group {
      margin-bottom: 15px;
    }

    .label {
      display: block;
      margin-bottom: 5px;
    }

    input[type="text"],
    textarea {
      width: 100%;
      padding: 8px;
      border: 1px solid #ccc;
      border-radius: 4px;
    }

    .submit-button,
    .back-button {
      padding: 8px 16px;
      margin-right: 10px;
      border: none;
      border-radius: 4px;
      background-color: #007bff;
      color: #fff;
      cursor: pointer;
    }

    .submit-button:hover,
    .back-button:hover {
      background-color: #0056b3;
    }
  `;

  return (
    <div className="add-product-container" style={{ width: '400px', margin: '0 auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>Thêm sản phẩm mới</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group" style={{ marginBottom: '15px' }}>
          <label className="label" style={{ display: 'block', marginBottom: '5px' }}>Tên sản phẩm:</label>
          <input type="text" name="title" value={formData.title} onChange={handleChange} style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />
        </div>
        <div className="form-group" style={{ marginBottom: '15px' }}>
          <label className="label" style={{ display: 'block', marginBottom: '5px' }}>Giá:</label>
          <input type="text" name="price" value={formData.price} onChange={handleChange} style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />
        </div>
        <div className="form-group" style={{ marginBottom: '15px' }}>
          <label className="label" style={{ display: 'block', marginBottom: '5px' }}>Mô tả:</label>
          <textarea name="description" value={formData.description} onChange={handleChange} style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />
        </div>
        <div>
          <button type="submit" className="submit-button" style={{ padding: '8px 16px', marginRight: '10px', border: 'none', borderRadius: '4px', backgroundColor: '#007bff', color: '#fff', cursor: 'pointer' }}>Thêm</button>
          <button onClick={() => navigate('/')} className="back-button" style={{ padding: '8px 16px', marginRight: '10px', border: 'none', borderRadius: '4px', backgroundColor: '#007bff', color: '#fff', cursor: 'pointer' }}>Trở lại</button>
        </div>
      </form>
      <style>{styles}</style>
    </div>
  );
};

export default AddProduct;
