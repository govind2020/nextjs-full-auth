"use client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import toast from "react-hot-toast";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";

const LoginPage = () => {

  const router = useRouter();

  const validationSchemas = yup.object({
    email: yup.string().email("Email must Valid").required("Email is required"),
    password: yup
      .string()
      .min(6, "Password must be greaterthan 6 Characters")
      .required("Password is required")
  });

  const initialValues = {
    email: "",
    password: ""
  };

  const onSubmitHandler = async (e, { resetForm }) => {
    try {
      const response = await axios.post('/api/login', e);
      const data = await response.data;
      toast.success(data.msg);
      resetForm();
      router.push("/");
    } catch (error) {
      toast.error(error?.response?.data.error);
    }
  };

  return (
      <div className="min-h-[8vuh] w-full flex justify-center item-centre">
        <Formik validationSchema={validationSchemas} initialValues={initialValues} 
        onSubmit={onSubmitHandler}
        >
          <Form className="w-1/2 mx-auto">
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
              <label htmlFor="password">Password</label>
              <Field
                type="text"
                id="password"
                name="password"
                className="w-full py-2 px-4 ring-2 ring-indigo-400 outline-none border-none"
                placeholder="Enter Your Password"
              />
              <ErrorMessage
                name="password"
                component={"p"}
                className="text-red-500"
              />
            </div>
            <div className="mb-3">
              <button
                type="submit"
                className="w-full bg-green-500 rounded text-white py-3"
              >
                Login
              </button>
            </div>
            <div className="mb-3">
              <p
                className="text-centre"
              >
                Dont{"'"}t Have An Account ? <Link href={'/register'} className="text-blue-500 underline" >Register</Link>
              </p>
            </div>
            <div className="mb-3">
              <p
                className="text-centre"
              >
                Forget Password ? <Link href={'/forgot'} className="text-blue-500 underline" >Password</Link>
              </p>
            </div>
          </Form>
        </Formik>
      </div>
  );
};

export default LoginPage;
