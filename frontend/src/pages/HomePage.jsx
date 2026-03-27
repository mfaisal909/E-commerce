import React from 'react'
import Header from '../components/Login/Layout/Header'
import Hero from '../components/Route/Hero/Hero'
import Categories from '../components/Route/Hero/Category/Categories'
import BestDeals from '../components/Route/Hero/BestDeals/BestDeals'
import FeatureProduct from '../components/Route/Hero/FeatureProduct/FeatureProduct'
import Event from '../components/Events/Event'
const HomePage = () => {
  return (
    <div>
      <Header />
      <Hero/>
      <Categories/>
      <BestDeals/>
      <Event/>
      <FeatureProduct/>
    </div>
  )
}

export default HomePage
