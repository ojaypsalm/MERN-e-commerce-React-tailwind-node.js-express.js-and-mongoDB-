import React, {useState} from 'react'
import loginIcons from '../assest/signin.gif'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import imageTobase64 from '../helpers/imageTobase64';
import SummaryApi from '../common';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const SignUp = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [data, setData] = useState({
        firstName : '',
        lastName : '',
        email : '',
        password : '',
        confirmPassword : '',
        profilePic : ''
    });
    const navigate = useNavigate()

    const handleSubmit = async(e)=>{
        e.preventDefault()

        if(data.password === data.confirmPassword) {

          const dataResponse = await fetch(SummaryApi.signUp.url, {
            method : SummaryApi.signUp.method,
            headers : {
              "content-type" : "application/json"
            },
            body : JSON.stringify(data)
          })
          const dataApi = await dataResponse.json()

          if(dataApi.success){
            toast.success(dataApi.message)
            navigate('/login')
          }

          if(dataApi.error){
            toast.error(dataApi.message)
          }

          

        } else {
          toast.error('please check and confirm password!')
        }

    };
    const handleUploadPic = async(e)=>{
        const file = e.target.files[0];

        const imagePic = await imageTobase64(file)
        setData((prev)=>{
            return{
                ...prev,
                profilePic : imagePic
            }
        })

    }

    const handleOnChange = (e)=>{
        const {name, value} = e.target;

        setData((prev)=>{
            return {
                ...prev,
                [name] : value
            }
        })
    };

  return (
    <section id="signup">
      <div className="mx-auto container p-4">
        <div className="bg-white p-4  w-full max-w-sm mx-auto">
          <div className="w-20 h-20 mx-auto relative overflow-hidden rounded-full">
            <div>
              <img src={data.profilePic || loginIcons} alt="login icons" />
            </div>
            <form>
              <label>
                <div className="text-xs bg-slate-200 bg-opacity-80 pb-4 pt-2 cursor-pointer text-center absolute bottom-0 w-full ">
                  Upload Photo
                </div>
                <input type="file" className="hidden" onChange={handleUploadPic} />
              </label>
            </form>
          </div>
          <form className="pt-6 flex flex-col gap-3" onSubmit={handleSubmit}>
            <div className="grid">
              <label>Firstname :</label>
              <div className="bg-slate-100 p-2">
                <input
                  className="w-full h-full outline-none bg-transparent"
                  type="text"
                  placeholder="enter  first name"
                  name="firstName"
                  value={data.firstName}
                  required
                  onChange={handleOnChange}
                />
              </div>
            </div>
            <div className="grid">
              <label>Lastname :</label>
              <div className="bg-slate-100 p-2">
                <input
                  className="w-full h-full outline-none bg-transparent"
                  type="text"
                  placeholder="enter last name"
                  name="lastName"
                  value={data.lastName}
                  required
                  onChange={handleOnChange}
                />
              </div>
            </div>
            <div className="grid">
              <label>Email :</label>
              <div className="bg-slate-100 p-2">
                <input
                  className="w-full h-full outline-none bg-transparent"
                  type="email"
                  placeholder="enter email"
                  name="email"
                  value={data.email}
                  required
                  onChange={handleOnChange}
                />
              </div>
            </div>
            <div className="grid">
              <label>Password :</label>
              <div className="bg-slate-100 p-2 flex">
                <input
                  className="w-full h-full outline-none bg-transparent"
                  type={showPassword ? "text" : "password"}
                  placeholder="enter password"
                  onChange={handleOnChange}
                  name="password"
                  required
                  value={data.password}
                />
                <div
                  className="cursor-pointer text-xl"
                  onClick={() => setShowPassword((preve) => !preve)}
                >
                  <span>{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
                </div>
              </div>
            </div>
            <div className="grid">
              <label> Confirm Password :</label>
              <div className="bg-slate-100 p-2 flex">
                <input
                  className="w-full h-full outline-none bg-transparent"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="enter password"
                  onChange={handleOnChange}
                  name="confirmPassword"
                  required
                  value={data.ConfirmPassword}
                />
                <div
                  className="cursor-pointer text-xl"
                  onClick={() => setShowConfirmPassword((preve) => !preve)}
                >
                  <span>
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
              </div>
            </div>
            <button className="bg-red-600 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6 hover:bg-red-700">
              Sign Up
            </button>
            <p className="my-5">
              Already have an account ?{" "}
              <Link
                className="text-red-600 hover:text-red-700 hover:underline"
                to={"/login"}
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

export default SignUp