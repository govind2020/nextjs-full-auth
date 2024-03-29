"use client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import toast from "react-hot-toast";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useAuth } from "../../../context/AuthContext";

const Updateprofile = () => {
  const router = useRouter();
  const { user } = useAuth();

  const validationSchema = yup.object({
    email: yup.string().email("Email must Valid").required("EMail is required"),
    name: yup.string().required("Name is required")
  });

  const onSubmitHandler = async (e) => {
    try {
      //code
      const response = await axios.put("/api/update-profile", e);
      const data = await response.data;
      toast.success(data.msg);

      router.push("/");
    } catch (error) {
      toast.error(error?.response?.data?.error);
    }
  };

  return (
    <div className="min-h-[8vuh] w-full flex justify-center item-centre">
      <Formik
        validationSchema={validationSchema}
        initialValues={user}
        onSubmit={onSubmitHandler}
      >
        <Form className="w-1/2 mx-auto">
          <div className="mb-3">
            <label htmlFor="password">Name</label>
            <Field
              type="text"
              id="name"
              name="name"
              className="w-full py-2 px-4 ring-2 ring-indigo-400 outline-none border-none"
              placeholder="Enter Your Name"
            />
            <ErrorMessage
              name="name"
              component={"p"}
              className="text-red-500"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email">Email</label>
            <Field
              type="text"
              id="email"
              name="email"
              className="w-full py-2 px-4 ring-2 ring-indigo-400 outline-none border-none"
              placeholder="Enter Your Email"
            />
            <ErrorMessage
              name="email"
              component={"p"}
              className="text-red-500"
            />
          </div>
          <div className="mb-3">
            <button
              type="submit"
              className="w-full bg-green-500 rounded text-white py-3"
            >
              Update
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default Updateprofile;
