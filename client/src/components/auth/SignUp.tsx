import React, { FormEvent, useState } from "react";
import { Link } from "react-router-dom";

import { useAppDispatch } from "../app/hooks"
import { register } from "../../actions/authAction";
import { registerData } from "../../utils/types";

function SignUp() {
  
  const [formData, setuserdata] = useState<registerData>({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const onchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setuserdata({ ...formData, [e.target.name]: e.target.value });
  };

  const dispatch = useAppDispatch();
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(register(formData));
  };

  return (
    <div className="h-full bg-gradient-to-tl from-green-400 to-indigo-900 w-full py-16 px-4">
      <div className="flex flex-col items-center justify-center">
        <div className="bg-white shadow rounded lg:w-1/3  md:w-1/2 w-full p-10 mt-16">
          <p
            tabIndex={0}
            role="heading"
            aria-label="Login to your account"
            className="text-2xl font-extrabold leading-6 text-gray-800"
          >
            SignUp to your account
          </p>
          <p className="text-sm mt-4 font-medium leading-none text-gray-500">
            have your account already?{" "}
            <Link to="/login">
              <span
                tabIndex={0}
                role="link"
                aria-label="Sign up here"
                className="text-sm font-medium leading-none underline text-gray-800 cursor-pointer"
              >
                {" "}
                Sign in
              </span>
            </Link>
          </p>

          <div className="w-full flex items-center justify-between py-5">
            <hr className="w-full bg-gray-400" />
          </div>
          <form onSubmit={onSubmit}>
            <div>
              <label className="text-sm font-medium leading-none text-gray-800">
                User name
              </label>
              <div className="relative flex items-center justify-center">
                <input
                  aria-label="enter Password"
                  role="input"
                  type="text"
                  className="bg-gray-200 border rounded focus:outline-none text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"
                  name="name"
                  value={formData.name}
                  onChange={onchange}
                />
              </div>
            </div>
            <div className="mt-6  w-full">
              <label className="text-sm font-medium leading-none text-gray-800">
                Email
              </label>
              <input
                aria-label="enter email adress"
                role="input"
                type="email"
                name="email"
                value={formData.email}
                onChange={onchange}
                className="bg-gray-200 border rounded focus:outline-none text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"
              />
            </div>
            <div className="mt-6  w-full">
              <label className="text-sm font-medium leading-none text-gray-800">
                Password
              </label>
              <div className="relative flex items-center justify-center">
                <input
                  aria-label="enter Password"
                  role="input"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={onchange}
                  className="bg-gray-200 border rounded focus:outline-none text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"
                />
              </div>
            </div>
            <div className="mt-6  w-full">
              <label className="text-sm font-medium leading-none text-gray-800">
                Password Confirm
              </label>
              <div className="relative flex items-center justify-center">
                <input
                  aria-label="enter Password confirm"
                  role="input"
                  type="password"
                  name="password2"
                  value={formData.password2}
                  onChange={onchange}
                  className="bg-gray-200 border rounded focus:outline-none text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"
                />
              </div>
            </div>
            <div className="mt-8">
              <button
                role="button"
                aria-label="Log In"
                type="submit"
                className="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 text-sm font-semibold leading-none text-white focus:outline-none bg-indigo-700 border rounded hover:bg-indigo-600 py-4 w-full"
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
