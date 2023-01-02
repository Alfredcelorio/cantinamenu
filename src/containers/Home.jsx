/* eslint-disable dot-notation */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable no-nested-ternary */
/* eslint-disable react-hooks/exhaustive-deps */
// Init
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Spinner from '../components/Spinner';
import VerifyUrl from '../components/VerifyUrl';
import { getRestaurantByUrl } from '../utils/getData';

// Home Component
export default function Home() {
  const [restaurant, setRestaurant] = useState({});
  const [loadData, setLoadData] = useState(false);

  const navigate = useNavigate();
  const params = useParams();

  const check = true;

  useEffect(() => {
    getRestaurantByUrl(params?.id, setRestaurant, setLoadData, check);
  }, [params?.id]);

  useEffect(() => {
    if (restaurant?.fontFamily) {
      document.querySelector('body').style.fontFamily = restaurant?.fontFamily;
    }
  }, [restaurant]);

  return (
    <>
      {!loadData ? (
        <Spinner loadData={loadData} setLoadData={setLoadData} timer={4} />
      ) : restaurant?.id ? (
        <div style={{ fontFamily: restaurant?.fontFamily }} className="home">
          <Helmet>
            <title>{restaurant?.restaurantName}</title>
            <meta name="description" content={restaurant?.description} />
          </Helmet>
          <div className="landingImageDiv">
            <img className="landingImage" src={restaurant?.landingImage} alt="Landing" />
          </div>
          <button
            style={{ fontFamily: restaurant?.fontFamily }}
            onClick={() => navigate(`/${params?.id}/menu`)}
            type="submit"
            className="home_start"
          >
            Tap to start
          </button>
          <button
            onClick={() => navigate(`/${params?.id}/signin/phone`)}
            type="submit"
            className="home_start"
          >
            Get Started
          </button>
        </div>
      ) : (
        <VerifyUrl />
      )}
    </>
  );
}
