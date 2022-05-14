import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Redirect, useHistory } from "react-router";

function Upload() {
  const history = useHistory();
  const formik = useFormik({
    initialValues: {
      email: localStorage.getItem("email"),
      title: "",
      content: "",
      imgFile: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Required"),
      content: Yup.string().required("Required"),
    }),
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
          // console.log(values);
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
    <div className="bg-white py-8 px-0 mt-16 flex justify-center">
      <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
        {/* <div className="my-4 px-4 text-right">
          <label className="font-semibold text-lg mx-2">Title</label>
          <input
            className="shadow border rounded w-96 py-2 px-3 inline-flex mt-2 mx-2"
            type="text"
            name="title"
            placeholder="Title"
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>
        {formik.errors.title && formik.touched.title && (
          <p className="text-red-700 font-semibold text-right mr-8">
            {formik.errors.title}
          </p>
        )} */}

        {/* <div className="my-4 px-4 text-right">
          <label className="font-semibold text-lg mx-2">Content</label>
          <textarea
            className="shadow border rounded w-96 py-2 px-3 inline-flex mt-2 mx-2"
            type="text"
            name="content"
            placeholder="Content"
            value={formik.values.content}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>
        {formik.errors.content && formik.touched.content && (
          <p className="text-red-700 font-semibold text-right mr-8">
            {formik.errors.content}
          </p>
        )} */}

        <input
          type="file"
          id="imgFile"
          name="imgFile"
          onChange={(event) => {
            formik.setFieldValue("imgFile", event.target.files[0]);
          }}
        />

        <div className="flex justify-center">
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
