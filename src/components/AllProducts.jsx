/* eslint-disable no-nested-ternary */
/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
import React, { useState, useEffect } from 'react';
import ProductSection2 from './ProductSection2';
// import Product from './Product';
// import HeaderImage from '../assets/images/header.jpg';
// import Wine3 from '../assets/images/products/wine3.jpg';
// import Wine5 from '../assets/images/products/wine5.jpg';
// import Wine2 from '../assets/images/products/wine2.jpg';
import ProductMobile from './ProductMobile';

// const recommendedProducts = [
//   {
//     name: 'Vodka',
//     description: 'Test testetsttete',
//     photo: HeaderImage,
//     price: 22,
//   },
//   {
//     name: 'Pine apple juice',
//     description: 'Test testetsttete',
//     photo: Wine3,
//     price: 22,
//   },
//   {
//     name: 'Pine apple juice',
//     description:
//       '80% Cabernet Franc, 20%Cabernet SauvignonPian Artino SaturniaSizes',
//     photo: Wine2,
//     price: 130,
//   },
//   {
//     name: 'Masi "Costasera" Amarone Classico',
//     description: '80% Cabernet Franc, 20%Cabernet SauvignonPian Artino SaturniaSizes',
//     photo: Wine5,
//     price: 85,
//   },
//   {
//     name: 'Masi "Costasera" Amarone Classico',
//     description: '80% Cabernet Franc, 20%Cabernet SauvignonPian Artino SaturniaSizes',
//     photo: HeaderImage,
//     price: 100,
//   },
// ];

function AllProducts({
  products, setOpenDetail, setSelectedProduct, media, loadData,
}) {
  const [mobileView, setMobileView] = useState(false);

  useEffect(() => {
    setMobileView(media);
  }, [media]);

  return (
    <div className="products">
      {/* <div className="products_container">
        <div className="category_name">RECOMMENDED FOR YOU</div>
        <div className="products_wrapper">
          {recommendedProducts.map((item) => (
            <Product key={item.name} product={item} />
          ))}
        </div>
      </div> */}
      {
        // eslint-disable-next-line consistent-return
        !products?.length && loadData ? (
          <div className="no_data">(0) Results </div>
        ) : mobileView ? (
          products?.map((item) => (
            <ProductMobile
              setOpenDetail={setOpenDetail}
              setSelectedProduct={setSelectedProduct}
              key={products?.title}
              products={item}
            />
          ))
        ) : (
          products?.map((item, ind) => (
            <ProductSection2
              section={2}
              setOpenDetail={setOpenDetail}
              setSelectedProduct={setSelectedProduct}
              key={item?.categoryName || ind}
              products={item}
            />
          ))
        )
      }
    </div>
  );
}

export default AllProducts;
