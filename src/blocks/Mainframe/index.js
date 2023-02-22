import React from "react";

const RowOfTwo = ({ children }) => {
  return (
    <div>
      <div className="col-span-12 rounded-lg border border-gray-500 bg-gray-200 p-32 sm:col-span-8">
        {/* <!-- Main Content --> */}
      </div>
      <div className="col-span-12 rounded-lg border border-gray-400 bg-gray-200 p-16 sm:col-span-4">
        {/* <!-- Sidebar --> */}
      </div>
    </div>
  );
};

const Mainframe = ({ children }) => {
  return (
    <div className="mx-auto grid max-w-4xl grid-cols-12 gap-4 bg-zinc-50 p-1">
      <div className="header col-span-12 rounded-lg border border-gray-300 bg-gray-600 py-8">
        {/* <!-- Header content --> */}
      </div>
      {children}
      <div className="footer col-span-12 rounded-lg border border-gray-800 bg-gray-700 p-6">
        {/* <!-- Footer content --> */}
      </div>
    </div>
  );
};

export default Mainframe;
