/* eslint-disable no-alert */
/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';

function ProductDetailCard({ product, active, media }) {
  return (
    <div className={`card_detail ${active && 'card_detail-active'}`}>
      <div className="product_image">
        <img className="product_img" alt="product" src={product?.image} />
      </div>
      <div className="product_content">
        <div className="product_heading">
          {media ? product?.name?.toUpperCase() : product?.name}
        </div>
        <div className={`product_description ${active ? 'content_fade-in' : 'content_fade-out'}`}>
          {media ? product?.description?.toUpperCase() : product?.description}
        </div>
        <div className="product_price_container">
          <div className={`product_price ${active ? 'content_fade-in' : 'content_fade-out'}`}>
            {media ? `${product?.price} USD` : product?.price}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailCard;
