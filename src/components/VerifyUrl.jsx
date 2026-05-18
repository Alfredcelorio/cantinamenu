import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllRestaurants } from '../utils/getData';
import '../css/VerifyUrl.css';

function VerifyUrl() {
  const [restaurants, setRestaurants] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllRestaurants(setRestaurants);
  }, []);

  return (
    <div className="restaurant_list">
      <div className="restaurant_list_title">All Restaurants</div>
      <div className="restaurant_list_grid">
        {restaurants
          .filter((restaurant) => restaurant.restaurantName === 'Laveinte')
          .map((restaurant) => (
            <button
              key={restaurant.id}
              type="button"
              className="restaurant_card"
              onClick={() => navigate(`/${restaurant.shortUrl}`)}
            >
              {restaurant.logo && (
                <img
                  className="restaurant_card_logo"
                  src={restaurant.logo}
                  alt={restaurant.restaurantName}
                />
              )}
              <div className="restaurant_card_name">{restaurant.restaurantName}</div>
            </button>
          ))}
      </div>
    </div>
  );
}

export default VerifyUrl;
