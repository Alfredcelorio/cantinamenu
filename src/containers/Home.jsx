/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
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

  if (!loadData) return null;

  return restaurant?.id ? (
    <div style={{ fontFamily: restaurant?.fontFamily }} className="home">
      <Helmet>
        <title>{restaurant?.restaurantName}</title>
        <meta name="description" content={restaurant?.description} />
      </Helmet>
      <img className="home_logo" src={restaurant?.logo} alt={restaurant?.restaurantName} />
      <button
        style={{ fontFamily: restaurant?.fontFamily }}
        onClick={() => navigate(`/${params?.id}/menu`)}
        type="submit"
        className="home_start"
      >
        Tap to start
      </button>
    </div>
  ) : (
    <VerifyUrl />
  );
}
