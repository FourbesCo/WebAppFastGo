"use client";

import React from "react";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="rounded-2xl flex flex-col items-center justify-center bg-white shadow-md p-6 w-[80%] h-[70%]">
      {children}
    </div>
  );
};

export default Layout;
