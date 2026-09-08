import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { HiPlus, HiMinus } from "react-icons/hi";
import { server } from "../../server";

const ProductDetail = ({ data }) => {
  const [select, setSelect] = useState(0);
  const [count, setCount] = useState(1);
  const [isSendingMessage, setIsSendingMessage] = useState(false);

  const images = Array.isArray(data?.image_Url)
    ? data.image_Url
    : data?.image
    ? [{ url: data.image }]
    : [];

  const discountPrice =
    data?.discountPrice ?? data?.discount_price ?? data?.price ?? 0;

  const originalPrice =
    data?.originalPrice ??
    data?.original_price ??
    (data?.discountPrice || data?.discount_price ? data?.price : undefined);

  const mainImage =
    images[select]?.url || (typeof images[select] === "string" ? images[select] : null) ||
    data?.image ||
    "";

  const incrementCount = () => {
    setCount(count + 1);
  };

  const decrementCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const handleMessageSubmit = async () => {
    setIsSendingMessage(true);

    try {
      const response = await axios.post(`${server}/user/send-message`, {
        email: data.shop.email,
        subject: `Message about ${data.name}`,
        message: `Hello ${data.shop.name || "seller"},\n\nI am interested in your product ${data.name}. Please contact me with more details.\n\nThank you.`,
      });

      toast.success(response.data.message || "Message sent successfully.");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to send message. Please try again."
      );
    } finally {
      setIsSendingMessage(false);
    }
  };

  if (!data) {
    return (
      <div className="w-full flex justify-center py-10">
        Loading...
      </div>
    );
  }

  return (
    <div className="bg-white">
      <div className="w-11/12 mx-auto py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

          {/* Left Side */}
          <div>
            <img
              src={mainImage}
              alt=""
              className="w-full border object-contain"
            />

            <div className="flex gap-5 mt-5">
              {images.map((item, index) => {
                const thumbUrl =
                  typeof item === "string" ? item : item?.url || "";

                return (
                  <img
                    key={index}
                    src={thumbUrl}
                    alt=""
                    className={`w-[140px] h-[140px] border cursor-pointer object-contain ${
                      select === index
                        ? "border-purple-500"
                        : "border-gray-300"
                    }`}
                    onClick={() => setSelect(index)}
                  />
                );
              })}
            </div>
          </div>

          {/* Right Side */}
          <div>
            <h1 className="text-2xl font-bold">
              {data.name}
            </h1>

            <p className="text-gray-600 mt-4 leading-7">
              {data.description}
            </p>

            {/* Price */}
            <div className="flex items-center mt-5">
              <h4 className="text-2xl font-semibold">
                ${discountPrice}
              </h4>

              {originalPrice != null && originalPrice !== discountPrice && (
                <h3 className="pl-3 text-lg text-gray-400 line-through">
                  ${originalPrice}
                </h3>
              )}
            </div>

            {/* Quantity + Wishlist */}
            <div className="flex items-center justify-between mt-8">

              <div className="flex items-center">
                <button
                  className="bg-teal-400 text-white px-4 py-3"
                  onClick={decrementCount}
                >
                  <HiMinus />
                </button>
                   <span className="px-5 py-2 min-w-[50px] text-center border border-gray-300 rounded-md bg-gray-100 text-gray-800 font-medium">
                     {count}
                   </span>

                <button
                  className="bg-teal-400 text-white px-4 py-3"
                  onClick={incrementCount}
                >
                  <HiPlus />
                </button>
              </div>

              <button>
                <AiOutlineHeart
                  size={30}
                  className="cursor-pointer"
                />
              </button>
            </div>

            {/* Add to Cart */}
            <button
              className="mt-8 flex items-center bg-black text-white px-6 py-3 rounded"
            >
              Add to cart
              <AiOutlineShoppingCart
                className="ml-2"
                size={20}
              />
            </button>

            {/* Shop Info */}
            <div className="flex items-center justify-between mt-10 flex-wrap gap-5">

              <div className="flex items-center">
                <img
                  src={data.shop?.shop_avatar?.url}
                  alt=""
                  className="w-[50px] h-[50px] rounded-full object-cover"
                />

                <div className="pl-3">
                  <h3 className="text-blue-500 font-semibold">
                    {data.shop?.name}
                  </h3>

                  <h5 className="text-gray-600">
                    ({data?.ratings ?? data.shop?.ratings ?? "N/A"}/5) Ratings
                  </h5>
                </div>
              </div>

              <button
                className={`bg-purple-600 text-white px-5 py-3 rounded flex items-center transition ${isSendingMessage ? "opacity-50 cursor-not-allowed" : "hover:bg-purple-700"}`}
                onClick={handleMessageSubmit}
                disabled={isSendingMessage}
              >
                {isSendingMessage ? "Sending..." : "Send Message"}
                <AiOutlineMessage
                  className="ml-2"
                  size={20}
                />
              </button>
            </div>

          </div>
        </div>
        <ProductDetailsInfo data={data} />
      </div>
    </div>
  );
};

const ProductDetailsInfo = ({ data }) => {
  const [active, setActive] = useState(1);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden mt-8">
      {/* Tabs */}
      <div className="flex flex-wrap items-center justify-between border-b border-gray-200 px-4 md:px-8 pt-6">
        {[
          { id: 1, title: "Product Details" },
          { id: 2, title: "Product Reviews" },
          { id: 3, title: "Seller Information" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActive(tab.id)}
            className={`relative pb-4 text-sm md:text-lg font-semibold transition-all duration-300 ${
              active === tab.id
                ? "text-blue-600"
                : "text-gray-600 hover:text-blue-600"
            }`}
          >
            {tab.title}

            {active === tab.id && (
              <span className="absolute left-0 bottom-0 h-[3px] w-full rounded-full bg-blue-600"></span>
            )}
          </button>
        ))}
      </div>

      {/* Product Details */}
      {active === 1 && (
        <div className="px-4 md:px-8 py-6">
          <p className="text-gray-700 leading-8 whitespace-pre-line text-base">
            {data?.description}
          </p>
        </div>
      )}

      {/* Product Reviews */}
      {active === 2 && (
        <div className="px-4 md:px-8 py-6 max-h-[500px] overflow-y-auto">
          {data?.reviews?.length > 0 ? (
            data.reviews.map((item, index) => (
              <div
                key={index}
                className="flex gap-4 py-5 border-b border-gray-100 last:border-none"
              >
                <img
                  src={item.user?.avatar?.url}
                  alt={item.user?.name}
                  className="w-14 h-14 rounded-full object-cover border"
                />

                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="font-semibold text-gray-800">
                      {item.user?.name}
                    </h3>

                    <Ratings rating={data?.ratings} />
                  </div>

                  <p className="mt-2 text-gray-600 leading-7">
                    {item.comment}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="flex items-center justify-center py-12">
              <h5 className="text-gray-500 text-lg">
                No reviews available for this product.
              </h5>
            </div>
          )}
        </div>
      )}

      {/* Seller Information */}
   {/* Seller Information */}
{active === 3 && (
  <div className="w-full bg-[#f5f6fb] px-6 py-6 md:px-8">
    <div className="w-full flex flex-col min-[800px]:flex-row gap-8">

      {/* Left Side - Seller Details */}
      <div className="w-full min-[800px]:w-[55%]">
        <div className="flex items-start gap-4">

          {/* Seller Avatar */}
          <img
            src={data.shop?.shop_avatar?.url}
            alt={data.shop?.name || "Seller"}
            className="w-12 h-12 rounded-full object-cover flex-shrink-0"
          />

          {/* Seller Information */}
          <div className="flex-1">

            {/* Shop Name */}
            <h3 className="text-[15px] font-medium text-[#6b91c4]">
              {data.shop?.name || "Seller"}
            </h3>

            {/* Ratings */}
            <p className="text-[13px] text-gray-800 mt-2">
              ({data?.ratings ?? data.shop?.ratings ?? "N/A"}) Ratings
            </p>

            {/* Description */}
            <p className="text-[13px] leading-[19px] text-gray-800 mt-3 max-w-[500px]">
              {data.shop?.description ||
                "No seller description available."}
            </p>

          </div>
        </div>
      </div>

      {/* Right Side - Seller Information */}
      <div className="w-full min-[800px]:w-[45%]">
        <div className="min-[800px]:flex min-[800px]:justify-end">

          <div className="text-left min-[800px]:w-[230px]">

            {/* Joined Date */}
            <h5 className="text-[13px] font-semibold text-gray-900">
              Joined on:{" "}
              <span className="font-normal">
                {data.shop?.createdAt
                  ? new Date(data.shop.createdAt).toLocaleDateString(
                      "en-GB",
                      {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      }
                    )
                  : "Not provided"}
              </span>
            </h5>

            {/* Total Products */}
            <h5 className="text-[13px] font-semibold text-gray-900 pt-3">
              Total Products:{" "}
              <span className="font-normal">
                {data.shop?.products?.length ?? "0"}
              </span>
            </h5>

            {/* Total Reviews */}
            <h5 className="text-[13px] font-semibold text-gray-900 pt-3">
              Total Reviews:{" "}
              <span className="font-normal">
                {data.shop?.reviews?.length ??
                  data.shop?.totalReviews ??
                  "0"}
              </span>
            </h5>

            {/* Contact Email */}
            <h5 className="text-[13px] font-semibold text-gray-900 pt-3">
              Contact Email:{" "}
              <span className="font-normal">
                {data.shop?.email || "Not provided"}
              </span>
            </h5>

            {/* Shop Location */}
            <h5 className="text-[13px] font-semibold text-gray-900 pt-3">
              Shop Location:{" "}
              <span className="font-normal">
                {data.shop?.location || "Not provided"}
              </span>
            </h5>

            {/* Visit Shop Button */}
            <button
              type="button"
              className="mt-4 bg-black text-white text-[12px] font-medium px-5 py-2 rounded-[3px] hover:bg-gray-800 transition"
            >
              Visit Shop
            </button>

          </div>
        </div>
      </div>

    </div>
  </div>
)}
    </div>
  );
};

const Ratings = ({ rating }) => {
  const filledStars = Math.round(rating || 0);

  return (
    <div className="flex items-center gap-1 text-yellow-500">
      {Array.from({ length: 5 }, (_, index) => (
        <span key={index}>{index < filledStars ? "★" : "☆"}</span>
      ))}
      <span className="text-gray-500 text-sm">({rating ?? 0})</span>
    </div>
  );
};

export default ProductDetail;