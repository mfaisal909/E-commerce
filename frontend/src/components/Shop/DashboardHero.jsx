import React from "react";

const DashboardHero = () => {
  return (
    <div className="w-full p-6">
      <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white shadow-lg">
        <p className="text-sm uppercase tracking-[0.2em] text-blue-100">Seller dashboard</p>
        <h1 className="mt-3 text-3xl font-bold">Welcome back</h1>
        <p className="mt-2 text-blue-100">
          Manage your products, events, orders, and shop settings from one place.
        </p>
      </div>
    </div>
  );
};

export default DashboardHero;
