import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { Link, useNavigate } from "react-router";
import SocialLogin from "./SocialLogin";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { SignInUser } = useAuth();
  const navigate = useNavigate();


  const handleLogin = (data) => {
    console.log(data);
    SignInUser(data.email, data.password)
      .then((result) => {
        console.log("after login", result.user);
        navigate("/");
      })
      .catch((errors) => {
        console.log(errors);
      });
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <div className="card-body">
          <h3 className="text-3xl text-center">Welcome back</h3>
          <p className="text-center">Please Login</p>
          <form onSubmit={handleSubmit(handleLogin)}>
            <fieldset className="fieldset">
              <label className="label">Email</label>
              <input
                type="email"
                {...register("email", { required: true })}
                className="input"
                placeholder="Email"
              />
              {errors.email?.type === "required" && (
                <p className="text-red-500">email is required.</p>
              )}

              <label className="label">Password</label>
              <input
                type="password"
                {...register("password", {
                  required: true,
                  minLength: 6,
                  pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).+$/,
                })}
                className="input"
                placeholder="Password"
              />
              {errors.password?.type === "required" && (
                <p className="text-red-500">email is required.</p>
              )}

              {errors.password?.type === "minLength" && (
                <p className="text-red-500">pass must have 6 charracter.</p>
              )}
              {errors.password?.type === "pattern" && (
                <p className="text-red-500">wrong password</p>
              )}

              <div>
                <a className="link link-hover">Forgot password?</a>
              </div>
              <button type="submit" className="btn btn-neutral mt-4">
                login
              </button>
            </fieldset>
            <p>
              New to zapshift{" "}
              <Link className="text-blue-400 underline" to="/register">
                Register
              </Link>
            </p>
          </form>
          <SocialLogin></SocialLogin>
        </div>
      </div>
    </div>
  );
};

export default Login;