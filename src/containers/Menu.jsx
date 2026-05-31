/* eslint-disable dot-notation */
/* eslint-disable no-useless-return */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-return-await */
import React, {
  useCallback, useEffect, useRef, useState,
} from 'react';
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

const SPLASH_IDLE_TIME = 45 * 1000;

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
  const [showSplash, setShowSplash] = useState(true);
  const [openDetail, setOpenDetail] = useState(false);
  const setLoading = () => {};
  const [loadData, setLoadData] = useState(false);

  const navigate = useNavigate();

  const ref = useRef(null);
  const idleTimer = useRef(null);
  const media = window.matchMedia('(max-width: 500px)').matches;

  const params = useParams();
  const location = useLocation();
  const splashVideo = restaurant?.splashVideo || '/splash.mp4';
  const shouldShowSplash = restaurant?.id && showSplash;

  const resetToSplash = useCallback(() => {
    setShowSplash(true);
    setOpenList(true);
    setOpenDetail(false);
    setSelectedCategory('');
    setSelectedMenu();
    setSelectedProduct({
      products: [],
      selectedId: '',
    });

    if (location?.search) {
      navigate(location.pathname, { replace: true });
    }
  }, [location?.pathname, location?.search, navigate]);

  const startMenu = () => {
    setShowSplash(false);
    setOpenList(true);
  };

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

  useEffect(() => {
    if (!restaurant?.id || showSplash) return undefined;

    const resetIdleTimer = () => {
      window.clearTimeout(idleTimer.current);
      idleTimer.current = window.setTimeout(resetToSplash, SPLASH_IDLE_TIME);
    };

    const activityEvents = ['click', 'touchstart', 'keydown', 'scroll'];

    resetIdleTimer();
    activityEvents.forEach((eventName) => {
      window.addEventListener(eventName, resetIdleTimer, { passive: true });
    });

    return () => {
      window.clearTimeout(idleTimer.current);
      activityEvents.forEach((eventName) => {
        window.removeEventListener(eventName, resetIdleTimer);
      });
    };
  }, [restaurant?.id, resetToSplash, showSplash]);

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
          {shouldShowSplash && (
            <button
              type="button"
              className="splash_screen"
              onClick={startMenu}
              aria-label="Continue to menu selection"
            >
              <video
                className="splash_video"
                src={splashVideo}
                autoPlay
                muted
                loop
                playsInline
                onError={() => setShowSplash(false)}
              />
              <span className="splash_start_button">Click here to start</span>
            </button>
          )}
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
