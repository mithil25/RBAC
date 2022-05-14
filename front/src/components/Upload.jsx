import React from "react";
import { useFormik } from "formik";
import axios from "axios";
import { Redirect, useHistory } from "react-router";

function Upload() {
  const history = useHistory();
  const formik = useFormik({
    initialValues: {
      imgFile: "",
    },
    onSubmit: (values) => {
      let data = new FormData();
      for (let value in values) {
        data.append(value, values[value]);
      }

      axios
        .post("http://localhost:5000/upload", data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(function (response) {
          console.log(response.data);
          if (response.data === true) {
            history.push("/");
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  });

  if (!localStorage.getItem("loggedIn")) {
    return <Redirect to="/" />;
  }
  return (
    <div className="bg-white py-8 px-0 mt-40 flex justify-center">
      <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
        <input
          type="file"
          id="imgFile"
          name="imgFile"
          onChange={(event) => {
            formik.setFieldValue("imgFile", event.target.files[0]);
          }}
        />

        <div className="flex justify-center mt-9">
          <button
            className="bg-gray-600 text-white font-semibold px-6 py-3 mt-4 border-2 rounded-md"
            type="submit"
          >
            Upload
          </button>
        </div>
      </form>
    </div>
  );
}

export default Upload;
