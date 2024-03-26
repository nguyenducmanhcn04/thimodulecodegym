import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const UpdateProduct = () => {
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    description: ''
  });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/products/${id}`);
        const { title, price, description } = response.data;
        setFormData({ title, price, description });
      } catch (error) {
        console.error('Error fetching product detail:', error);
      }
    };

    fetchProductDetail();
  }, [id]);

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
      await axios.put(`http://localhost:3000/products/${id}`, formData);
      navigate('/'); 
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Cập nhật thông tin sản phẩm</h2>
      <form onSubmit={handleSubmit}>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Tên sản phẩm:</label>
          <input type="text" name="title" value={formData.title} onChange={handleChange} style={styles.input} />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Giá:</label>
          <input type="text" name="price" value={formData.price} onChange={handleChange} style={styles.input} />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Mô tả:</label>
          <textarea name="description" value={formData.description} onChange={handleChange} style={styles.textarea} />
        </div>
        <button type="submit" style={styles.button}>Sửa</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '400px',
    margin: '0 auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '5px'
  },
  heading: {
    textAlign: 'center',
    marginBottom: '20px'
  },
  inputGroup: {
    marginBottom: '15px'
  },
  label: {
    display: 'block',
    marginBottom: '5px'
  },
  input: {
    width: '100%',
    padding: '8px',
    borderRadius: '5px',
    border: '1px solid #ccc'
  },
  textarea: {
    width: '100%',
    padding: '8px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    resize: 'vertical'
  },
  button: {
    display: 'block',
    width: '100%',
    padding: '10px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  }
};

export default UpdateProduct;
