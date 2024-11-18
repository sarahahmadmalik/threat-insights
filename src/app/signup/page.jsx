"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function SignUpPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [isTouched, setIsTouched] = useState({
    username: false,
    password: false,
    confirmPassword: false,
  });

  const validateUsername = () => {
    if (!username) {
      setErrors((prev) => ({ ...prev, username: "Username is required." }));
    } else {
      setErrors((prev) => ({ ...prev, username: "" }));
    }
  };

  const validatePassword = () => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    if (!password) {
      setErrors((prev) => ({ ...prev, password: "Password is required." }));
    } else if (!passwordRegex.test(password)) {
      setErrors((prev) => ({
        ...prev,
        password:
          "Password must be at least 6 characters, including one uppercase letter, one lowercase letter, one number, and one special character.",
      }));
    } else {
      setErrors((prev) => ({ ...prev, password: "" }));
    }
  };

  const validateConfirmPassword = () => {
    if (confirmPassword !== password) {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: "Passwords do not match.",
      }));
    } else {
      setErrors((prev) => ({ ...prev, confirmPassword: "" }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Set touched to true when form is submitted
    setIsTouched({
      username: true,
      password: true,
      confirmPassword: true,
    });
    validateUsername();
    validatePassword();
    validateConfirmPassword();
  };

  return (
    <div className="min-h-screen flex flex-col items-center lg:items-start gap-y-[3rem] py-[3rem] px-5 lg:px-[3rem] relative">
      <div
        className="absolute inset-0 bg-gradient-to-t from-[#1A2237] via-[#1A2237] to-transparent opacity-60"
        style={{
          backgroundImage: "url('/landing.svg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      ></div>
      <div className="flex justify-center relative z-10">
        <Image
          src="/logo.svg"
          alt="Threat Insights Logo"
          width={150}
          height={50}
          className="object-contain"
        />
      </div>
      <div className="w-full flex items-center">
        <div className="flex items-center justify-center lg:justify-start w-full lg:w-4/5 xl:w-3/4 h-full">
          {/* Sign Up Box */}
          <div className="w-full max-w-lg py-8 px-6 lg:p-8 space-y-6 bg-white bg-opacity-10 backdrop-blur-md rounded-xl shadow-lg">
            {/* Form Section */}
            <form onSubmit={handleSubmit} className="space-y-6 py-5">
              {/* Username Field */}
              <div>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    onBlur={() =>
                      setIsTouched((prev) => ({ ...prev, username: true }))
                    }
                    className={`w-full px-9 py-3 rounded-md bg-gray-800 text-white focus:outline-none transition-all duration-300 ease-in-out ${
                      errors.username && isTouched.username
                        ? "ring-2 ring-red-500"
                        : "focus:ring-2 focus:ring-blue-500"
                    }`}
                  />
                  <span className="absolute left-3 top-[14px] text-gray-400">
                    <Image
                      src="/icons/user-icon.svg"
                      alt="Username Icon"
                      width={15}
                      height={15}
                    />
                  </span>
                </div>
                {errors.username && isTouched.username && (
                  <p className="text-sm text-red-500 mt-2">{errors.username}</p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <div className="relative">
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onBlur={() =>
                      setIsTouched((prev) => ({ ...prev, password: true }))
                    }
                    className={`w-full px-9 py-3 rounded-md bg-gray-800 text-white focus:outline-none transition-all duration-300 ease-in-out ${
                      errors.password && isTouched.password
                        ? "ring-2 ring-red-500"
                        : "focus:ring-2 focus:ring-blue-500"
                    }`}
                  />
                  <span className="absolute left-3 top-[14px] text-gray-400">
                    <Image
                      src="/icons/pass-icon.svg"
                      alt="Password Icon"
                      width={20}
                      height={20}
                    />
                  </span>
                </div>
                {errors.password && isTouched.password && (
                  <p className="text-sm text-red-500 mt-2">{errors.password}</p>
                )}
              </div>

              {/* Confirm Password Field */}
              <div>
                <div className="relative">
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      validateConfirmPassword(); // Validate on change
                    }}
                    onBlur={() =>
                      setIsTouched((prev) => ({
                        ...prev,
                        confirmPassword: true,
                      }))
                    }
                    className={`w-full px-9 py-3 rounded-md bg-gray-800 text-white focus:outline-none transition-all duration-300 ease-in-out ${
                      errors.confirmPassword && isTouched.confirmPassword
                        ? "ring-2 ring-red-500"
                        : "focus:ring-2 focus:ring-blue-500"
                    }`}
                  />
                  <span className="absolute left-3 top-[14px] text-gray-400">
                    <Image
                      src="/icons/pass-icon.svg"
                      alt="Password Icon"
                      width={20}
                      height={20}
                    />
                  </span>
                </div>
                {errors.confirmPassword && isTouched.confirmPassword && (
                  <p className="text-sm text-red-500 mt-2">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 !mt-7 text-lg font-[500] text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-400 focus:ring-opacity-50 transition-transform transform hover:scale-105 active:scale-95"
              >
                Sign Up
              </button>
            </form>

            {/* Sign-in Section */}
            <div className="text-center text-gray-400">
              <p>
                Already have an account?{" "}
                <Link href="/login" className="text-blue-500 hover:underline">
                  Sign in
                </Link>
              </p>
            </div>
            {/* Notes Section */}
            {/* <div className="pt-6 text-sm text-gray-500">
              <p>** NOTES **</p>
              <ul className="list-disc ml-4">
                <li>Must be MFA/2FA for all users</li>
                <li>Only allow 3 failed logins before account lock</li>
                <li>Must withstand brute force attacks</li>
                <li>Use generic error messages</li>
              </ul>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
