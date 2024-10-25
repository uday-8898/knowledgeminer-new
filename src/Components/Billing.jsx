import React from 'react';
import Navbar from './Navbar';

const Billing = () => {
  return (
    <div>
        <Navbar/>
    <div className="bg-gray-50 py-20">
      <div className="text-center mb-12">
        <h1 className="font-light text-gray-800 text-3xl">Empower your business with cutting-edge AI</h1>
        <h1 className="text-gray-800 text-3xl">Powered by Technology</h1>
        <p className="mt-4 text-gray-500 leading-relaxed w-1/3 mx-auto">
        that delivers fast, accurate insights and seamless integration into your existing systems
        </p>
      </div>
      <div className="flex flex-col md:flex-row justify-center md:space-x-6 mb-12 mx-8">

        <div className="bg-white border-l-4 border-red-500 shadow-lg rounded-lg p-6 mb-6 md:mb-0 flex flex-col justify-between h-64">
          <h2 className="text-gray-800 font-semibold text-xl">Trial</h2>
          <p className="text-gray-500">Scans our talent network to create the optimal team for your project</p>
          <img src="https://assets.codepen.io/2301174/icon-team-builder.svg" alt="" className="mt-4 self-end" />
        </div>

        <div className="bg-white border-l-4 border-blue-500 shadow-lg rounded-lg p-6 mb-6 md:mb-0 flex flex-col justify-between h-64">
          <h2 className="text-gray-800 font-semibold text-xl">Invoices</h2>
          <p className="text-gray-500">Uses data from past projects to provide better delivery estimates</p>
          <img src="https://assets.codepen.io/2301174/icon-calculator.svg" alt="" className="mt-4 self-end" />
        </div>
      </div>

      <div className="flex justify-center">
        <div className="bg-white border-l-4 border-orange-500 shadow-lg rounded-lg p-6 flex flex-col justify-between h-64">
          <h2 className="text-gray-800 font-semibold text-xl">Billing Info</h2>
          <p className="text-gray-500">Regularly evaluates our talent to ensure quality</p>
          <img src="https://assets.codepen.io/2301174/icon-karma.svg" alt="" className="mt-4 self-end" />
        </div>
      </div>
    </div>
    </div>
    
  );
};

export default Billing;
