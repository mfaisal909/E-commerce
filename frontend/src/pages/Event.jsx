import React from "react";
import Header from "../components/Login/Layout/Header";
import EventCart from "../components/Events/EventCart";

const Event = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header />

      {/* Main Event Section */}
      <section className="w-full py-10 md:py-14">
        <div className="w-[95%] sm:w-[92%] md:w-[90%] lg:w-[85%] xl:w-[80%] mx-auto">
          
          {/* Section Heading */}
          <div className="mb-8 md:mb-10 text-center">
            <span className="inline-block px-4 py-1.5 rounded-full bg-indigo-100 text-[#3321c8] text-sm font-semibold mb-4">
              Upcoming Events
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
              Explore Our Latest Events
            </h1>
            <p className="mt-3 text-gray-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
              Stay updated with exciting events, exclusive offers, and special activities happening near you.
            </p>
          </div>

          {/* Event Card Wrapper */}
          <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 p-4 sm:p-6 md:p-8 border border-gray-100">
            <EventCart />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Event;
