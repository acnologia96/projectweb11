import axios from "axios";

export const listProduct = async (count) => {
 
  return await axios.get(process.env.REACT_APP_API + "/product/"+count );
};

export const createProduct = async (authtoken, value) => {
  
  return await axios.post(process.env.REACT_APP_API + "/product", value, {
    headers: {
      authtoken,
    },
  });
};
export const removeProduct = async (authtoken, id) => {
  return await axios.delete(process.env.REACT_APP_API + "/product/"+id, {
    headers: {
      authtoken,
    },
  });
};

export const readProduct = async (id) => {
 
  return await axios.get(process.env.REACT_APP_API + "/products/" + id);
};

export const updateProduct = async (authtoken, id,product) => {
  return await axios.put(process.env.REACT_APP_API + "/product/"+id,product, {
    headers: {
      authtoken,
    },
  });
};

export const listProductBy = async (sort, order, limit) => {
  return await axios.post(process.env.REACT_APP_API + "/productby", {
    sort,
    order,
    limit,
  });
};

export const searchFilters = async (arg) => {
  return await axios.post(process.env.REACT_APP_API + "/search/filters",arg );
};

