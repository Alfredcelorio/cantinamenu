import React, { useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import { useNavigate } from 'react-router-dom';
import ProductSectionHoc from '../hoc/ProductSectionHoc';

function ProductSection3({ products, setOpenDetail, setSelectedProduct }) {
  const [loaded, setLoaded] = useState(false);
  const navigate = useNavigate();

  const handleSelectProduct = (id) => {
    const obj = {
      products: products?.products,
      selectedId: id,
    };
    setSelectedProduct(obj);
    navigate(`?productId=${id}`);
    setOpenDetail(true);
  };

  useEffect(() => {
    setTimeout(() => {
      setLoaded(true);
    }, 4000);
  }, []);

  return (
    <ProductSectionHoc
      productsLength={products?.products?.length}
      sectionTitle={products.categoryName}
    >
      <div className="product_section_3">
        {products?.products?.map((item) => (
          // eslint-disable-next-line jsx-a11y/no-static-element-interactions
          <div
            role="presentation"
            className="product_card_3"
            key={item?.id}
            onClick={() => handleSelectProduct(item?.id)}
          >
            {!loaded && <Skeleton className="skeleton" count={5} />}
            <div className="product_content">
              <div className="product_heading text_ellipsis_2">{item?.name}</div>
              <div className="product_description text_ellipsis_2">{item?.description}</div>
              <div className="product_details">See Details</div>
            </div>
            <div className="product_image">
              <img
                className="product_img"
                onLoad={() => setLoaded(true)}
                alt="product"
                src={item?.image}
              />
            </div>
          </div>
        ))}
      </div>
    </ProductSectionHoc>
  );
}

export default ProductSection3;
