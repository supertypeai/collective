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
    <main className={`max-w-4xl mx-auto gap-4 backdrop-blur-lg rounded drop-shadow-lg  min-w-0 break-words bg-gradient-to-r from-amber-700 to-rose-900 w-full mb-6 shadow-xl rounded-lg`} >

      <div className="grid grid-cols-4 gap-4 bg-black bg-opacity-30 rounded-lg ">
        {children}
        <div className="footer col-span-12 rounded-lg border bg-opacity-30 bg-gray-200 p-6">
          {/* <!-- Footer content --> */}
        </div>
      </div>
    </main >
  );
};

