import React from "react";
import { useSelector } from "react-redux";
import ProductCard from "../Route/Hero/ProductCard/ProductCard";

const SuggestedProduct = ({ data }) => {
  const { allProducts } = useSelector((state) => state.products);
  const relatedProducts =
    data?.category && allProducts
      ? allProducts.filter((product) => product.category === data.category)
      : [];

  return (
    data && (
      <section className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <h2
          className="mb-6 border-b border-gray-200 pb-3 text-2xl font-medium text-gray-900"
        >
          Related Products
        </h2>
        <div className="mb-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
          {relatedProducts.map((product) => (
            <ProductCard data={product} key={product._id || product.id} />
          ))}
        </div>
      </section>
    )
  );
};

export default SuggestedProduct;