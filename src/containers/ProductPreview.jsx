/* eslint-disable object-curly-newline */
/* eslint-disable no-unused-expressions */
import React, { useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ProductDetailCard from '../components/ProductDetailCard';
import ProductPreviewHeader from '../components/ProductPreviewHeader';

function ProductPreview({ setOpenDetail, selectedProduct, setSelectedProduct, media }) {
  const ref = useRef(null);
  const productRef = useRef(null);
  const categoryName = selectedProduct?.products?.[0]?.categoryName;

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
      <ProductPreviewHeader categoryName={categoryName} media={media} />
      <button
        className="preview_close"
        type="submit"
        onClick={() => {
          setSelectedProduct({ selectedId: '', products: [] });
          setOpenDetail(false);
          navigate(location?.pathname);
        }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15 18L9 12L15 6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
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
