/* eslint-disable dot-notation */
/* eslint-disable no-useless-return */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-return-await */
import React, { useEffect, useRef, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import AllProducts from '../components/AllProducts';
import Header from '../components/Header';
import MenuList from '../components/MenuList';
import ProductPreview from './ProductPreview';

import {
  getAllMenus,
  getProductsByMenu,
  getProductsByCategory,
  getProducts,
  getAllSubCategories,
  getRestaurantByUrl,
} from '../utils/getData';

function Menu() {
  const [menus, setMenus] = useState([]);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedMenu, setSelectedMenu] = useState();
  const [selectedProduct, setSelectedProduct] = useState({
    products: [],
    selectedId: '',
  });
  const [restaurant, setRestaurant] = useState({});

  const [stopScroll, setStopScroll] = useState(false);
  const [openList, setOpenList] = useState(true);
  const [openDetail, setOpenDetail] = useState(false);
  const setLoading = () => {};
  const [loadData, setLoadData] = useState(false);

  const navigate = useNavigate();

  const ref = useRef(null);
  const media = window.matchMedia('(max-width: 500px)').matches;

  const params = useParams();
  const location = useLocation();

  useEffect(() => {
    if (selectedMenu?.name) {
      getProductsByMenu(selectedMenu, setLoading, setProducts, setLoadData);
    }
  }, [selectedMenu]);

  useEffect(() => {
    if (selectedCategory?.id) {
      getProductsByCategory(selectedCategory, setLoading, setProducts, setLoadData);
    } else if (restaurant?.id) {
      getProducts(setLoading, setProducts, restaurant?.id, setLoadData, setAllProducts);
    }
  }, [selectedCategory]);

  useEffect(() => {
    getRestaurantByUrl(params?.id, setRestaurant, setLoadData);
  }, []);

  useEffect(() => {
    const productId = location?.search?.split('=')[1];
    if (allProducts?.length && productId) {
      let prod;
      allProducts?.forEach((prods) => {
        const findProduct = prods?.products?.find((item) => item?.id === productId);
        if (findProduct) {
          prod = findProduct?.id;
          setSelectedProduct({
            selectedId: findProduct?.id,
            products: prods?.products?.map((item) => ({
              ...item,
              categoryName: prods?.categoryName,
            })),
          });
          setOpenList(false);
        }
      });
      if (!prod) {
        navigate(location?.pathname);
      }
    }
  }, [params, products, allProducts]);

  useEffect(() => {
    if (restaurant?.id) {
      if (restaurant?.fontFamily) {
        document.querySelector('body').style.fontFamily = restaurant?.fontFamily;
      }
      getAllMenus(setMenus, restaurant?.id);
      getAllSubCategories(selectedMenu, setCategories, restaurant?.id);
      getProducts(setLoading, setProducts, restaurant?.id, setLoadData, setAllProducts);
    }
  }, [restaurant]);

  const onScroll = () => {
    const { scrollTop } = document.getElementById('menu');

    if (media) {
      if (scrollTop > 100) {
        setStopScroll(true);
      } else if (stopScroll) {
        setStopScroll(false);
      }
    } else if (scrollTop > 212) {
      setStopScroll(true);
    } else if (stopScroll) {
      setStopScroll(false);
    }
  };

  return (
    <div
      id="menu"
      style={{
        overflowY: openList ? 'hidden' : 'auto',
      }}
      onScroll={onScroll}
      ref={ref}
      className="menu"
    >
      <Helmet>
        <title>{restaurant?.restaurantName}</title>
        <meta name="description" content={restaurant?.description} />
      </Helmet>
      {restaurant?.id ? (
        <>
          <Header
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            setLoadData={setLoadData}
            categories={categories}
            stopScroll={stopScroll}
            media={media}
            restaurant={restaurant}
            setProducts={setProducts}
            setOpenList={setOpenList}
            setLoading={setLoading}
          />
          {openList && !location?.search && (
            <div className="popup_container">
              <MenuList
                media={media}
                menus={menus}
                setSelectedCategory={setSelectedCategory}
                setSelectedMenu={setSelectedMenu}
                setOpenList={setOpenList}
              />
            </div>
          )}
          <div className="menu_content">
            <AllProducts
              products={products}
              selectedMenu={selectedMenu}
              media={media}
              loadData={loadData}
              setSelectedProduct={setSelectedProduct}
              setOpenDetail={setOpenDetail}
            />
          </div>
          {(openDetail || selectedProduct?.products?.length) && (
            <div className="popup_container">
              <ProductPreview
                media={media}
                restaurant={restaurant}
                setSelectedProduct={setSelectedProduct}
                selectedProduct={selectedProduct}
                setOpenDetail={setOpenDetail}
              />
            </div>
          )}
        </>
      ) : (
        <div className="menu_not_found">
          <div className="not_found">404</div>
          <div className="page_not_found">Page Not Found</div>
        </div>
      )}
    </div>
  );
}

export default Menu;
