import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleDelete = async (productId) => {
    try {
      await axios.delete(`http://localhost:3000/products/${productId}`);
      setProducts(products.filter(product => product.id !== productId));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div style={styles.productListContainer}>
      <h2 style={styles.heading}>Danh sách sản phẩm</h2>
      <table style={styles.table}>
        <thead>
          <tr>
            <th>Số thứ tự</th>
            <th>Tên sản phẩm</th>
            <th>Mô tả</th>
            <th>Giá</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={`${product.id}-${index}`}>
              <td>{index + 1}</td>
              <td>
                <Link to={`/product/${product.id}`} style={styles.link}>{product.title}</Link>
              </td>
              <td>{product.description}</td>
              <td>{product.price}</td>
              <td>
                <Link to={`/edit/${product.id}`} style={styles.editButton}>Sửa</Link>
                <button onClick={() => handleDelete(product.id)} style={styles.deleteButton}>Xoá</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="/add" style={styles.addButton}>Thêm mới</Link>
    </div>
  );
};

export default ProductList;

const styles = {
  productListContainer: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
  },
  heading: {
    fontSize: '24px',
    marginBottom: '20px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  link: {
    color: '#007bff',
    textDecoration: 'none',
  },
  editButton: {
    padding: '5px 10px',
    backgroundColor: '#007bff',
    color: '#fff',
    textDecoration: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    marginRight: '5px',
  },
  deleteButton: {
    padding: '5px 10px',
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    marginLeft: '5px',
  },
  addButton: {
    display: 'block',
    marginTop: '20px',
    padding: '8px 16px',
    backgroundColor: 'green',
    color: '#fff',
    textDecoration: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    textAlign: 'center',
    width: 'fit-content',
  },
};
