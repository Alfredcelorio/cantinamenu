/* eslint-disable object-curly-newline */
/* eslint-disable no-unused-expressions */
import React, { useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ProductDetailCard from '../components/ProductDetailCard';
import Cross from '../assets/icons/close.png';
import CloseMobile from '../assets/icons/close_white.png';

function ProductPreview({ setOpenDetail, selectedProduct, setSelectedProduct, media }) {
  const ref = useRef(null);
  const productRef = useRef(null);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const { products, selectedId } = selectedProduct;
    if (productRef) {
      const findIndex = products?.findIndex((item) => item?.id === selectedId);
      if (findIndex !== 0) {
        const prevPosition = productRef?.current?.childNodes[findIndex]?.clientWidth;
        const prevElementWidth = prevPosition + 160;
        const elementPosition = productRef?.current?.childNodes[findIndex].offsetLeft;
        productRef?.current.scrollTo({
          left: media ? elementPosition - 20 : elementPosition - prevElementWidth,
          behavior: 'smooth',
        });
      }
    }
  }, [selectedProduct, media]);

  return (
    <div ref={ref} className="product_preview">
      <button
        className="preview_close"
        type="submit"
        onClick={() => {
          setSelectedProduct({ selectedId: '', products: [] });
          setOpenDetail(false);
          navigate(location?.pathname);
        }}
      >
        <img className="preview_close_img" src={media ? CloseMobile : Cross} alt="close" />
      </button>
      <div
        style={{
          justifyContent: `${selectedProduct?.products?.length > 1 ? 'flex-start' : 'center'}`,
        }}
        id="product_preview_wrapper"
        className="product_preview_wrapper"
        ref={productRef}
      >
        {selectedProduct?.products?.map((product) => (
          <ProductDetailCard
            media={media}
            active={product?.id === selectedProduct?.selectedId}
            key={product?.id}
            product={product}
          />
        ))}
      </div>
    </div>
  );
}

export default ProductPreview;
