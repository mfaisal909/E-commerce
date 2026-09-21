
import React, { useEffect, useState } from "react";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getAllProductsShop } from "../../redux/actions/product";
import { server } from "../../server";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../redux/actions/wishlist";
import { addTocart } from "../../redux/actions/cart";
import { toast } from "react-toastify";
import Ratings from "./Ratings";
import axios from "axios";

const ProductDetails = ({ data }) => {
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const { products } = useSelector((state) => state.products);

  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  const [select, setSelect] = useState(0);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (data?.shop?._id) {
      dispatch(getAllProductsShop(data.shop._id));
    }

    if (wishlist?.find((item) => item._id === data?._id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [data, wishlist, dispatch]);

  const incrementCount = () => {
    setCount((prev) => prev + 1);
  };

  const decrementCount = () => {
    if (count > 1) {
      setCount((prev) => prev - 1);
    }
  };

  const removeFromWishlistHandler = (product) => {
    setClick(false);
    dispatch(removeFromWishlist(product));
  };

  const addToWishlistHandler = (product) => {
    setClick(true);
    dispatch(addToWishlist(product));
  };

  const addToCartHandler = (id) => {
    const isItemExists = cart?.find((item) => item._id === id);

    if (isItemExists) {
      toast.error("Item already in cart!");
      return;
    }

    if (data.stock < 1) {
      toast.error("Product stock limited!");
      return;
    }

    const cartData = {
      ...data,
      qty: count,
    };

    dispatch(addTocart(cartData));
    toast.success("Item added to cart successfully!");
  };

  const totalReviewsLength =
    products?.reduce(
      (acc, product) => acc + (product.reviews?.length || 0),
      0
    ) || 0;

  const totalRatings =
    products?.reduce(
      (acc, product) =>
        acc +
        (product.reviews || []).reduce(
          (sum, review) => sum + review.rating,
          0
        ),
      0
    ) || 0;

  const avg = totalRatings / totalReviewsLength || 0;
  const averageRating = avg.toFixed(2);

  const handleMessageSubmit = async () => {
    if (!isAuthenticated) {
      toast.error("Please login to create a conversation");
      return;
    }

    const groupTitle = data._id + user._id;
    const userId = user._id;
    const sellerId = data.shop._id;

    try {
      const res = await axios.post(
        `${server}/conversation/create-new-conversation`,
        {
          groupTitle,
          userId,
          sellerId,
        }
      );

      navigate(`/inbox?${res.data.conversation._id}`);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Something went wrong"
      );
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {data && (
        <div className="mx-auto w-[95%] max-w-7xl py-6 sm:w-[92%] lg:w-[88%]">
          
          {/* Product Main Section */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">

            {/* Product Images */}
            <div className="w-full">
              {/* Main Image */}
              <div className="flex min-h-[350px] items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:min-h-[450px]">
                <img
                  src={data?.images?.[select]?.url}
                  alt={data?.name || "Product"}
                  className="h-full max-h-[450px] w-full object-contain transition-transform duration-300 hover:scale-105"
                />
              </div>

              {/* Thumbnails */}
              <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
                {data?.images?.map((image, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setSelect(index)}
                    className={`h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl border-2 bg-white p-1 transition-all duration-200 ${
                      select === index
                        ? "border-blue-600 ring-2 ring-blue-100"
                        : "border-slate-200 hover:border-slate-400"
                    }`}
                  >
                    <img
                      src={image?.url}
                      alt={`${data?.name} ${index + 1}`}
                      className="h-full w-full rounded-lg object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Information */}
            <div className="flex flex-col pt-2 lg:pt-5">
              
              {/* Product Title */}
              <h1 className="text-2xl font-bold leading-tight text-slate-900 sm:text-3xl lg:text-4xl">
                {data.name}
              </h1>

              {/* Description */}
              <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
                {data.description}
              </p>

              {/* Price */}
              <div className="mt-6 flex items-center gap-3">
                <span className="text-3xl font-bold text-blue-600">
                  ${data.discountPrice}
                </span>

                {data.originalPrice && (
                  <span className="text-lg font-medium text-slate-400 line-through">
                    ${data.originalPrice}
                  </span>
                )}
              </div>

              {/* Divider */}
              <div className="my-6 h-px w-full bg-slate-200" />

              {/* Quantity + Wishlist */}
              <div className="flex items-center justify-between gap-4">
                
                {/* Quantity */}
                <div className="flex items-center overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                  <button
                    type="button"
                    onClick={decrementCount}
                    disabled={count <= 1}
                    className="flex h-11 w-11 items-center justify-center text-xl font-semibold text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    −
                  </button>

                  <span className="flex h-11 min-w-12 items-center justify-center border-x border-slate-200 bg-slate-50 px-4 font-semibold text-slate-800">
                    {count}
                  </span>

                  <button
                    type="button"
                    onClick={incrementCount}
                    className="flex h-11 w-11 items-center justify-center text-xl font-semibold text-slate-700 transition hover:bg-slate-100"
                  >
                    +
                  </button>
                </div>

                {/* Wishlist */}
                <button
                  type="button"
                  onClick={() =>
                    click
                      ? removeFromWishlistHandler(data)
                      : addToWishlistHandler(data)
                  }
                  title={
                    click
                      ? "Remove from wishlist"
                      : "Add to wishlist"
                  }
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white shadow-sm transition-all duration-200 hover:scale-105 hover:border-red-200 hover:bg-red-50"
                >
                  {click ? (
                    <AiFillHeart
                      size={24}
                      className="text-red-500"
                    />
                  ) : (
                    <AiOutlineHeart
                      size={24}
                      className="text-slate-600"
                    />
                  )}
                </button>
              </div>

              {/* Add To Cart */}
              <button
                type="button"
                onClick={() => addToCartHandler(data._id)}
                className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 font-semibold text-white shadow-lg shadow-blue-200 transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-blue-300 active:translate-y-0"
              >
                Add to Cart
                <AiOutlineShoppingCart size={21} />
              </button>

              {/* Seller */}
              <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                  {/* Seller Info */}
                  <Link
                    to={`/shop/preview/${data?.shop?._id}`}
                    className="flex items-center gap-3"
                  >
                    <img
                      src={data?.shop?.avatar?.url}
                      alt={data?.shop?.name || "Seller"}
                      className="h-14 w-14 rounded-full border-2 border-white object-cover shadow-sm"
                    />

                    <div>
                      <h3 className="font-semibold text-slate-900 transition hover:text-blue-600">
                        {data.shop.name}
                      </h3>

                      <div className="mt-1 flex items-center gap-1 text-sm text-slate-500">
                        <span>{averageRating}/5</span>
                        <span>•</span>
                        <span>Ratings</span>
                      </div>
                    </div>
                  </Link>

                  {/* Message */}
                  <button
                    type="button"
                    onClick={handleMessageSubmit}
                    className="flex h-11 items-center justify-center gap-2 rounded-xl bg-purple-600 px-5 text-sm font-semibold text-white transition hover:bg-purple-700"
                  >
                    Send Message
                    <AiOutlineMessage size={19} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Product Details */}
          <ProductDetailsInfo
            data={data}
            products={products}
            totalReviewsLength={totalReviewsLength}
            averageRating={averageRating}
          />
        </div>
      )}
    </div>
  );
};

const ProductDetailsInfo = ({
  data,
  products,
  totalReviewsLength,
  averageRating,
}) => {
  const [active, setActive] = useState(1);

  const tabs = [
    {
      id: 1,
      label: "Product Details",
    },
    {
      id: 2,
      label: "Product Reviews",
    },
    {
      id: 3,
      label: "Seller Information",
    },
  ];

  return (
    <div className="mt-10 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 shadow-sm">
      
      {/* Tabs */}
      <div className="flex overflow-x-auto border-b border-slate-200 bg-white">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActive(tab.id)}
            className={`relative min-w-fit whitespace-nowrap px-4 py-5 text-sm font-semibold transition-colors sm:px-6 sm:text-base ${
              active === tab.id
                ? "text-blue-600"
                : "text-slate-500 hover:text-slate-900"
            }`}
          >
            {tab.label}

            {active === tab.id && (
              <span className="absolute bottom-0 left-0 h-0.5 w-full bg-blue-600" />
            )}
          </button>
        ))}
      </div>

      {/* Product Details Tab */}
      {active === 1 && (
        <div className="p-5 sm:p-8">
          <h3 className="mb-4 text-xl font-bold text-slate-900">
            Product Description
          </h3>

          <p className="whitespace-pre-line text-sm leading-8 text-slate-600 sm:text-base">
            {data.description}
          </p>
        </div>
      )}

      {/* Reviews Tab */}
      {active === 2 && (
        <div className="min-h-[300px] p-5 sm:p-8">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-slate-900">
                Customer Reviews
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                {totalReviewsLength} review
                {totalReviewsLength !== 1 ? "s" : ""}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {data?.reviews?.length > 0 ? (
              data.reviews.map((item, index) => (
                <div
                  key={index}
                  className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
                >
                  <div className="flex items-start gap-3">
                    <img
                      src={item?.user?.avatar?.url}
                      alt={item?.user?.name || "User"}
                      className="h-11 w-11 flex-shrink-0 rounded-full object-cover"
                    />

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                        <h4 className="font-semibold text-slate-900">
                          {item?.user?.name}
                        </h4>

                        <Ratings rating={data?.ratings} />
                      </div>

                      <p className="mt-2 text-sm leading-6 text-slate-600">
                        {item?.comment}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex min-h-[200px] items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white">
                <div className="text-center">
                  <h5 className="font-semibold text-slate-700">
                    No Reviews Yet
                  </h5>

                  <p className="mt-1 text-sm text-slate-400">
                    Be the first customer to review this product.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Seller Information Tab */}
      {active === 3 && (
        <div className="grid grid-cols-1 gap-8 p-5 sm:p-8 lg:grid-cols-2">
          
          {/* Seller Profile */}
          <div>
            <Link
              to={`/shop/preview/${data?.shop?._id}`}
              className="group flex items-center"
            >
              <img
                src={data?.shop?.avatar?.url}
                alt={data?.shop?.name || "Seller"}
                className="h-16 w-16 rounded-full border-2 border-white object-cover shadow-md"
              />

              <div className="pl-4">
                <h3 className="font-bold text-slate-900 transition group-hover:text-blue-600">
                  {data.shop.name}
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  {averageRating}/5 Ratings
                </p>
              </div>
            </Link>

            <p className="mt-5 text-sm leading-7 text-slate-600">
              {data?.shop?.description ||
                "No seller description available."}
            </p>
          </div>

          {/* Seller Stats */}
          <div className="flex items-center lg:justify-end">
            <div className="w-full max-w-sm rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <span className="text-sm font-medium text-slate-500">
                  Joined On
                </span>

                <span className="text-sm font-semibold text-slate-900">
                  {data?.shop?.createdAt?.slice(0, 10)}
                </span>
              </div>

              <div className="flex items-center justify-between border-b border-slate-100 py-4">
                <span className="text-sm font-medium text-slate-500">
                  Total Products
                </span>

                <span className="text-sm font-semibold text-slate-900">
                  {products?.length || 0}
                </span>
              </div>

              <div className="flex items-center justify-between py-4">
                <span className="text-sm font-medium text-slate-500">
                  Total Reviews
                </span>

                <span className="text-sm font-semibold text-slate-900">
                  {totalReviewsLength}
                </span>
              </div>

              <Link
                to={`/shop/preview/${data?.shop?._id}`}
                className="mt-2 flex h-11 w-full items-center justify-center rounded-xl bg-blue-600 font-semibold text-white transition hover:bg-blue-700"
              >
                Visit Shop
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
