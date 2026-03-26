import React, { useState } from "react";
import { AiFillHeart, AiFillStar, AiOutlineEye, AiOutlineHeart, AiOutlineShoppingCart, AiOutlineStar } from "react-icons/ai";
import { Link } from "react-router-dom";

const ProductCard = ({ data }) => {
  const [click,setClick]=useState()
  const [open,setOpen]=useState()
  const productName = data?.name
    ? data.name.replace(/\s+/g, "-")
    : "product";

  const imageSrc =
    data?.image_Url?.[0]?.url ||
    data?.image ||
    "https://via.placeholder.com/150";

  return (
    <div className="w-full min-h-[370px] bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 p-4 relative cursor-pointer border border-gray-100">
      {/* Product Image */}
      <Link to={`/product/${productName}`}>
        <div className="w-full h-[190px] bg-gray-50 rounded-lg flex items-center justify-center overflow-hidden mb-4">
          <img
            src={imageSrc}
            alt={data?.name || "product"}
            className="w-full h-full object-contain"
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/150";
            }}
          />
        </div>
      </Link>

      {/* Shop Name */}
      <Link to="/">
        <h5 className="text-sm text-gray-500 mb-2">
          {data?.shop?.name || "No Shop Name"}
        </h5>
      </Link>

      {/* Product Name */}
      <Link to={`/product/${productName}`}>
        <h4 className="text-base font-medium text-gray-800 leading-6">
          {data?.name?.length > 40
            ? data.name.slice(0, 40) + "..."
            : data?.name || "Product Name"}
        </h4>
        <div className="flex">
          <AiFillStar className="mr-2 cursor-pointer" color="#F6BA00"/>
          <AiFillStar className="mr-2 cursor-pointer" color="#F6BA00"/>
          <AiFillStar className="mr-2 cursor-pointer" color="#F6BA00"/>
          <AiFillStar className="mr-2 cursor-pointer" color="#F6BA00"/>
          <AiOutlineStar className="mr-2 cursor-pointer" color="#F6BA00"/>
        </div>
        <div className="py-2 flex items-center justify-between">
            <div className="flex">
              <h5 className="text-lg font-bold text-black mr-2">
                {data.price===0?data.price:data.discount_price}$
              </h5>
              <h4 className="text-sm text-red-600 line-through font-medium">
                {data.price?data.price + " $":null}
              </h4>
            </div>
            <span className="font-[400] text-[17px] text-[#68d284]">
              {data.sold_out} sold
            </span>
        </div>
        </Link>
        <div className="">
          {click?(
            <AiFillHeart className="cursor-pointer absolute right-2 top-5"
            size={22}
            onClick={()=>setClick(!click)}
            color={click?"red":"#333"}
            title="Remove from wishlist"/>
          ):(
              <AiOutlineHeart className="cursor-pointer absolute right-2 top-5"
              size={22}
              onClick={()=>setClick(!click)}
              color={click?"red":"#333"}
              title="Add to wishlist"/>
          )}
          <AiOutlineEye className="cursor-pointer absolute right-2 top-14"
            size={22}
            onClick={()=>setOpen(!open)}
            color="#333"
            title="Quick view"/>
            <AiOutlineShoppingCart className="cursor-pointer absolute right-2 top-24"
            size={22}
            onClick={()=>setClick(!click)}
            color="#444"
            title="Add to cart"/>
        </div>
    </div>
  );
};

export default ProductCard; 