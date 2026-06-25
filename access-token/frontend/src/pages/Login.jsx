import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";

const Login = () => {

  const [serverError, setServerError] = useState("");

  const { register, handleSubmit, onLogin, errors, navigate } = useAuth();

  const handleNavigateToRegister = () => {
    navigate("/register");
  };

  const onInvalid = (errors) => {
    console.error("❌ Validation errors:", errors);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>

          <p className="mt-2 text-sm text-gray-600">
            Or{" "}
            <button
              type="button"
              onClick={handleNavigateToRegister}
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              create a new account
            </button>
          </p>
        </div>

        <form
          className="mt-8 space-y-6"
          onSubmit={handleSubmit(
            (data) => onLogin(data, setServerError),
            onInvalid
          )}
        >
          <div className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>

              <input
                id="email"
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                className={`appearance-none relative block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2
    ${errors.email || serverError
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-blue-500"
                  }`}
                placeholder="Enter your email"
              />

              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>

              <input
                id="password"
                type="password"
                autoComplete="current-password"
                {...register("password", {
                  required: "Password is required",
                })}
                className={`appearance-none relative block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2
    ${errors.password || serverError
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-blue-500"
                  }`}
                placeholder="Enter your password"
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>

          <div>
            {serverError && (
              <div className="rounded-md bg-red-100 border border-red-400 text-red-700 px-4 py-3">
                {serverError}
              </div>
            )}
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 cursor-pointer"
            >
              Sign In
            </button>
          </div>

          <div className="text-center pt-2">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <button
                type="button"
                onClick={handleNavigateToRegister}
                className="font-semibold text-blue-600 hover:text-blue-500"
              >
                Register here
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
