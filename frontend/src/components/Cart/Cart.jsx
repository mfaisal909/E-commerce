import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { HiOutlineMinus, HiPlus } from "react-icons/hi";
import { IoBagHandleOutline } from "react-icons/io5";

const Cart = ({ setOpenCart }) => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "iPhone 14 Pro Max",
      price: 120000,
      qty: 1,
      image:
        "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500",
      description: "Latest Apple flagship smartphone.",
    },
    {
      id: 2,
      name: "Samsung Galaxy S24 Ultra",
      price: 140000,
      qty: 1,
      image:
        "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500",
      description: "Premium Android smartphone.",
    },
    {
      id: 3,
      name: "Google Pixel 9",
      price: 160000,
      qty: 1,
      image:
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500",
      description: "Pure Android experience.",
    },
  ]);

  const increaseQty = (id) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, qty: item.qty + 1 } : item
      )
    );
  };

  const decreaseQty = (id) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id
          ? { ...item, qty: item.qty > 1 ? item.qty - 1 : 1 }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const totalAmount = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
      onClick={() => setOpenCart(false)}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="absolute top-0 right-0 h-screen w-full sm:w-[430px] bg-white shadow-2xl flex flex-col"
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b px-6 py-5 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-blue-100">
              <IoBagHandleOutline className="text-2xl text-blue-600" />
            </div>

            <div>
              <h2 className="font-bold text-xl">Shopping Cart</h2>
              <p className="text-gray-500 text-sm">
                {cartItems.length} Items
              </p>
            </div>
          </div>

          <button
            onClick={() => setOpenCart(false)}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <RxCross1 size={22} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cartItems.length === 0 ? (
            <div className="h-full flex items-center justify-center">
              <h2 className="text-lg text-gray-500">
                Your cart is empty
              </h2>
            </div>
          ) : (
            cartItems.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                increaseQty={increaseQty}
                decreaseQty={decreaseQty}
                removeItem={removeItem}
              />
            ))
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="border-t bg-gray-50 p-5">
            <div className="space-y-3 mb-5">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">
                  Rs. {totalAmount.toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium">Free</span>
              </div>

              <div className="border-t pt-3 flex justify-between">
                <span className="font-bold text-lg">Total</span>
                <span className="font-bold text-xl text-blue-600">
                  Rs. {totalAmount.toLocaleString()}
                </span>
              </div>
            </div>

            <button className="w-full py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition">
              Proceed To Checkout
            </button>

            <button className="w-full py-3 mt-3 rounded-xl border border-gray-300 hover:bg-gray-100 transition">
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const CartItem = ({
  item,
  increaseQty,
  decreaseQty,
  removeItem,
}) => {
  return (
    <div className="bg-white border rounded-2xl p-4 shadow-sm hover:shadow-lg transition">
      <div className="flex gap-4">
        {/* Image */}
        <div className="relative">
          <img
            src={item.image}
            alt={item.name}
            className="w-24 h-24 object-cover rounded-xl"
          />

          <button
            onClick={() => removeItem(item.id)}
            className="absolute -top-2 -right-2 bg-white p-1 rounded-full shadow hover:bg-red-50"
          >
            <RxCross1 className="text-red-500" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1">
          <h3 className="font-semibold text-gray-800">
            {item.name}
          </h3>

          <p className="text-sm text-gray-500 mt-1">
            {item.description}
          </p>

          <div className="mt-3 flex justify-between items-center">
            <span className="font-medium text-gray-700">
              Rs. {item.price.toLocaleString()}
            </span>

            <span className="font-bold text-blue-600">
              Rs. {(item.price * item.qty).toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Quantity */}
      <div className="mt-4 flex items-center justify-between bg-gray-50 rounded-xl p-2">
        <span className="text-sm font-medium">Quantity</span>

        <div className="flex items-center gap-2">
          <button
            onClick={() => decreaseQty(item.id)}
            className="w-9 h-9 flex items-center justify-center rounded-lg border hover:bg-gray-100"
          >
            <HiOutlineMinus />
          </button>

          <span className="w-10 text-center font-semibold">
            {item.qty}
          </span>

          <button
            onClick={() => increaseQty(item.id)}
            className="w-9 h-9 flex items-center justify-center rounded-lg bg-blue-600 text-white hover:bg-blue-700"
          >
            <HiPlus />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;