import React from 'react'
import Categories from '../components/Categories/Categories'
import Products from '../components/Products/Products'
import Header from '../components/Layout/Header/Header'
import Footer from '../components/Layout/Footer/Footer'
import CampaignSingle from '../components/CampaignSingle/CampaignSingle'
import Policy from '../components/Policy/Policy'

const ShopPage = () => {
  return (
    <>
    <Header />
      <Categories />
      <Products />
      <CampaignSingle />
       <Products />
       <Policy />
      <Footer />  
    </>
  )
}

export default ShopPage
