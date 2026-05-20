/* eslint-disable no-unused-expressions */
/* eslint-disable operator-linebreak */
/* eslint-disable indent */
/* eslint-disable no-nested-ternary */
/* eslint-disable max-len */
/* eslint-disable object-curly-newline */
/* eslint-disable no-return-await */
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore/lite';
import { db } from './firebase';
import { filterAvailableProducts } from './productAvailability';

const sortProductsByPosition = (products = []) => [...products].sort(
    (a, b) => (a?.position ?? Number.MAX_SAFE_INTEGER) - (b?.position ?? Number.MAX_SAFE_INTEGER),
  );

// Categorized all Products by their category
export const getCategorizedProducts = async (productCategories, allProducts) => {
  const finalData = [];
  productCategories.forEach((prod) => {
    const dataByCategory = sortProductsByPosition(
      allProducts?.filter((item) => item.categoryId === prod),
    );
    const dataObj = {
      categoryId: prod,
      products: dataByCategory,
    };
    finalData.push(dataObj);
  });

  const data = await finalData?.map(async (item) => {
    const catRef = doc(db, 'categories', item.categoryId);
    const catDoc = await getDoc(catRef);

    if (!catDoc.exists()) {
      return null;
    }

    const categoryData = await catDoc.data();

    if (categoryData?.enabled === false) {
      return null;
    }

    return { ...item, categoryName: categoryData?.name, position: categoryData?.position };
  });

  return await Promise.all(data).then((res) => res
      .filter((item) => item?.products?.length > 0)
      .sort(
        (a, b) => (a?.position ?? Number.MAX_SAFE_INTEGER) - (b?.position ?? Number.MAX_SAFE_INTEGER),
      ));
};

// Get All Restaurants
export const getAllRestaurants = async (setRestaurants) => {
  const restaurantDocs = await getDocs(collection(db, 'restaurants'));
  const data = restaurantDocs.docs?.map((docum) => ({ id: docum?.id, ...docum.data() }));
  setRestaurants(data);
};

// Get Restaurant by Short URL
export const getRestaurantByUrl = async (url, setRestaurant, setLoadData, check) => {
  const docs = query(collection(db, 'restaurants'), where('shortUrl', '==', url));
  const restaurantDoc = await getDocs(docs);
  const data = restaurantDoc.docs?.map((docum) => ({ id: docum?.id, ...docum.data() }));
  if (data?.length) {
    setRestaurant(data?.[0]);
    check && setLoadData(true);
  } else {
    setLoadData(true);
  }
};

export const getProducts = async (
  setLoading,
  setProducts,
  restaurantId,
  setLoadData,
  setAllProducts,
) => {
  const docs = query(
    collection(db, 'products'),
    where('deleted', '==', false),
    where('enabled', '==', true),
    where('restaurantId', '==', restaurantId),
  );
  setLoading(true);
  const productDocs = await getDocs(docs);
  const allProducts = sortProductsByPosition(
    filterAvailableProducts(productDocs?.docs?.map((docum) => ({ id: docum.id, ...docum.data() }))),
  );
  if (allProducts?.length) {
    const allCategories = allProducts?.map((item) => item.categoryId);

    const uniqueCategories = [...new Set(allCategories)];

    // const limitCategories = uniqueCategories?.filter((cat, index) => index < 5);

    // const dataWithCategory = await getCategorizedProducts(limitCategories, allProducts);

    const allDataWithCategory = await getCategorizedProducts(uniqueCategories, allProducts);
    const dataWithCategory = allDataWithCategory?.filter((cat, index) => index < 5);
    setAllProducts(allDataWithCategory);
    setProducts(dataWithCategory);
    setLoadData(true);
  }
  setLoadData(true);
};

export const getAllSubCategories = async (selectedMenu, setCategories, restaurantId) => {
  const docs = query(
    collection(db, 'categories'),
    where('restaurantId', '==', restaurantId),
    where('enabled', '==', true),
  );
  const cats = await getDocs(docs);
  const data = cats?.docs?.map((docum) => ({ id: docum?.id, ...docum.data() }));
  setCategories(data?.sort((a, b) => a.position - b.position));
  // setLoadData(true);
};

export const getAllMenus = async (setMenus, restaurantId) => {
  const docs = query(collection(db, 'menus'), where('restaurantId', '==', restaurantId));
  const menuDocs = await getDocs(docs);
  const data = menuDocs.docs?.map((docum) => ({ id: docum?.id, ...docum.data() }));
  setMenus(data);
  // setLoadData(true);
};

export const getProductsByMenu = async (selectedMenu, setLoading, setProducts, setLoadData) => {
  setLoading(true);
  setLoadData(false);
  const productQuery = query(
    collection(db, 'products'),
    where('deleted', '==', false),
    where('enabled', '==', true),
    where('menuId', '==', selectedMenu?.id),
  );
  const productsData = await getDocs(productQuery);

  const allProducts = sortProductsByPosition(
    filterAvailableProducts(
      productsData?.docs?.map((docum) => ({ id: docum?.id, ...docum.data() })),
    ),
  );
  if (allProducts?.length > 0) {
    const allCategories = allProducts?.map((item) => item.categoryId);
    const uniqueCategories = [...new Set(allCategories)];

    const dataWithCategory = await getCategorizedProducts(uniqueCategories, allProducts);

    setProducts(dataWithCategory);
    setLoadData(true);
    // setLoading(false);
    return;
  }
  setLoadData(true);
  setProducts([]);
  // setLoading(false);
};

export const getProductsByCategory = async (
  selectedCategory,
  setLoading,
  setProducts,
  setLoadData,
) => {
  setLoading(true);
  setLoadData(false);
  const productQuery = query(
    collection(db, 'products'),
    where('deleted', '==', false),
    where('enabled', '==', true),
    where('categoryId', '==', selectedCategory?.id),
  );
  const productsData = await getDocs(productQuery);
  const allProducts = sortProductsByPosition(
    filterAvailableProducts(
      productsData?.docs?.map((docum) => ({ id: docum?.id, ...docum.data() })),
    ),
  );

  const data = [
    {
      categoryName: selectedCategory?.name,
      categoryId: selectedCategory?.id,
      products: allProducts,
    },
  ];
  setProducts(data);
  setLoadData(true);
  // setLoading(false);
};

//    Searched Products
export const getSearchedProducts = async (
  searchTerm,
  setLoading,
  setProducts,
  restaurantId,
  setLoadData,
) => {
  setLoadData(false);
  if (searchTerm) {
    const searchText = searchTerm.toLowerCase();
    setLoading(true);
    const productQuery = query(
      collection(db, 'products'),
      where('deleted', '==', false),
      where('enabled', '==', true),
      where('restaurantId', '==', restaurantId),
    );
    const productsData = await getDocs(productQuery);
    let allProducts = sortProductsByPosition(
      filterAvailableProducts(
        productsData?.docs?.map((docum) => ({
          id: docum?.id,
          ...docum.data(),
        })),
      ),
    );

    allProducts = allProducts.filter(
      (a) =>
        // eslint-disable-next-line implicit-arrow-linebreak
        a.keyword?.toLowerCase().includes(searchText) ||
        a.description?.toLowerCase().includes(searchText),
    );
    if (allProducts?.length > 0) {
      const allCategories = allProducts?.map((item) => item.categoryId);
      const uniqueCategories = [...new Set(allCategories)];

      const limitCategories = uniqueCategories?.filter((cat, index) => index < 5);

      const dataWithCategory = await getCategorizedProducts(limitCategories, allProducts);
      setProducts(dataWithCategory);
      setLoadData(true);
      // setLoading(false);
      return;
    }
    setLoadData(true);
    // setLoading(false);
    setProducts([]);
  } else {
    getProducts(setLoading, setProducts, restaurantId, setLoadData);
  }
};
