import React, { useState,useEffect } from 'react'
import './LoginPopup.css'
import { assets } from '../assets/assets'

const LoginPopup = ({setShowLogin}) => {


  const[currState, setCurrentState]=useState("Login")
  const [data, setData]=useState({
    name:"",
    lastname:"",
    phone:"",
    role:"",
    email:"",
    password:""
  })

  const onChangeHandler=(event)=>{
    const name= event.target.name
    const value= event.target.value
    setData(data=>({...data, [name]:value}))
  }

    useEffect(()=>{
    console.log(data)
  }, [data])


  return (
    <div className='login-popup'>
    
      <form class="relative bg-white shadow-lg rounded-lg px-8 pt-6 pb-8 mb-6 max-w-md mx-auto">
  <img 
    onClick={() => setShowLogin(false)} 
    src={assets.cross_icon} 
    alt="Close" 
    class="absolute top-7 right-7 w-6 h-6 cursor-pointer"
  />

  <div class="mb-6 text-center">
    <h2 class="text-3xl font-extrabold text-gray-900">{currState}</h2>
  </div>

  <div class="space-y-6">
    
    {currState === "Login" ? (
      <></>
    ) : (
      <div class="space-y-4">
        <input
          name="name"
          value={data.name}
          onChange={onChangeHandler}
          type="text"
          placeholder="Your Name"
          required
          class="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <input
          name="lastname"
          value={data.lastname}
          onChange={onChangeHandler}
          type="text"
          placeholder="Your Last Name"
          required
          class="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <input
          name="phone"
          value={data.phone}
          onChange={onChangeHandler}
          type="text"
          placeholder="Your Phone"
          required
          class="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <select
          name="role"
          value={data.role}
          onChange={onChangeHandler}
          required
          class="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="" disabled selected>Select Role</option>
          <option value="Role1">Role1</option>
          <option value="Role2">Role2</option>
          <option value="Role3">Role3</option>
        </select>
      </div>
    )}

    <div>
      <input
        name="email"
        value={data.email}
          onChange={onChangeHandler}
        type="email"
        placeholder="Your Email"
        required
        class="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
    </div>

    <div>
      <input
        name="password"
        value={data.password}
          onChange={onChangeHandler}
        type="password"
        placeholder="Your Password"
        required
        class="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
    </div>

    <div class="flex items-center justify-between">
      <button
        type="submit"
        class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        {currState === "Sign Up" ? "Create account" : "Login"}
      </button>
    </div>

    <div class="flex items-start space-x-2">
      <input type="checkbox" required class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
      <p class="text-sm text-gray-600">
        By continuing, I agree to the terms of use & privacy policy.
      </p>
    </div>

    <div class="text-center mt-4">
      {currState === "Login" ? (
        <p class="text-gray-600">
          Create a new account?{" "}
          <span
            class="text-blue-600 hover:underline cursor-pointer"
            onClick={() => setCurrentState("Sign Up")}
          >
            Click here
          </span>
        </p>
      ) : (
        <p class="text-gray-600">
          Already have an account?{" "}
          <span
            class="text-blue-600 hover:underline cursor-pointer"
            onClick={() => setCurrentState("Login")}
          >
            Login here
          </span>
        </p>
      )}
    </div>
  </div>
</form>



    
    </div>
  )
}

export default LoginPopup
