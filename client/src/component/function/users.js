import axios from "axios";

export const listUser = async (authtoken) => {
  console.log(authtoken);
  return await axios.get(process.env.REACT_APP_API + "/users", {
    headers: {
      authtoken,
    },
  });
};

export const changeStatus = async (authtoken, value) => {
  console.log(authtoken);
  return await axios.post(process.env.REACT_APP_API + "/change-status", value, {
    headers: {
      authtoken,
    },
  });
};

export const changeRole = async (authtoken, value) => {
  console.log(authtoken);
  return await axios.post(process.env.REACT_APP_API + "/change-role", value, {
    headers: {
      authtoken,
    },
  });
};

export const removeUser = async (authtoken, id) => {
  console.log(authtoken);
  return await axios.delete("http://localhost:5000/api/users/" + id, {
    headers: {
      authtoken,
    },
  });
};

export const resetPassword = async (authtoken, id, values) => {
  console.log(authtoken);
  return await axios.put("http://localhost:5000/api/users/" + id, values, {
    headers: {
      authtoken,
    },
  });
};

export const userCart = async (authtoken, cart) => {
  console.log(authtoken);
  return await axios.post(
    process.env.REACT_APP_API + "/user/cart",
    { cart },
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const getuserCart = async (authtoken) => {
  return await axios.get(process.env.REACT_APP_API + "/user/cart", {
    headers: {
      authtoken,
    },
  });
};
export const ClearCart = async (authtoken) => {
  return await axios.delete(process.env.REACT_APP_API + "/user/cart", {
    headers: {
      authtoken,
    },
  });
};

export const saveAddress = async (authtoken, address) => {
  console.log(address)
  return await axios.post(
    process.env.REACT_APP_API + "/user/address",
    { address },
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const saveOrder = async (authtoken) => {
  return await axios.post(
    process.env.REACT_APP_API + "/user/order",
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const getOrder = async (authtoken) => {
  return await axios.get(process.env.REACT_APP_API + "/user/history", {
    headers: {
      authtoken,
    },
  });
};

export const getWishList = async (authtoken) => {
  return await axios.get(process.env.REACT_APP_API + "/user/wishlist", {
    headers: {
      authtoken,
    },
  });
};

export const addToWishList = async (authtoken, productId) => {
  return await axios.post(
    process.env.REACT_APP_API + "/user/wishlist",
    { productId },
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const removeWishList = async (authtoken, productId) => {
  return await axios.put(
    process.env.REACT_APP_API + "/user/wishlist/" + productId,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const updateCartHandler = async (authtoken, item, quantity,) => {
  return await axios.put(
    process.env.REACT_APP_API + "/user/cart/" + item, quantity,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
};