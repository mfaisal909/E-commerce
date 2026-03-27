import React from "react";
import { productData } from "../../../../static/data";
import ProductCard from "../ProductCard/ProductCard";

const FeatureProduct = () => {
  return (
    <div className="w-full bg-white py-10 md:py-14">
      <div className="w-[95%] md:w-[90%] lg:w-[85%] xl:w-[80%] mx-auto">
        
        {/* Header Section */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            Featured Products
          </h2>
          <p className="text-sm text-gray-500">
            Check out our latest featured products
          </p>
        </div>

        {/* Grid container (same as BestDeals) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
          {productData && productData.length > 0 ? (
            productData.map((item, index) => (
              <ProductCard key={item.id || index} data={item || {}} />
            ))
          ) : (
            <p className="text-gray-500 col-span-full text-center">
              No products found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeatureProduct; 