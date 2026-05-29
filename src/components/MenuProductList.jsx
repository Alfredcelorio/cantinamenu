import React from 'react';
import { filterAvailableProductGroups } from '../utils/productAvailability';

const formatPrice = (price) => {
  if (price === undefined || price === null || price === '') {
    return '';
  }

  const numericPrice = Number(price);

  if (Number.isNaN(numericPrice)) {
    return price;
  }

  return `$${numericPrice}`;
};

function MenuProductList({ products }) {
  const availableProducts = filterAvailableProductGroups(products);

  return (
    <div className="menu_product_list">
      {availableProducts?.map((group) => (
        <div className="menu_product_group" key={group?.categoryId || group?.categoryName}>
          <div className="menu_product_category">{group?.categoryName}</div>
          <div className="menu_product_rows">
            {group?.products?.map((product) => (
              <div className="menu_product_row" key={product?.id}>
                <div className="menu_product_name">{product?.name}</div>
                <div className="menu_product_price">{formatPrice(product?.price)}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default MenuProductList;
