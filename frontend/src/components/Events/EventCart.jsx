import React from 'react'
import CountDown from './CountDown'

const EventCart = () => {
  return (
    <div className="w-full flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-16">
      
      {/* Left Side Image */}
      <div className="w-full lg:w-[40%] flex justify-center">
        <div className="w-full max-w-[360px] md:max-w-[420px]">
          <img
            src="https://images.unsplash.com/photo-1678652197831-2d180705cd2c?w=1000&q=80"
            alt="iPhone 14 Pro Max"
            className="w-full h-auto object-contain"
          />
        </div>
      </div>

      {/* Right Side Content */}
      <div className="w-full lg:w-[60%]">
        {/* Title */}
        <h2 className="text-[28px] md:text-[32px] font-bold text-[#222222] leading-tight">
          Iphone 14pro max 8/256gb
        </h2>

        {/* Description */}
        <p className="mt-3 text-[15px] md:text-[16px] text-[#555555] leading-7">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eum molestias
          sequi, officiis iusto assumenda libero explicabo beatae amet
          consequuntur veniam fugiat corporis minus adipisci modi a aliquam
          maiores exercitationem provident. Lorem ipsum, dolor sit amet
          consectetur adipisicing elit. Eum molestias sequi, officiis iusto
          assumenda libero explicabo beatae amet consequuntur veniam fugiat
          corporis minus adipisci modi a aliquam maiores exercitationem
          provident.
        </p>

        {/* Price and Sold */}
        <div className="mt-5 flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <span className="text-[#d26a6a] line-through text-[22px] font-semibold">
              1099$
            </span>
            <span className="text-[#222222] text-[30px] font-bold leading-none">
              999$
            </span>
          </div>

          <span className="text-[#76c58f] text-[18px] font-medium">
            120 sold
          </span>
        </div>

        {/* Countdown */}
        <div className="mt-4">
          <CountDown />
        </div>
      </div>
    </div>
  )
}

export default EventCart
