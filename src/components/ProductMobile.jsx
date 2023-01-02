/* eslint-disable object-curly-newline */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { useNavigate } from 'react-router-dom';
import ProductSectionHoc from '../hoc/ProductSectionHoc';

function ProductMobile({ products, setOpenDetail, setSelectedProduct, media }) {
  const [loaded, setLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setLoaded(true);
    }, 4000);
  }, []);

  const handleSelectProduct = (id) => {
    const obj = {
      products: products?.products,
      selectedId: id,
    };
    setSelectedProduct(obj);
    navigate(`?productId=${id}`);
    setOpenDetail(true);
  };

  return (
    <ProductSectionHoc
      productsLength={products?.products?.length}
      sectionTitle={products?.categoryName}
    >
      <div className="product_section_mobile">
        {products?.products?.map((item) => (
          <div
            role="presentation"
            className="product_card_mobile"
            key={item?.id}
            onClick={() => handleSelectProduct(item?.id)}
          >
            {!loaded && <Skeleton className="skeleton" count={5} />}

            <div className="product_image">
              <img
                className="product_img"
                alt="product"
                onLoad={() => setLoaded(true)}
                src={item?.image}
              />
            </div>
            <div className="product_content">
              <div className="product_heading text_ellipsis_1">
                {media ? item.name?.toUpperCase() : item?.name}
              </div>
              <div className="product_description text_ellipsis_1">
                {media ? item.description?.toUpperCase() : item?.description}
              </div>
              <div className="product_price">{`${item?.price} USD`}</div>
            </div>
          </div>
        ))}
      </div>
    </ProductSectionHoc>
  );
}

export default ProductMobile;
