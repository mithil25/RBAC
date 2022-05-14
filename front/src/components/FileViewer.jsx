import React from "react";
import { Redirect } from "react-router";

function FileViewer() {
  if (!localStorage.getItem("loggedIn")) {
    return <Redirect to="/" />;
  }
  return (
    <>
      {/* <div className="flex justify-around mt-24">
        <div className="text-5xl">
          <h1>Udit Pal</h1>
        </div>
        <div className="text-5xl">
          <h1>Administrator</h1>
        </div>
      </div> */}
      <div className="flex justify-center mt-32">
        <div className="text-4xl">
          <input className="shadow border rounded w-96 py-2 px-3 inline-flex mt-2 mx-2" />
        </div>
        <div className="text-2xl ml-14">
          <button className="bg-gray-600 text-white font-semibold px-6 py-3 mt-2 border-2 rounded-md mx-8">
            Request
          </button>
        </div>
      </div>
    </>
  );
}

export default FileViewer;
