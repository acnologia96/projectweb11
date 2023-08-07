import axios from "axios";


export const listCategory = async (authtoken) => {
  //console.log(authtoken);
  return await axios.get(
    process.env.REACT_APP_API + "/category",
    {
      headers: {
        authtoken,
      },
    }
) };

export const createCategory = async (authtoken,value) => {
    //console.log(authtoken);
    return await axios.post(
      process.env.REACT_APP_API + "/category",value,
      {
        headers: {
          authtoken,
        },
      }
 ) };

 export const readCategory = async (authtoken,id) => {
  //console.log(authtoken);
  return await axios.get(process.env.REACT_APP_API + "/category/"+id,
  {
    headers: {
      authtoken,
    },
  }) };

  export const editCategory = async (authtoken,id,value) => {
    //console.log(authtoken);
    return await axios.put(process.env.REACT_APP_API + "/category/"+id,value,
    {
      headers: {
        authtoken,
      },
    }) };

 export const deleteCategory = async (authtoken,id) => {
  //console.log(authtoken);
  return await axios.delete( process.env.REACT_APP_API + "/category/"+id,
  {
    headers: {
      authtoken,
    },
  }) };

  