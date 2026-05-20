export const isProductAvailable = (product = {}) => {
  const isDeleted = product?.deleted === true;
  const isDisabled = product?.enabled === false;
  const hasMenu = Boolean(product?.menuId);
  const hasCategory = Boolean(product?.categoryId);
  const hasPosition = product?.position !== undefined && product?.position !== null;

  return !isDeleted && !isDisabled && hasMenu && hasCategory && hasPosition;
};

export const filterAvailableProducts = (products = []) => products.filter(isProductAvailable);

export const filterAvailableProductGroups = (groups = []) => groups
  .map((group) => ({
    ...group,
    products: filterAvailableProducts(group?.products || []),
  }))
  .filter((group) => group.products.length > 0);
