import React, { useState } from "react";
import {
  AiOutlineMessage,
  AiOutlineHeart,
  AiFillHeart,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";

const ProductDetailCart = ({ setOpen, data }) => {
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);

  const handleMessageSubmit = () => {
    alert(`Message sent to ${data?.shop?.name}`);
  };

  const decreaseCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const increaseCount = () => {
    if (count < data?.stock) {
      setCount(count + 1);
    }
  };

  const totalPrice = (data?.discount_price || data?.price) * count;

  return (
    <>
      {data && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          {/* Modal */}
          <div className="relative w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
            
            {/* Close Button */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-gray-100 hover:bg-red-100 flex items-center justify-center transition"
            >
              <RxCross1 size={22} className="text-gray-700 hover:text-red-500" />
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 md:p-8">
              
              {/* LEFT SIDE */}
              <div className="space-y-6">
                {/* Product Image */}
                <div className="bg-gray-50 rounded-2xl p-4 shadow-sm">
                  <img
                    src={data?.image_Url?.[0]?.url || data?.image}
                    alt={data?.name}
                    className="w-full h-[300px] sm:h-[400px] object-contain rounded-xl"
                  />
                </div>

                {/* Shop Info */}
                <div className="flex items-center gap-4 p-4 border rounded-2xl bg-gray-50">
                  <img
                    src={data?.shop?.shop_avatar?.url}
                    alt={data?.shop?.name}
                    className="w-14 h-14 rounded-full object-cover border"
                  />
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">
                      {data?.shop?.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Shop ID: {data?.shop?.id}
                    </p>
                  </div>
                </div>

                {/* Send Message Button */}
                <button
                  onClick={handleMessageSubmit}
                  className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold flex items-center justify-center gap-2 transition shadow-md"
                >
                  Send Message <AiOutlineMessage size={20} />
                </button>
              </div>

              {/* RIGHT SIDE */}
              <div className="flex flex-col justify-between space-y-6">
                
                {/* Product Info */}
                <div>
                  <span className="inline-block px-3 py-1 text-xs font-semibold bg-indigo-100 text-indigo-700 rounded-full mb-3">
                    {data?.category}
                  </span>

                  <h1 className="text-2xl md:text-4xl font-bold text-gray-900 leading-tight">
                    {data?.name}
                  </h1>

                  <p className="text-gray-600 mt-4 leading-7">
                    {data?.description}
                  </p>
                </div>

                {/* Price Section */}
                <div className="flex items-center gap-4 flex-wrap">
                  {data?.discount_price ? (
                    <>
                      <span className="text-3xl font-bold text-red-600">
                        ${data?.discount_price}
                      </span>
                      <span className="text-lg text-gray-400 line-through">
                        ${data?.price}
                      </span>
                    </>
                  ) : (
                    <span className="text-3xl font-bold text-gray-900">
                      ${data?.price}
                    </span>
                  )}
                </div>

                {/* Extra Details */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <div className="p-4 rounded-2xl bg-gray-50 border">
                    <p className="text-sm text-gray-500">Rating</p>
                    <p className="font-bold text-lg text-yellow-500">
                      ⭐ {data?.ratings}
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-gray-50 border">
                    <p className="text-sm text-gray-500">Stock</p>
                    <p className="font-bold text-lg text-green-600">
                      {data?.stock}
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-gray-50 border">
                    <p className="text-sm text-gray-500">Sold Out</p>
                    <p className="font-bold text-lg text-red-500">
                      {data?.sold_out}
                    </p>
                  </div>
                </div>

                {/* Quantity Selector */}
                <div className="flex items-center gap-4">
                  <span className="font-semibold text-gray-700">Quantity:</span>

                  <div className="flex items-center border rounded-xl overflow-hidden">
                    <button
                      onClick={decreaseCount}
                      className="w-12 h-12 bg-gray-100 hover:bg-gray-200 text-xl font-bold transition"
                    >
                      -
                    </button>

                    <span className="w-14 text-center font-semibold text-lg">
                      {count}
                    </span>

                    <button
                      onClick={increaseCount}
                      className="w-12 h-12 bg-gray-100 hover:bg-gray-200 text-xl font-bold transition"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Total Price */}
                <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-100">
                  <p className="text-sm text-gray-600">Total Price</p>
                  <h2 className="text-2xl font-bold text-indigo-700">
                    ${totalPrice}
                  </h2>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-4 flex-wrap">
                  <button className="flex-1 min-w-[200px] px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold flex items-center justify-center gap-2 transition shadow-md">
                    Add to Cart <AiOutlineShoppingCart size={20} />
                  </button>

                  <button
                    onClick={() => setClick(!click)}
                    className="w-14 h-14 rounded-xl border bg-white hover:bg-red-50 flex items-center justify-center transition"
                    title={click ? "Remove from Wishlist" : "Add to Wishlist"}
                  >
                    {click ? (
                      <AiFillHeart size={26} className="text-red-500" />
                    ) : (
                      <AiOutlineHeart size={26} className="text-gray-600" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetailCart;
