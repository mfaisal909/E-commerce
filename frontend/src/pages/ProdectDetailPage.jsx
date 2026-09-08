import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import Footer from "../components/Login/Layout/Footer";
import Header from "../components/Login/Layout/Header";
import ProductDetail from "../components/Product/ProductDetail";
import FeatureProduct from "../components/Route/Hero/FeatureProduct/FeatureProduct";
import SuggestedProduct from "../components/Product/SuggestedProduct";
import { useSelector } from "react-redux";

const ProdectDetailPage = () => {
  const { allProducts = [] } = useSelector((state) => state.products) || {};
  const { allEvents = [] } = useSelector((state) => state.events) || {};
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [searchParams] = useSearchParams();
  const eventData = searchParams.get("isEvent");

  const slugify = (name) => {
    if (!name) return "";
    return name
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]/g, "");
  };

  useEffect(() => {
    console.log("=== ProductDetail Page Debug ===");
    console.log("Route ID param:", id);
    console.log("Search params (isEvent):", eventData);
    console.log("All Products count:", allProducts.length);
    console.log("All Events count:", allEvents.length);

    if (!id) {
      console.warn("No ID parameter provided");
      return;
    }

    const items = eventData !== null ? allEvents : allProducts;
    const itemsLabel = eventData !== null ? "EVENTS" : "PRODUCTS";
    const searchId = slugify(id);

    console.log(`Searching in ${itemsLabel}`);

    if (items.length === 0) {
      console.log(`No ${itemsLabel.toLowerCase()} available yet, waiting for data.`);
      return;
    }

    const foundData = items.find((item) => {
      const itemId = `${item?._id || ""}`;
      const itemIdAlt = `${item?.id || ""}`;
      const itemSlug = slugify(item?.name);

      console.log(`Checking: ${item?.name}`);
      console.log(`  - ID: ${itemId}, matches: ${itemId === id}`);
      console.log(`  - ID Alt: ${itemIdAlt}, matches: ${itemIdAlt === id}`);
      console.log(`  - Slug: ${itemSlug}, search: ${searchId}, matches: ${itemSlug === searchId}`);

      return itemId === id || itemIdAlt === id || itemSlug === searchId;
    });

    if (foundData) {
      console.log(`✓ FOUND: ${foundData?.name}`);
    } else {
      console.warn("No matching item found");
    }

    setData(foundData);
  }, [allProducts, allEvents, id, eventData]);

  return (
    <div>
      <Header />
      <ProductDetail data={data} />
      {
      data && <SuggestedProduct data={data} />
       }
        {!eventData && data && <FeatureProduct data={data} />}
      <Footer />
    </div>
  );
};

export default ProdectDetailPage;