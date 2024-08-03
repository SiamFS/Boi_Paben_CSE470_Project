import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import Navbar from "../components/navbar";

const DashboardLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-grow mt-[180px] md:mt-[140px]"> {/* Adjust top margin based on Navbar height */}
        <Sidebar />
        <main className="flex-grow p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;