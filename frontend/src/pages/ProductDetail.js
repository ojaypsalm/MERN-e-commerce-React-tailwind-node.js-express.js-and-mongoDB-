import React, { useCallback, useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SummaryApi from "../common";
import { FaStar } from "react-icons/fa";
import { FaStarHalf } from "react-icons/fa";
import displayCurrency from "../helpers/displayCurrency";
import ProductCategoryDisplay from "../components/ProductCategoryDisplay";
import addToCart from "../helpers/addToCart";
import Context from "../context";

const ProductDetail = () => {
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    ProductImage: [],
    description: "",
    price: "",
    sellingPrice: "",
  });
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState("");
  const productImageListLoading = new Array(4).fill(null);
  //const productId = params?.id;

  const [zoomImageCoordinate, setZoomImageCoordinate] = useState({
    x: 0,
    y: 0,
  });
  const [zoomImage, setZoomImage] = useState(false);

  const { fetchUserAddToCart }  = useContext(Context)

 const navigate = useNavigate();

  const fetchProductDetail = async () => {
    setLoading(true);
    const response = await fetch(
      SummaryApi.productDetail.url,
      {
        method: SummaryApi.productDetail.method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: params?.id
        }),
      }
    );
    setLoading(false);
    const dataResponse = await response.json();
    setData(dataResponse?.data);
    setActiveImage(dataResponse?.data?.ProductImage[0]);
  };
  //console.log("data", data);

  useEffect(() => {
    fetchProductDetail();
  }, [params]);

  const handleMouseEnterProduct = (imageURL) => {
    setActiveImage(imageURL);
  };

  const handleZoomImage = useCallback(
    (e) => {
      setZoomImage(true);
      const { left, top, width, height } = e.target.getBoundingClientRect();
      const x = (e.clientX - left) / width;
      const y = (e.clientY - top) / height;
  
      // Clamp the coordinates between 0 and 1
      const clampedX = Math.max(0, Math.min(1, x));
      const clampedY = Math.max(0, Math.min(1, y));
  
      setZoomImageCoordinate({
        x: clampedX,
        y: clampedY 
      });
    },
    [zoomImageCoordinate]
  );

  const handleLeaveImageZone = ()=>{
    setZoomImage(false)
  }

  const handleAddToCart = async(e,id)=>{
    await addToCart(e,id)
    fetchUserAddToCart()
  }

  const handleBuyProduct = async(e,id)=>{
    await addToCart(e,id)
    fetchUserAddToCart()
    navigate('/cart')
  }

  
  return (
    <div className="container mx-auto p-4">
      <div className=" min-h-[200px] flex flex-col lg:flex-row gap-4">

        {/**product Image */}

        <div className=" h-96 flex flex-col lg:flex-row-reverse gap-4">
          <div className="p-2 h-[300px] w-[300px] lg:h-96 lg:w-96 bg-slate-200 relative">
            <img
              src={activeImage}
              alt=""
              className="w-full h-full object-scale-down mix-blend-multiply "
              onMouseMove={handleZoomImage}
              onMouseLeave={handleLeaveImageZone}
            />

            {/**product zoom */}
            {zoomImage && (
              <div className="hidden lg:block absolute min-w-[400px] overflow-hidden bg-slate-200 p-1 -right-[410px] top-0">
                
                <div
                  className="w-full h-full min-h-[400px] min-w-[400px] mix-blend-multiply scale-150"
                  style={{
                    backgroundImage: `url(${activeImage})`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: `${zoomImageCoordinate.x * 100}% ${zoomImageCoordinate.y * 100}%`,
                    backgroundSize: "200%",
                  }}
                ></div>
              </div>
            )}
          </div>
          <div className=" h-full">
            {loading ? (
              <div className="flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full">
                {productImageListLoading.map((el, index) => {
                  return (
                    <div
                      className="h-20 w-20 bg-slate-200 rounded animate-pulse"
                      //key={`loadingImage-${index}`}
                      key={"loadingImage" + index}
                    ></div>
                  );
                })}
              </div>
            ) : (
              <div className="flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full">
                {data?.ProductImage?.map((imgURL, index) => {
                  return (
                    <div
                      key={imgURL}
                      className="h-20 w-20 bg-slate-200 rounded p-1"
                    >
                      <img
                        src={imgURL}
                        alt=""
                        className="w-full h-full object-scale-down mix-blend-multiply cursor-pointer "
                        onMouseEnter={() => handleMouseEnterProduct(imgURL)}
                        onClick={() => handleMouseEnterProduct(imgURL)}
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/**product details */}

        {loading ? (
          <div className="grid gap-1 w-full">
            <p className="bg-slate-200 animate-pulse h-6 lg:h-8 w-full rounded-full inline-block"></p>
            <h2 className="text-3xl lg:text-4xl font-medium h-6 lg:h-8 bg-slate-200 animate-pulse w-full"></h2>
            <p className="capitalize text-slate-400 bg-slate-200 min-w-[100px] h-6 animate-pulse lg:h-8 w-full"></p>
            <div className="text-red-600 bg-slate-200 h-6 lg:h-8 animate-pulse flex items-center gap=1 w-full"></div>
            <div className="flex items-center gap-2 text-2xl font-medium my-1 h-6 lg:h-8 lg:text-3xl w-full">
              <p className="text-slate-400 line-through bg-slate-200 w-full"></p>
              <p className="text-red-600 bg-slate-200 w-full"></p>
            </div>
            <div className="flex items-center gap-2 w-full">
              <button className="h-6 lg:h-8 bg-slate-200 animate-pulse w-full"></button>
              <button className="h-6 lg:h-8 bg-slate-200 animate-pulse w-full"></button>
            </div>
            <div className="w-full">
              <p className="h-6 lg:h-8 my-1 bg-slate-200 animate-pulse w-full"></p>
              <p className="h-10 lg:h-12 bg-slate-200 animate-pulse w-full"></p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-1 ">
            <p className="bg-red-200 text-red-600 px-2 rounded-full w-fit inline-block">
              {data?.brandName}
            </p>
            <h2 className="text-3xl lg:text-4xl font-medium">
              {data?.productName}
            </h2>
            <p className="capitalize text-slate-400">{data?.category}</p>

            <div className="text-red-600 flex items-center gap=1">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStarHalf />
            </div>
            <div className="flex items-center gap-2 text-2xl font-medium my-1 lg:text-3xl">
              <p className="text-slate-400 line-through">
                {displayCurrency(data?.price)}
              </p>
              <p className="text-red-600">
                {displayCurrency(data?.sellingPrice)}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button className="border-2 border-red-600 rounded px-3 py-1 min-w-[120px] text-red-600 font-medium hover:text-white" onClick={(e)=>handleBuyProduct(e,data?._id)} >
                Buy
              </button>
              <button className="border-2 border-red-600 rounded px-3 py-1 min-w-[100px] font-medium text-white bg-red-600 hover:text-600 hover:bg-white" onClick={(e)=>handleAddToCart(e,data?._id)}>
                Add to Cart
              </button>
            </div>
            <div>
              <p className="text-slate-600 font-medium my-1">Description :</p>
              <p>{data?.description}</p>
            </div>
          </div>
        )}
      </div>

      {
        data.category && (
          <ProductCategoryDisplay category={data.category} heading={"Recommended Product"} />
        )
      }
    </div>
  );
};

export default ProductDetail;
