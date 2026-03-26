import React, { useEffect, useState } from 'react'
import { productData } from '../../../../static/data'
import ProductCard from '../ProductCard/ProductCard'

const BestDeals = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    if (productData?.length) {
      // sort by total_sell descending and take first 5
      const sorted = [...productData].sort((a, b) => b.total_sell - a.total_sell)
      const firstFive = sorted.slice(0, 5)
      setData(firstFive)
    }
  }, []) // ✅ Run only once on mount

  return (
    <section className="my-10 px-4 md:px-8 lg:px-16">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Best Deals</h2>
        <p className="text-sm text-gray-500">Top selling products this week</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {data?.map((item, index) => (
          <ProductCard data={item} key={item.id || index} />
        ))}
      </div>
    </section>
  )
}

export default BestDeals 