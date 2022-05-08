import React from "react";

function Home() {
  return (
    <>
      <div className="flex flex-col justify-center w-full">
        <div className="flex justify-center w-full">
          <button className="bg-gray-600 text-white font-semibold px-6 py-3 mt-4 border-2 rounded-md mx-8">
            Generate Key
          </button>
          <button className="bg-gray-600 text-white font-semibold px-6 py-3 mt-4 border-2 rounded-md mx-8">
            Check Request
          </button>
        </div>
        <div className="my-4 px-4 text-center">
          <label className="font-semibold text-lg mx-2">Key</label>
          <input className="shadow border rounded w-96 py-2 px-3 inline-flex mt-2 mx-2" />
          <button className="bg-gray-600 text-white font-semibold px-6 py-3 mt-4 border-2 rounded-md mx-8">
            Send Key
          </button>
        </div>
      </div>
    </>
  );
}

export default Home;
