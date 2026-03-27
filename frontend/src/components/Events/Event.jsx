import React from 'react'
import EventCart from './EventCart'

const Event = () => {
  return (
    <section className="w-full bg-[#f5f5f5] py-8 md:py-10">
      <div className="w-[96%] md:w-[94%] lg:w-[92%] mx-auto">
        
        {/* Heading */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#222222]">
            Popular Events
          </h1>
        </div>

        {/* Event Card */}
        <div className="bg-white rounded-sm px-4 sm:px-6 md:px-10 lg:px-14 py-8 md:py-10">
          <EventCart />
        </div>
      </div>
    </section>
  )
}

export default Event
