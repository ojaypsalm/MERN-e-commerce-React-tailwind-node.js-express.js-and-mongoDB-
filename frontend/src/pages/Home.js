import React from 'react'
import CategoryList from '../components/CategoryList'
import BannerProduct from '../components/BannerProduct'
import HorizontalCardProduct from '../components/HorizontalCardProduct'
import VerticalProductCard from '../components/VericalProductCard'

const Home = () => {
  return (
    <div>
        <CategoryList />
        <BannerProduct />
        <HorizontalCardProduct category={'airpods'} heading={"Top Airpods"} />
        <HorizontalCardProduct category={'earphones'} heading={"Popular  Earphones"} />
        <HorizontalCardProduct category={'watches'} heading={"Top watches"} />
        
        <VerticalProductCard category={'mouse'} heading={"Top Mouse"} />
        <VerticalProductCard category={'televisions'} heading={"Top Televisions"} />
        <VerticalProductCard category={'speakers'} heading={"Top Speakers"} />
        <VerticalProductCard category={'printers'} heading={"Top Printers"} />
        <VerticalProductCard category={'refrigerators'} heading={"Top Refrigerators"} />
        <VerticalProductCard category={'camera'} heading={"Top Cameras"} />
        <VerticalProductCard category={'processors'} heading={"Top Processors"} />
        <VerticalProductCard category={'trimmers'} heading={"Top Trimmers"} />
        <VerticalProductCard category={'mobiles'} heading={"Top Mobile Phones"} />
        

    </div>
  )
}

export default Home