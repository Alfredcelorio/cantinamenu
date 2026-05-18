import React from 'react';

function ProductPreviewHeader({ categoryName, media }) {
  return (
    <div className="product_preview_category">
      {media ? categoryName?.toUpperCase() : categoryName}
    </div>
  );
}

export default ProductPreviewHeader;
