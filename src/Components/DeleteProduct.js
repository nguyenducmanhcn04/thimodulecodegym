import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const DeleteProduct = ({ productId, onDelete }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/products/${productId}`);
      onDelete(productId); // Thông báo cho component cha đã xoá sản phẩm thành công
      navigate('/'); // Chuyển hướng người dùng trở lại trang danh sách sản phẩm
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div>
      {showConfirmation ? (
        <div>
          <p>Bạn có chắc chắn muốn xoá sản phẩm này?</p>
          <button onClick={handleDelete}>Xoá</button>
          <button onClick={() => setShowConfirmation(false)}>Hủy</button>
        </div>
      ) : (
        <button onClick={() => setShowConfirmation(true)}>Xoá</button>
      )}
    </div>
  );
};

export default DeleteProduct;
