import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import MenubarAdmin from "../../layout/MenubarAdmin";
import { listProduct, removeProduct } from "../../function/product";
import AdminProductCard from "../../card/AdminProductCard";
import { toast } from "react-toastify";
import LoadingPage from "../LoadingPage";


const Home = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadData(10);
    //
  }, []);
  const loadData = (count) => {
    setLoading(true);
    listProduct(count)
      .then((res) => {
        setLoading(false);
        setProduct(res.data);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };
  const handleRemove = (id) => {
    console.log(id);
    if (window.confirm("Delete ?")) {
      removeProduct(user.token,id)
        .then((res) => {
          toast.success("Deleted " + res.data.title + " Success!!");
          loadData(100);
          console.log(res);
        })
        .catch((err) => {
          toast.error("Remove Error");
          console.log(err);
        });
    }
  };

  return (
    <div className="container">
          <div className="text-center pb-3">
          {loading ? <h1><LoadingPage /></h1> : <h1 >แก้ไขสินค้า</h1>}
          </div>
         

          <div class="row">
            {product.map((item) => (
              <div key={item._id} className=" col-md-3 mt-4 ">
                <AdminProductCard handleRemove={handleRemove} product={item} />
              </div>
            ))}
          </div>
        </div>

  );
};

export default Home;
