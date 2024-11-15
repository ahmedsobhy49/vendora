import React from "react";
import AppContainer from "./AppContainer";
import { Link, useNavigate } from "react-router-dom";

export default function Error404() {
  const navigate = useNavigate();
  return (
    <AppContainer>
      <section className="bg-white">
        <div className=" px-6  min-h-screen flex items-center justify-center">
          <div className="lg:flex lg:items-center mx-auto lg:gap-12  -mt-64">
            <div className="wf-ull lg:w-1/2">
              <p className="text-sm font-medium text-red-500 ">404 error</p>
              <h1 className="mt-3 text-2xl font-semibold text-gray-800  md:text-3xl">
                Page not found
              </h1>
              <p className="mt-4 text-gray-500 ">
                Sorry, the page you are looking for doesn't exist.Here are some
                helpful links:
              </p>

              <div className="flex items-center mt-6 gap-x-3">
                <button className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="w-5 h-5 rtl:rotate-180"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
                    />
                  </svg>

                  <Link onClick={() => navigate(-1)}>Go back</Link>
                </button>

                <Link
                  to={"/"}
                  className="w-1/2 px-5 py-2 bg-yellow-700 text-white font-bold rounded-md hover:bg-yellow-600 transition-colors duration-200 shrink-0 sm:w-auto  text-center capitalize"
                >
                  Take me home
                </Link>
              </div>
            </div>

            <div className="relative w-full mt-12 lg:w-1/2 lg:mt-0">
              <img
                className="w-full max-w-lg lg:mx-auto"
                src="https://merakiui.com/images/components/illustration.svg"
              />
            </div>
          </div>
        </div>
      </section>
    </AppContainer>
  );
}
