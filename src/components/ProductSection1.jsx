import React, { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { useNavigate } from 'react-router-dom';
import ProductSectionHoc from '../hoc/ProductSectionHoc';

function ProductSection1({ products, setOpenDetail, setSelectedProduct }) {
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
      sectionTitle={products.categoryName}
    >
      <div className="product_section_1">
        {products?.products?.map((item) => (
          <div
            role="presentation"
            className="product_card_1"
            key={item?.id}
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
              <div className="product_description text_ellipsis_1">{item?.description}</div>
              <div className="product_price">{`$${item?.price}`}</div>
            </div>
          </div>
        ))}
      </div>
    </ProductSectionHoc>
  );
}

export default ProductSection1;
