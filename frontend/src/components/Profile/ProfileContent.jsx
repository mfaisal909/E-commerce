import React, { useState, useEffect } from "react";
import {
  AiOutlineArrowRight,
  AiOutlineCamera,
  AiOutlineDelete,
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { server } from "../../server";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { MdTrackChanges } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";
import {
  deleteUserAddress,
  loadUser,
  updatUserAddress,
  updateUserInformation,
} from "../../redux/actions/user";
import { Country, State } from "country-state-city";
import { toast } from "react-toastify";
import axios from "axios";
import { getAllOrdersOfUser } from "../../redux/actions/order";

const ProfileContent = ({ active }) => {
  const { user, error, successMessage } = useSelector(
    (state) => state.user
  );

  const [name, setName] = useState(user && user.name);
  const [email, setEmail] = useState(user && user.email);
  const [phoneNumber, setPhoneNumber] = useState(
    user && user.phoneNumber
  );
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "clearErrors" });
    }

    if (successMessage) {
      toast.success(successMessage);
      dispatch({ type: "clearMessages" });
    }
  }, [error, successMessage, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      updateUserInformation(
        name,
        email,
        phoneNumber,
        password
      )
    );
  };

  const handleImage = async (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatar(reader.result);

        axios
          .put(
            `${server}/user/update-avatar`,
            { avatar: reader.result },
            {
              withCredentials: true,
            }
          )
          .then(() => {
            dispatch(loadUser());
            toast.success("Avatar updated successfully!");
          })
          .catch((error) => {
            toast.error(error);
          });
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <div className="w-full min-h-full bg-white">

      {/* ================= PROFILE ================= */}
      {active === 1 && (
        <div className="w-full px-4 py-6 sm:px-6 md:px-8 lg:px-10">

          {/* Profile Header */}
          <div className="mb-8 flex flex-col items-center justify-center">

            <div className="relative">
              <div className="h-32 w-32 overflow-hidden rounded-full border-4 border-emerald-500 bg-gray-100 shadow-lg sm:h-36 sm:w-36">
                <img
                  src={
                    user?.avatar?.startsWith("data:") || user?.avatar?.startsWith("http")
                      ? user.avatar
                      : user?.avatar
                        ? `${server.replace("/api/v2", "/")}${user.avatar.replace(/\\/g, "/")}`
                        : undefined
                  }
                  alt="Profile"
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Camera Button */}
              <label
                htmlFor="image"
                className="absolute bottom-1 right-1 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border-2 border-white bg-gray-900 text-white shadow-md transition-all duration-200 hover:bg-emerald-600"
              >
                <AiOutlineCamera size={18} />

                <input
                  type="file"
                  id="image"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImage}
                />
              </label>
            </div>

            <h2 className="mt-4 text-xl font-bold text-gray-900 sm:text-2xl">
              {user?.name || "My Profile"}
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Manage your account information
            </p>
          </div>

          {/* Profile Form */}
          <form
            onSubmit={handleSubmit}
            aria-required={true}
            className="mx-auto w-full max-w-4xl"
          >

            {/* First Row */}
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

              {/* Full Name */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Full Name
                </label>

                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  className="h-12 w-full rounded-lg border border-gray-300 bg-white px-4 text-sm text-gray-800 outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                />
              </div>

              {/* Email */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Email Address
                </label>

                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="h-12 w-full rounded-lg border border-gray-300 bg-white px-4 text-sm text-gray-800 outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Phone Number
                </label>

                <input
                  type="tel"
                  required
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="Enter your phone number"
                  className="h-12 w-full rounded-lg border border-gray-300 bg-white px-4 text-sm text-gray-800 outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                />
              </div>

              {/* Password */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Enter Your Password
                </label>

                <input
                  type="password"
                  minLength={password ? 6 : undefined}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Leave blank to keep your password"
                  className="h-12 w-full rounded-lg border border-gray-300 bg-white px-4 text-sm text-gray-800 outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                />
              </div>
            </div>

            {/* Update Button */}
            <div className="mt-7 flex justify-center md:justify-start">
              <button
                type="submit"
                className="h-12 min-w-[180px] rounded-lg bg-emerald-600 px-8 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:bg-emerald-700 hover:shadow-lg active:scale-[0.98]"
              >
                Update Profile
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ================= ORDERS ================= */}
      {active === 2 && (
        <div className="w-full p-4 sm:p-6 md:p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              My Orders
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              View and manage your recent orders
            </p>
          </div>

          <AllOrders />
        </div>
      )}

      {/* ================= REFUNDS ================= */}
      {active === 3 && (
        <div className="w-full p-4 sm:p-6 md:p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Refund Orders
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Track your refund requests
            </p>
          </div>

          <AllRefundOrders />
        </div>
      )}

      {/* ================= INBOX ================= */}
      {active === 4 && (
        <div className="w-full p-4 sm:p-6 md:p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Inbox</h2>
            <p className="mt-1 text-sm text-gray-500">
              Your messages will appear here.
            </p>
          </div>

          <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 px-6 py-12 text-center">
            <p className="text-sm text-gray-500">No messages yet.</p>
          </div>
        </div>
      )}

      {/* ================= TRACK ORDER ================= */}
      {active === 5 && (
        <div className="w-full p-4 sm:p-6 md:p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Track Order
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Track the status of your orders
            </p>
          </div>

          <TrackOrder />
        </div>
      )}

      {/* ================= CHANGE PASSWORD ================= */}
      {active === 6 && (
        <div className="w-full px-4 py-6 sm:px-6 md:px-8 lg:px-10">
          <ChangePassword />
        </div>
      )}

      {/* ================= ADDRESS ================= */}
      {active === 7 && (
        <div className="w-full px-4 py-6 sm:px-6 md:px-8 lg:px-10">
          <Address />
        </div>
      )}
    </div>
  );
};


/* =========================================================
   ALL ORDERS
========================================================= */

const AllOrders = () => {
  const { user } = useSelector((state) => state.user);
  const { orders } = useSelector((state) => state.order);

  const dispatch = useDispatch();

  useEffect(() => {
    if (user?._id) {
      dispatch(getAllOrdersOfUser(user._id));
    }
  }, [dispatch, user]);

  const columns = [
    {
      field: "id",
      headerName: "Order ID",
      minWidth: 150,
      flex: 0.7,
    },

    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,

      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "text-green-600 font-semibold"
          : "text-red-500 font-semibold";
      },
    },

    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },

    {
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "",
      type: "number",
      sortable: false,

      renderCell: (params) => {
        return (
          <Link
            to={`/user/order/${params.id}`}
            className="flex h-9 w-9 items-center justify-center rounded-full text-gray-600 transition-all hover:bg-gray-100 hover:text-emerald-600"
          >
            <Button>
              <AiOutlineArrowRight size={20} />
            </Button>
          </Link>
        );
      },
    },
  ];

  const row = [];

  orders &&
    orders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.cart.length,
        total: "US$ " + item.totalPrice,
        status: item.status,
      });
    });

  return (
    <div className="w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="w-full overflow-x-auto p-2 sm:p-4">
        <DataGrid
          rows={row}
          columns={columns}
          pageSize={10}
          disableSelectionOnClick
          autoHeight
        />
      </div>
    </div>
  );
};


/* =========================================================
   ALL REFUND ORDERS
========================================================= */

const AllRefundOrders = () => {
  const { user } = useSelector((state) => state.user);
  const { orders } = useSelector((state) => state.order);

  const dispatch = useDispatch();

  useEffect(() => {
    if (user?._id) {
      dispatch(getAllOrdersOfUser(user._id));
    }
  }, [dispatch, user]);

  const eligibleOrders =
    orders &&
    orders.filter(
      (item) => item.status === "Processing refund"
    );

  const columns = [
    {
      field: "id",
      headerName: "Order ID",
      minWidth: 150,
      flex: 0.7,
    },

    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,

      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "text-green-600 font-semibold"
          : "text-red-500 font-semibold";
      },
    },

    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },

    {
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "",
      type: "number",
      sortable: false,

      renderCell: (params) => {
        return (
          <Link
            to={`/user/order/${params.id}`}
            className="flex h-9 w-9 items-center justify-center rounded-full text-gray-600 transition-all hover:bg-gray-100 hover:text-emerald-600"
          >
            <Button>
              <AiOutlineArrowRight size={20} />
            </Button>
          </Link>
        );
      },
    },
  ];

  const row = [];

  eligibleOrders &&
    eligibleOrders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.cart.length,
        total: "US$ " + item.totalPrice,
        status: item.status,
      });
    });

  return (
    <div className="w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="w-full overflow-x-auto p-2 sm:p-4">
        <DataGrid
          rows={row}
          columns={columns}
          pageSize={10}
          autoHeight
          disableSelectionOnClick
        />
      </div>
    </div>
  );
};


/* =========================================================
   TRACK ORDER
========================================================= */

const TrackOrder = () => {
  const { user } = useSelector((state) => state.user);
  const { orders } = useSelector((state) => state.order);

  const dispatch = useDispatch();

  useEffect(() => {
    if (user?._id) {
      dispatch(getAllOrdersOfUser(user._id));
    }
  }, [dispatch, user]);

  const columns = [
    {
      field: "id",
      headerName: "Order ID",
      minWidth: 150,
      flex: 0.7,
    },

    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,

      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "text-green-600 font-semibold"
          : "text-red-500 font-semibold";
      },
    },

    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },

    {
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "",
      type: "number",
      sortable: false,

      renderCell: (params) => {
        return (
          <Link
            to={`/user/track/order/${params.id}`}
            className="flex h-9 w-9 items-center justify-center rounded-full text-gray-600 transition-all hover:bg-gray-100 hover:text-emerald-600"
          >
            <Button>
              <MdTrackChanges size={20} />
            </Button>
          </Link>
        );
      },
    },
  ];

  const row = [];

  orders &&
    orders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.cart.length,
        total: "US$ " + item.totalPrice,
        status: item.status,
      });
    });

  return (
    <div className="w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="w-full overflow-x-auto p-2 sm:p-4">
        <DataGrid
          rows={row}
          columns={columns}
          pageSize={10}
          disableSelectionOnClick
          autoHeight
        />
      </div>
    </div>
  );
};


/* =========================================================
   CHANGE PASSWORD
========================================================= */

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const passwordChangeHandler = async (e) => {
    e.preventDefault();

    await axios
      .put(
        `${server}/user/update-user-password`,
        {
          oldPassword,
          newPassword,
          confirmPassword,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        toast.success(res.data.message);

        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  return (
    <div className="w-full">

      {/* Heading */}
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
          Change Password
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          Keep your account secure with a strong password
        </p>
      </div>

      {/* Form */}
      <form
        aria-required
        onSubmit={passwordChangeHandler}
        className="mx-auto w-full max-w-xl"
      >

        {/* Old Password */}
        <div className="mb-5">
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Enter Your Old Password
          </label>

          <input
            type="password"
            required
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            placeholder="Enter old password"
            className="h-12 w-full rounded-lg border border-gray-300 px-4 text-sm text-gray-800 outline-none transition-all focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
          />
        </div>

        {/* New Password */}
        <div className="mb-5">
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Enter Your New Password
          </label>

          <input
            type="password"
            required
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter new password"
            className="h-12 w-full rounded-lg border border-gray-300 px-4 text-sm text-gray-800 outline-none transition-all focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
          />
        </div>

        {/* Confirm Password */}
        <div className="mb-6">
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Confirm Your Password
          </label>

          <input
            type="password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm new password"
            className="h-12 w-full rounded-lg border border-gray-300 px-4 text-sm text-gray-800 outline-none transition-all focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          className="h-12 w-full rounded-lg bg-emerald-600 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:bg-emerald-700 hover:shadow-lg active:scale-[0.98]"
        >
          Update Password
        </button>
      </form>
    </div>
  );
};


/* =========================================================
   ADDRESS
========================================================= */

const Address = () => {
  const [open, setOpen] = useState(false);
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState();
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [addressType, setAddressType] = useState("");

  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const addressTypeData = [
    {
      name: "Default",
    },
    {
      name: "Home",
    },
    {
      name: "Office",
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      addressType === "" ||
      country === "" ||
      city === ""
    ) {
      toast.error("Please fill all the fields!");
    } else {
      dispatch(
        updatUserAddress(
          country,
          city,
          address1,
          address2,
          zipCode,
          addressType
        )
      );

      setOpen(false);
      setCountry("");
      setCity("");
      setAddress1("");
      setAddress2("");
      setZipCode(null);
      setAddressType("");
    }
  };

  const handleDelete = (item) => {
    const id = item._id;
    dispatch(deleteUserAddress(id));
  };

  return (
    <div className="w-full">

      {/* =================================================
          ADD ADDRESS MODAL
      ================================================= */}

      {open && (
        <div className="fixed inset-0 z-[999] flex min-h-screen items-center justify-center bg-black/50 px-4 py-6 backdrop-blur-sm">

          <div className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white shadow-2xl">

            {/* Close */}
            <div className="sticky top-0 z-10 flex justify-end border-b border-gray-100 bg-white p-4">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-full text-gray-500 transition-all hover:bg-gray-100 hover:text-red-500"
              >
                <RxCross1 size={20} />
              </button>
            </div>

            {/* Modal Heading */}
            <div className="px-6 pt-4 text-center">
              <h1 className="text-2xl font-bold text-gray-900">
                Add New Address
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                Add a new delivery address to your account
              </p>
            </div>

            {/* Address Form */}
            <form
              aria-required
              onSubmit={handleSubmit}
              className="p-6"
            >

              {/* Country */}
              <div className="mb-5">
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Country
                </label>

                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="h-12 w-full rounded-lg border border-gray-300 bg-white px-4 text-sm text-gray-700 outline-none transition-all focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                >
                  <option value="">
                    Choose your country
                  </option>

                  {Country &&
                    Country.getAllCountries().map((item) => (
                      <option
                        key={item.isoCode}
                        value={item.isoCode}
                      >
                        {item.name}
                      </option>
                    ))}
                </select>
              </div>

              {/* City */}
              <div className="mb-5">
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Choose your City
                </label>

                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="h-12 w-full rounded-lg border border-gray-300 bg-white px-4 text-sm text-gray-700 outline-none transition-all focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                >
                  <option value="">
                    Choose your city
                  </option>

                  {State &&
                    State.getStatesOfCountry(country).map(
                      (item) => (
                        <option
                          key={item.isoCode}
                          value={item.isoCode}
                        >
                          {item.name}
                        </option>
                      )
                    )}
                </select>
              </div>

              {/* Address 1 */}
              <div className="mb-5">
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Address 1
                </label>

                <input
                  type="text"
                  required
                  value={address1}
                  onChange={(e) =>
                    setAddress1(e.target.value)
                  }
                  placeholder="Enter your address"
                  className="h-12 w-full rounded-lg border border-gray-300 px-4 text-sm text-gray-800 outline-none transition-all placeholder:text-gray-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                />
              </div>

              {/* Address 2 */}
              <div className="mb-5">
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Address 2
                </label>

                <input
                  type="text"
                  required
                  value={address2}
                  onChange={(e) =>
                    setAddress2(e.target.value)
                  }
                  placeholder="Apartment, suite, etc."
                  className="h-12 w-full rounded-lg border border-gray-300 px-4 text-sm text-gray-800 outline-none transition-all placeholder:text-gray-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                />
              </div>

              {/* Zip Code */}
              <div className="mb-5">
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Zip Code
                </label>

                <input
                  type="number"
                  required
                  value={zipCode}
                  onChange={(e) =>
                    setZipCode(e.target.value)
                  }
                  placeholder="Enter zip code"
                  className="h-12 w-full rounded-lg border border-gray-300 px-4 text-sm text-gray-800 outline-none transition-all placeholder:text-gray-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                />
              </div>

              {/* Address Type */}
              <div className="mb-6">
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Address Type
                </label>

                <select
                  value={addressType}
                  onChange={(e) =>
                    setAddressType(e.target.value)
                  }
                  className="h-12 w-full rounded-lg border border-gray-300 bg-white px-4 text-sm text-gray-700 outline-none transition-all focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                >
                  <option value="">
                    Choose your Address Type
                  </option>

                  {addressTypeData &&
                    addressTypeData.map((item) => (
                      <option
                        key={item.name}
                        value={item.name}
                      >
                        {item.name}
                      </option>
                    ))}
                </select>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="h-12 w-full rounded-lg bg-emerald-600 text-sm font-semibold text-white shadow-md transition-all hover:bg-emerald-700 hover:shadow-lg active:scale-[0.98]"
              >
                Save Address
              </button>
            </form>
          </div>
        </div>
      )}

      {/* =================================================
          ADDRESS HEADER
      ================================================= */}

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            My Addresses
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Manage your saved delivery addresses
          </p>
        </div>

        <button
          type="button"
          onClick={() => setOpen(true)}
          className="w-full rounded-lg bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-md transition-all hover:bg-emerald-700 hover:shadow-lg sm:w-auto"
        >
          + Add New Address
        </button>
      </div>

      {/* =================================================
          SAVED ADDRESSES
      ================================================= */}

      <div className="space-y-4">

        {(user?.addresses ?? []).map((item, index) => (
            <div
              key={index}
              className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-200 hover:border-emerald-200 hover:shadow-md lg:flex-row lg:items-center lg:justify-between"
            >

              {/* Address Type */}
              <div className="flex items-center gap-3 lg:min-w-[130px]">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                  <span className="text-sm font-bold">
                    {item.addressType?.charAt(0)}
                  </span>
                </div>

                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                    Type
                  </p>

                  <h5 className="font-semibold text-gray-900">
                    {item.addressType}
                  </h5>
                </div>
              </div>

              {/* Address */}
              <div className="flex-1 lg:px-6">
                <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                  Address
                </p>

                <p className="mt-1 text-sm leading-6 text-gray-700">
                  {item.address1} {item.address2}
                </p>
              </div>

              {/* Phone */}
              <div className="lg:min-w-[150px]">
                <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                  Phone
                </p>

                <p className="mt-1 text-sm font-medium text-gray-700">
                  {user && user.phoneNumber}
                </p>
              </div>

              {/* Delete */}
              <div className="flex justify-end lg:min-w-[50px]">
                <button
                  type="button"
                  onClick={() => handleDelete(item)}
                  className="flex h-10 w-10 items-center justify-center rounded-lg text-gray-400 transition-all duration-200 hover:bg-red-50 hover:text-red-500"
                  title="Delete address"
                >
                  <AiOutlineDelete size={21} />
                </button>
              </div>
            </div>
          ))}

        {/* Empty State */}
        {(user?.addresses ?? []).length === 0 && (
          <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 px-6 py-12 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gray-200 text-gray-500">
              <AiOutlineDelete size={24} />
            </div>

            <h5 className="text-lg font-semibold text-gray-800">
              No saved addresses
            </h5>

            <p className="mt-1 text-sm text-gray-500">
              You don't have any saved address yet.
            </p>

            <button
              type="button"
              onClick={() => setOpen(true)}
              className="mt-5 rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-emerald-700"
            >
              Add Your First Address
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileContent;