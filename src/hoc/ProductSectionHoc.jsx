/* eslint-disable no-nested-ternary */
import React from 'react';

function ProductSectionHoc({
  children, sectionTitle, productsLength, section,
}) {
  return (
    <div className="product_section">
      {productsLength > 0 && (
        <div
          style={{
            marginBottom: `${section === 1 ? '3.1rem' : section === 2 ? '3.6rem' : '3rem'}`,
          }}
          className="heading"
        >
          {sectionTitle?.toUpperCase()}
        </div>
      )}
      {children}
    </div>
  );
}

export default ProductSectionHoc;
