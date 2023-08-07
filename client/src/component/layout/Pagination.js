import React, { useEffect, useState } from "react";
import { listProduct } from "../function/product";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';




function PaginationPage() {
  const [currentPage, setcurrentPage] = useState();
  const [currentCount, setcurrentCount] = useState();
  const [products, setProduct] = useState([]);
  const [pages, setPage] = useState(1);
  
  useEffect(() => {
    //code
    loadData();
  }, []);
  const loadData = () => {
    listProduct().then((res) => {
      const {product,currentPage,pages,currentCount }=res.data
      setProduct(product)
      setcurrentPage(currentPage)
      setcurrentCount(currentCount)
      setPage(pages)
      console.log(product)
      console.log(currentPage)
      console.log(currentCount)
      console.log(pages)
      console.log(res.data)

    });
  };
  const handlePageClick = async (e) => {
    console.log(pages);
    console.log(currentPage);

   

    
  };

  return (
    <Stack justifyContent={'center'} alignItems={"center"} display={"flex"} sx={{margin:'20px 0px'}} >
      <Pagination
      count={pages}
      page={currentPage}
      onChange={handlePageClick}
      />
    </Stack>
  );
}

export default PaginationPage;
