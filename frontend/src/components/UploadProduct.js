import React, { useState } from "react";
import { CgClose } from "react-icons/cg";
import productCategory from "../helpers/productCategory";
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImage from "../helpers/uploadImage";
import DisplayImage from "./DisplayImage";
import SummaryApi from "../common";
import { toast } from "react-toastify";


const UploadProduct = ({ 
  onClose,
  fetchData
 }) => {
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    price: "",
    description: "",
    ProductImage: [],
    category: "",
    sellingPrice: ""
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  const [openFullScreenImage, setOpenFullScreenImage] = useState(false);

  const [fullScreenImage, setFullScreenImage] = useState("");

  const handleUploadProduct = async (e) => {
    const file = e.target.files[0];
    const uploadImageCloudinary = await uploadImage(file);

    setData((preve) => {
      return {
        ...preve,
        ProductImage: [...preve.ProductImage, uploadImageCloudinary.url],
      };
    });
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(SummaryApi.uploadProduct.url,{
      method : SummaryApi.uploadProduct.method,
      credentials : 'include',
      headers : {
        'Content-Type' : 'application/json'
      },
      body : JSON.stringify(data)

    })
    const responseData = await response.json()

    if(responseData.success){
      toast.success(responseData?.message)
      onClose()
      fetchData()
      
    }else{
      toast.error(responseData?.message)
    }
    
  };



  return (
    <div className="fixed bg-slate-200 bg-opacity-35 w-full top-0 right-0 left-0 bottom-0 flex justify-center items-center">
      <div className="bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden">
        <div className="flex justify-between items-center pb-3">
          <h2 className="font-bold text-lg">Upload Product</h2>
          <div
            className="w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer"
            onClick={onClose}
          >
            <CgClose />
          </div>
        </div>
        <form className="grid p-4 gap-3 overflow-y-scroll h-full pb-5" onSubmit={handleSubmit}>
          <label htmlFor="productName">Product Name :</label>
          <input
            type="text"
            id="productName"
            name="productName"
            placeholder="enter product name"
            value={data.productName}
            onChange={handleOnChange}
            required
            className="p-2 bg-slate-300 border rounded "
          />

          <label htmlFor="brandName" className="mt-3">
            Brand Name :
          </label>
          <input
            type="text"
            id="brandName"
            name="brandName"
            required
            className="p-2 bg-slate-300 border rounded"
            placeholder="enter brand name"
            onChange={handleOnChange}
            value={data.brandName}
          />

          <label htmlFor="category" className="mt-3">
            Category :
          </label>
          <select
            required
            value={data.category}
            onChange={handleOnChange}
            name="category"
            id="category"
            className="p-2 bg-slate-300 border rounded"
          >
            <option value={""}>Select category</option>
            {productCategory.map((el, index) => (
              <option value={el.value} key={el.value + index}>
                {el.label}
              </option>
            ))}
          </select>
          {/* <input
            type="text"
            id="category"
            onChange={handleOnChange}
            placeholder="enter category"
            name="category"
            className="p-2 bg-slate-300 border rounded"
          /> */}

          <label htmlFor="ProductImage" className="mt-3">
            Product Image :
          </label>
          <label htmlFor="uploadImageInput">
            <div className="p-2 bg-slate-100 border rounded h-32 w-full flex justify-center items-center cursor-pointer">
              <div className="text-slate-500 flex justify-center items-center flex-col gap-2">
                <span className="text-3xl">
                  <FaCloudUploadAlt />
                </span>
                <p className="text-sm">Upload Product Image</p>
                <input
                  type="file"
                  id="uploadImageInput"
                  name="uploadImageInput"
                  onChange={handleUploadProduct}
                  className="hidden"
                />
              </div>
            </div>
          </label>
          <div>
            {data?.ProductImage[0] ? (
              <div className="flex items-center gap-2">
                {data.ProductImage.map((el) => {
                  return (
                    <img
                      key={el}
                      src={el}
                      alt="el"
                      width={80}
                      height={80}
                      onClick={() => {
                        setOpenFullScreenImage(true);
                        setFullScreenImage(el);
                      }}
                      className="bg-slate-100 border cursor-pointer"
                    />
                  );
                })}
              </div>
            ) : (
              <p className="text-red-600 text-xs">
                *Please upload product image
              </p>
            )}
          </div>

          <label htmlFor="price" className="mt-3">
            Price :
          </label>
          <input
            type="number"
            id="price"
            required
            placeholder="enter price"
            name="price"
            onChange={handleOnChange}
            value={data.price}
            className="p-2 bg-slate-300 border rounded"
          />

          <label htmlFor="sellingPrice" className="mt-3">
            Selling Price :
          </label>
          <input
            type="number"
            required
            id="sellingPrice"
            placeholder="enter selling price"
            name="sellingPrice"
            onChange={handleOnChange}
            value={data.sellingPrice}
            className="p-2 bg-slate-300 border rounded"
          />
          <label htmlFor="description" className="mt-3">
            Description :
          </label>
          <textarea
            id="description"
            name="description"
            onChange={handleOnChange}
            value={data.description}
            className="h-28 bg-slate-100 border resize-none p-1"
            placeholder="enter description"
            row={3}
          >

          </textarea>

          <button
            type="submit"
            className="bg-red-600 text-white px-3 py-1 rounded mb-10 hover:bg-red-700"
          >
            Upload Product
          </button>
        </form>
      </div>

      {/**display image full screen */}
      {openFullScreenImage && (
        <DisplayImage
          imgUrl={fullScreenImage}
          onClose={() => setOpenFullScreenImage(false)}
        />
      )}
    </div>
  );
};

export default UploadProduct;
