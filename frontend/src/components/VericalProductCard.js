import React, { useEffect, useRef, useState, useContext } from "react";
import fetchCategoryWiseProduct from "../helpers/fetchCategoryWiseProduct";
import displayCurrency from "../helpers/displayCurrency";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
import addToCart from "../helpers/addToCart";
import Context from "../context";

const VerticalProductCard = ({ category, heading }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const loadingList = new Array(13).fill(null);
  const [scroll, setScroll] = useState(0);
  const scrollElement = useRef();

  const { fetchUserAddToCart }  = useContext(Context)

  const handleAddToCart = async(e, id)=>{
    await addToCart(e, id)
    fetchUserAddToCart()
  }

  const fetchData = async () => {
    setLoading(true);
    const categoryProduct = await fetchCategoryWiseProduct(category);
    setLoading(false);
    setData(categoryProduct?.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const scrollRight = () => {
    scrollElement.current.scrollLeft += 300;
    setScroll(scrollElement.current.scrollLeft);
  };

  const scrollLeft = () => {
    scrollElement.current.scrollLeft -= 300;
    setScroll(scrollElement.current.scrollLeft);
  };

  return (
    <div className="container mx-auto px-4 my-6 relative">
      <h2 className="text-2xl font-semibold py-4">{heading}</h2>

      <div
        className="flex items-center gap-4 md:gap-6 overflow-x-scroll scrollbar-none transition-all"
        ref={scrollElement}
      >
        <button
          className="bg-white shadow-md rounded-full p-1 absolute left-0 text-lg hidden md:block"
          onClick={scrollLeft}
        >
          <FaAngleLeft />
        </button>
        <button
          className="bg-white shadow-md rounded-full p-1 absolute right-0 text-lg hidden md:block"
          onClick={scrollRight}
        >
          <FaAngleRight />
        </button>
        {loading
          ? loadingList.map((_, index) => {
              return (
                <div
                  key={index}
                  className="w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-white rounded-sm shadow flex"
                >
                  <div className="bg-slate-200 h-full p-4 animate-pulse min-w-[120px] md:min-w-[145px]"></div>
                  <div className="p-4 grid w-full gap-2">
                    <h2 className="font-medium text-base text-ellipsis line-clamp-1 md:text-lg text-black bg-slate-200 animate-pulse p-1 rounded-full"></h2>
                    <p className="capitalize text-slate-500 p-1 py-2 bg-slate-200 animate-pulse rounded-full"></p>
                    <div className="flex gap-3 w-full">
                      <p className="text-slate-500 line-through p-1 py-2 bg-slate-200 w-full animate-pulse rounded-full"></p>
                      <p className="text-red-600 font-medium p-1 py-2 bg-slate-200 w-full animate-pulse rounded-full"></p>
                    </div>
                    <button className="py-2 text-sm text-white px-3 rounded-full w-full bg-slate-200 animate-pulse"></button>
                  </div>
                </div>
              );
            })
          : data.map((product, index) => {
              return (
                <Link
                  to={'product/'+product?._id}
                  key={index}
                  className="w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-white rounded-sm shadow flex"
                >
                  <div className="bg-slate-200 h-full p-4 hover:scale-110 transition-all min-w-[120px] md:min-w-[145px]">
                    {product?.ProductImage &&
                    product.ProductImage.length > 0 ? (
                      <img
                        src={product?.ProductImage[0]}
                        alt={product?.productName || "Product Image"}
                        className="object-scale-down h-full"
                      />
                    ) : (
                      <div className="flex items-center justify-center w-full h-full">
                        <p>No Image Available</p>
                      </div>
                    )}
                  </div>
                  <div className="p-4 grid gap-3">
                    <h2 className="font-medium text-base text-ellipsis line-clamp-2 md:text-lg text-black">
                      {product?.productName}
                    </h2>
                    <p className="capitalize text-slate-500">
                      {product?.category}
                    </p>
                    <div className="flex gap-3">
                      <p className="text-slate-500 line-through">
                        {displayCurrency(product?.price)}
                      </p>
                      <p className="text-red-600 font-medium">
                        {displayCurrency(product?.sellingPrice)}
                      </p>
                    </div>
                    <button onClick={(e)=>handleAddToCart(e, product?._id)} className="text-sm bg-red-600 hover:bg-red-700 px-3 py-0.5 rounded-full">
                      Add to Cart
                    </button>
                  </div>
                </Link>
              );
            })}
      </div>
    </div>
  );
};

export default VerticalProductCard;
