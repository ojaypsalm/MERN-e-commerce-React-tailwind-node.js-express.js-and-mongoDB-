import React, { useContext, useEffect, useState } from "react";
import Logo from "./Logo";
import { GrSearch } from "react-icons/gr";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import SummaryApi from "../common";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../store/userSlice";
import ROLE from "../common/role";
import Context from "../context";

const Header = () => {
  const user = useSelector((state) => state?.user?.user);
  const disPatch = useDispatch();
  const [menuDisplay, setMenuDisplay] = useState(false);
  const context = useContext(Context);
  const navigate = useNavigate();
  const searchInput = useLocation();
  const URLsearch =  new URLSearchParams(searchInput?.search)
  const searchQuery = URLsearch.getAll('q')
  const [search, setSearch] = useState(searchQuery);
  

  const handleLogout = async () => {
    const fetchData = await fetch(SummaryApi.logout_user.url, {
      method: SummaryApi.logout_user.method,
      credentials: "include",
    });

    const data = await fetchData.json();

    if (data.success) {
      toast.success(data.message);
      disPatch(setUserDetails(null));
      navigate("/")
    }

    if (data.error) {
      toast.error(data.message);
    }
  };
  const handleSearch = (e)=>{
     const {value}  = e.target  
     setSearch(value)
     
     if(value){
      navigate(`/search?q=${value}`)
     }else{
      navigate('/search')
     }
  }

  return (
    <header className="h-16 shadow-md bg-white fixed w-full z-40">
      <div className="h-full flex items-center container mx-auto px-4 justify-between">
        <div className="">
          <Link to="/">
            <Logo w={90} h={50} />
          </Link>
        </div>
        <div className="hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow pl-2">
          <input
          onChange={handleSearch}
          value={search}
            className="w-full outline-none "
            type="text"
            placeholder="Search products here...."
          />
          <div className="text-lg min-w-[50px] h-8 bg-red-600 flex items-center justify-center rounded-r-full text-white">
            <GrSearch />
          </div>
        </div>

        <div className="flex items-center gap-7">
          <div className="relative flex justify-center">
            {user?._id && (
              <div
                className="text-3xl cursor-pointer relative flex justify-center"
                onClick={() => setMenuDisplay((prev) => !prev)}
              >
                {user?.profilePic ? (
                  <img
                    src={user?.profilePic}
                    className="w-10 h-10 rounded-full"
                    alt={user?.firstName}
                  />
                ) : (
                  <FaRegCircleUser />
                )}
              </div>
            )}

            {menuDisplay && (
              <div className="absolute bg-white bottom-0 top-11 h-fit p-2 shadow-lg rounded">
                <nav>
                  {user?.role === ROLE.ADMIN && (
                    <Link
                      to={"/admin-panel/all-products"}
                      className="whitespace-nowrap md:block hover:bg-slate-100 p-2"
                      onClick={() => setMenuDisplay((prev) => !prev)}
                    >
                      Admin Panel
                    </Link>
                  )}
                </nav>
              </div>
            )}
          </div>
          {user?._id && (
            <Link
            to='/Cart'
             className="text-2xl relative">
              <span className=" cursor-pointer">
                <FaShoppingCart />
              </span>

              <div className="bg-red-800 text-white w-5 h-5 rounded-full  flex item-center justify-center absolute -top-2 -right-3">
                <p className="text-sm">{context?.cartProductCount}</p>
              </div>
            </Link>
          )}

          <div>
            {user?._id ? (
              <button
                onClick={handleLogout}
                className="px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-800"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-800"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
