import React from 'react'
import Header from '../components/Login/Layout/Header'
import Hero from '../components/Route/Hero/Hero'
import Categories from '../components/Route/Hero/Category/Categories'
import BestDeals from '../components/Route/Hero/BestDeals/BestDeals'
const HomePage = () => {
  return (
    <div>
      <Header />
      <Hero/>
      <Categories/>
      <BestDeals/>
    </div>
  )
}

export default HomePage
