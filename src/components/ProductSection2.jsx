/* eslint-disable object-curly-newline */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { useNavigate } from 'react-router-dom';
import ProductSectionHoc from '../hoc/ProductSectionHoc';
import { filterAvailableProducts } from '../utils/productAvailability';

function ProductSection2({ products, setOpenDetail, setSelectedProduct, section }) {
  const [loaded, setLoaded] = useState(false);
  const availableProducts = filterAvailableProducts(products?.products || []);

  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setLoaded(true);
    }, 4000);
  }, []);

  const handleSelectProduct = (id) => {
    const obj = {
      products: availableProducts?.map((item) => ({
        ...item,
        categoryName: products?.categoryName,
      })),
      selectedId: id,
    };
    navigate(`?productId=${id}`);
    setSelectedProduct(obj);
    setOpenDetail(true);
  };

  return (
    <ProductSectionHoc
      section={section}
      productsLength={availableProducts?.length}
      sectionTitle={products?.categoryName}
    >
      <div className="product_section_2">
        {availableProducts?.map((item) => (
          <div
            role="presentation"
            key={item?.id}
            className="product_card_2"
            onClick={() => handleSelectProduct(item?.id)}
          >
            {!loaded && <Skeleton className="skeleton" count={5} />}

            <div className="product_image">
              <img
                className="product_img"
                onLoad={() => setLoaded(true)}
                alt="product"
                src={item?.image}
              />
            </div>
            <div className="product_content">
              <div className="product_heading text_ellipsis_2">{item?.name}</div>
              <div className="product_description_container">
                <div className="product_description text_ellipsis_1">{item?.description}</div>
                <div className="product_price">{`$${item?.price}`}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </ProductSectionHoc>
  );
}

export default ProductSection2;
