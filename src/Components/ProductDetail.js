import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

const ProductDetail = () => {
  const [product, setProduct] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product detail:', error);
      }
    };

    fetchProductDetail();
  }, [id]);

  return (
    <div style={styles.productDetailContainer}>
      {product ? (
        <div>
          <h2>Thông tin chi tiết sản phẩm</h2>
          <p><strong>Tên sản phẩm:</strong> {product.title}</p>
          <p><strong>Giá:</strong> {product.price}</p>
          <p><strong>Mô tả:</strong> {product.description}</p>
          <Link to="/" style={styles.link}>Trở lại</Link>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ProductDetail;

const styles = {
  productDetailContainer: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
  },
  link: {
    display: 'inline-block',
    padding: '8px 16px',
    backgroundColor: '#007bff',
    color: '#fff',
    textDecoration: 'none',
    borderRadius: '5px',
    transition: 'background-color 0.3s ease',
  },
};
