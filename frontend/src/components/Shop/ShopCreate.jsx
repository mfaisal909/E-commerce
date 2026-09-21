
import { React, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link } from "react-router-dom";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
import { RxAvatar } from "react-icons/rx";

const ShopCreate = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState();
  const [address, setAddress] = useState("");
  const [zipCode, setZipCode] = useState();
  const [avatar, setAvatar] = useState();
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    axios
      .post(`${server}/shop/create-shop`, {
        name,
        email,
        password,
        avatar,
        zipCode,
        address,
        phoneNumber,
      })
      .then((res) => {
        if (res.data.emailSent === false) {
          toast.warning(res.data.message);
        } else {
          toast.success(res.data.message);
        }

        setName("");
        setEmail("");
        setPassword("");
        setAvatar();
        setZipCode();
        setAddress("");
        setPhoneNumber();
      })
      .catch((error) => {
        toast.error(
          error.response?.data?.message || "Unable to connect to the server"
        );
      });
  };

  const handleFileInputChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatar(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 px-4 py-10 sm:px-6 lg:px-8">
      
      {/* Main Container */}
      <div className="mx-auto w-full max-w-2xl">

        {/* Heading */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 shadow-lg shadow-blue-200">
            <RxAvatar className="h-8 w-8 text-white" />
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Register as a Seller
          </h2>

          <p className="mt-2 text-sm text-gray-500 sm:text-base">
            Create your shop and start selling your products today.
          </p>
        </div>

        {/* Form Card */}
        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl shadow-gray-200/60">

          {/* Card Header */}
          <div className="border-b border-gray-100 bg-gray-50/70 px-6 py-5 sm:px-8">
            <h3 className="text-lg font-semibold text-gray-900">
              Shop Information
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              Enter your shop details below.
            </p>
          </div>

          {/* Form */}
          <form
            className="space-y-6 px-6 py-7 sm:px-8 sm:py-8"
            onSubmit={handleSubmit}
          >

            {/* Shop Name */}
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Shop Name
              </label>

              <input
                id="name"
                type="text"
                name="name"
                placeholder="Enter your shop name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="block w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 shadow-sm outline-none transition-all placeholder:text-gray-400 hover:border-gray-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
            </div>

            {/* Phone Number */}
            <div>
              <label
                htmlFor="phone-number"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Phone Number
              </label>

              <input
                id="phone-number"
                type="tel"
                name="phone-number"
                placeholder="Enter your phone number"
                required
                value={phoneNumber || ""}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="block w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 shadow-sm outline-none transition-all placeholder:text-gray-400 hover:border-gray-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Email Address
              </label>

              <input
                id="email"
                type="email"
                name="email"
                autoComplete="email"
                placeholder="you@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 shadow-sm outline-none transition-all placeholder:text-gray-400 hover:border-gray-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
            </div>

            {/* Address */}
            <div>
              <label
                htmlFor="address"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Shop Address
              </label>

              <input
                id="address"
                type="text"
                name="address"
                placeholder="Enter your shop address"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="block w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 shadow-sm outline-none transition-all placeholder:text-gray-400 hover:border-gray-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
            </div>

            {/* Zip Code */}
            <div>
              <label
                htmlFor="zipcode"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Zip Code
              </label>

              <input
                id="zipcode"
                type="text"
                name="zipcode"
                placeholder="Enter zip code"
                required
                value={zipCode || ""}
                onChange={(e) => setZipCode(e.target.value)}
                className="block w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 shadow-sm outline-none transition-all placeholder:text-gray-400 hover:border-gray-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Password
              </label>

              <div className="relative">
                <input
                  id="password"
                  type={visible ? "text" : "password"}
                  name="password"
                  autoComplete="new-password"
                  placeholder="Create a strong password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full rounded-xl border border-gray-300 bg-white px-4 py-3 pr-12 text-sm text-gray-900 shadow-sm outline-none transition-all placeholder:text-gray-400 hover:border-gray-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />

                <button
                  type="button"
                  onClick={() => setVisible(!visible)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-gray-500 transition hover:bg-gray-100 hover:text-gray-700"
                >
                  {visible ? (
                    <AiOutlineEye size={22} />
                  ) : (
                    <AiOutlineEyeInvisible size={22} />
                  )}
                </button>
              </div>
            </div>

            {/* Avatar Upload */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Shop Avatar
              </label>

              <div className="flex flex-col items-center gap-4 rounded-xl border border-dashed border-gray-300 bg-gray-50 p-5 sm:flex-row">

                {/* Avatar Preview */}
                <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full border-4 border-white bg-gray-100 shadow-md">
                  {avatar ? (
                    <img
                      src={avatar}
                      alt="Shop avatar"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <RxAvatar className="h-12 w-12 text-gray-400" />
                  )}
                </div>

                {/* Upload */}
                <div className="flex-1 text-center sm:text-left">
                  <p className="text-sm font-medium text-gray-700">
                    Upload your shop logo
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    PNG, JPG or JPEG image recommended
                  </p>

                  <label
                    htmlFor="file-input"
                    className="mt-3 inline-flex cursor-pointer items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm transition-all hover:border-blue-400 hover:bg-blue-50 hover:text-blue-600"
                  >
                    Choose Image

                    <input
                      type="file"
                      name="avatar"
                      id="file-input"
                      accept="image/*"
                      required
                      onChange={handleFileInputChange}
                      className="sr-only"
                    />
                  </label>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="group relative flex h-12 w-full items-center justify-center rounded-xl bg-blue-600 px-4 text-sm font-semibold text-white shadow-lg shadow-blue-200 transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-200 focus:outline-none focus:ring-4 focus:ring-blue-200 active:translate-y-0"
            >
              Create Shop
            </button>

            {/* Login */}
            <div className="flex items-center justify-center gap-1 border-t border-gray-100 pt-6 text-sm">
              <h4 className="text-gray-500">
                Already have an account?
              </h4>

              <Link
                to="/shop-login"
                className="font-semibold text-blue-600 transition hover:text-blue-700 hover:underline"
              >
                Sign in
              </Link>
            </div>

          </form>
        </div>

        {/* Bottom Text */}
        <p className="mt-6 text-center text-xs text-gray-400">
          By creating a shop, you agree to our terms and conditions.
        </p>

      </div>
    </div>
  );
};

export default ShopCreate;
