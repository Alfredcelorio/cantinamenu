/* eslint-disable no-alert */
/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import share from '../assets/icons/share.png';

function ProductDetailCard({ product, active, media }) {
  const shareProduct = async () => {
    const shareData = {
      title: product?.name,
      text: product?.description,
      url: window.location.href,
    };
    if (!navigator.canShare) {
      window.alert('Your browser does not support the Web Share API.');
    } else {
      await navigator.share(shareData);
    }
  };
  return (
    <div className={`card_detail ${active && 'card_detail-active'}`}>
      <div className="product_image">
        <img className="product_img" alt="product" src={product?.image} />
      </div>
      <div className="product_content">
        <div className="product_heading">
          {media ? product?.name?.toUpperCase() : product?.name}
        </div>
        <div className="product_description">
          {media ? product?.description?.toUpperCase() : product?.description}
        </div>
        <div className="product_price_container">
          <div className="product_price">
            {media ? `${product?.price} USD` : `$${product?.price}`}
          </div>
          <div role="presentation" onClick={() => shareProduct()} className="product_share">
            <img alt="share product" src={share} /> Share
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailCard;
