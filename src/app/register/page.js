"use client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import toast from "react-hot-toast";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";

const RegisterPage = () => {
  const router = useRouter();

  const validationSchema = yup.object({
    name: yup.string().required('Name is Required'),
    email: yup.string().email("Email must Valid").required("Email is required"),
    password: yup
      .string()
      .min(6, "Password must be greaterthan 6 Characters")
      .required("Password is required")
  });

  const initialValues = {
    name:"",
    email: "",
    password: ""
  };

  const onSubmitHandler = async (e, { resetForm }) => {
    try {
      const response = await axios.post('/api/register', e);
      const data = await response.data;
      console.log('data', {data});
      toast.success(data.msg);
      resetForm();
      router.push("/login");
    } catch (error) {
      toast.error(error?.response?.data?.msg);
    }
  };

  return (
      <div className="min-h-[8vuh] w-full flex justify-center item-centre">
        <Formik validationSchema={validationSchema} initialValues={initialValues} 
        onSubmit={onSubmitHandler}
        >
          <Form className="w-1/2 mx-auto">
            <div className="mb-3">
              <label htmlFor="email">Name</label>
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
                Register
              </button>
            </div>
            <div className="mb-3">
              <p
                className="text-centre"
              >
                Already Have An Account ? <Link href={'/login'} className="text-blue-500 underline" >Login</Link>
              </p>
            </div>
          </Form>
        </Formik>
      </div>
  );
};

export default RegisterPage;
