import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ShopCreate from "../components/Shop/ShopCreate";

const ShopCreatePage = () => {
  const navigate = useNavigate();
  const isSeller = useSelector((state) => state.seller?.isSeller ?? false);
  const seller = useSelector((state) => state.seller?.seller ?? null);

  useEffect(() => {
    if (isSeller && seller?._id) {
      navigate("/dashboard", { replace: true });
    }
  }, [isSeller, navigate, seller]);
  return (
    <div>
        <ShopCreate />
    </div>
  )
}

export default ShopCreatePage