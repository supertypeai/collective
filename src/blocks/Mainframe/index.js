import Toprow from '../Toprow';

import Home from '@/icons/Home'

const Body = ({ children }) => {
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

export const Mainframe = ({ children }) => {
  return (
    <main className={`max-w-7xl mx-auto gap-4 backdrop-blur-lg rounded drop-shadow-lg my-12 break-words bg-gradient-to-r from-amber-700 to-rose-900 mb-6 shadow-xl rounded-lg`} >

      <div className="grid grid-cols-12 items-center grid-flow gap-4 bg-black bg-opacity-30 rounded-lg px-4 lg:px-8">
        {children}
        <div className="footer col-span-12 rounded-lg border bg-opacity-30 bg-gray-200 p-6">
          {/* <!-- Footer content --> */}
        </div>
      </div>
    </main >
  );
};

