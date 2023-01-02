import React from 'react';

function Product({ product }) {
  return (
    <div className="product" style={{ backgroundImage: `url(${product.photo})` }}>
      <div className="product_overlay" />
      <div className="product_data">
        <div className="product_name text_ellipsis_1">{product?.name}</div>
        <div className="product_description text_ellipsis_1">{product?.description}</div>
        <div className="product_price">{`$${product?.price}`}</div>
      </div>
    </div>
  );
}

export default Product;
