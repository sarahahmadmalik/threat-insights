"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import { HiMail, HiUser, HiPhone, HiEye, HiEyeOff } from "react-icons/hi";
import LoadingDots from "@/components/ui/LoadingDots";

export default function SignUpPage() {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({
    username: "",
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [isTouched, setIsTouched] = useState({
    username: false,
    fullName: false,
    email: false,
    phone: false,
    password: false,
    confirmPassword: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validateUsername = () => {
    if (!username) {
      setErrors((prev) => ({ ...prev, username: "Username is required." }));
    } else {
      setErrors((prev) => ({ ...prev, username: "" }));
    }
  };

  const validateFullName = () => {
    if (!fullName) {
      setErrors((prev) => ({ ...prev, fullName: "Full name is required." }));
    } else {
      setErrors((prev) => ({ ...prev, fullName: "" }));
    }
  };

  const validateEmail = () => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!email) {
      setErrors((prev) => ({ ...prev, email: "Email is required." }));
    } else if (!emailRegex.test(email)) {
      setErrors((prev) => ({ ...prev, email: "Invalid email address." }));
    } else {
      setErrors((prev) => ({ ...prev, email: "" }));
    }
  };

  const validatePhone = () => {
    const phoneRegex = /^\+([0-9]{1,4})\d{10}$/; // Country code: 1 to 4 digits, followed by exactly 10 digits for phone number

    if (!phone) {
      setErrors((prev) => ({ ...prev, phone: "Phone number is required." }));
    } else if (!phoneRegex.test(phone)) {
      setErrors((prev) => ({
        ...prev,
        phone:
          "Phone number must include a valid country code and a 10-digit phone number.",
      }));
    } else {
      setErrors((prev) => ({ ...prev, phone: "" }));
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    setIsTouched({
      username: true,
      fullName: true,
      email: true,
      phone: true,
      password: true,
      confirmPassword: true,
    });
    validateUsername();
    validateFullName();
    validateEmail();
    validatePhone();
    validatePassword();
    validateConfirmPassword();

    // If there are errors, return early
    if (
      errors.username ||
      errors.fullName ||
      errors.email ||
      errors.phone ||
      errors.password ||
      errors.confirmPassword
    ) {
      return;
    }

    // API call to register the user
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            name: fullName,
            email,
            phone,
            password,
          }),
        }
      );

      // if (!response.ok) {
      //   throw new Error("Registration failed. Please try again.");
      // }

      const data = await response.json();

      if (data.message) {
        toast.success("Registration successful! You can now log in.");

        setTimeout(() => {
          window.location.href = "/login";
        }, 2000);
      } else {
        toast.error(data.error || "Something went wrong.");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.error || "Something went wrong.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center lg:items-start gap-y-[3rem] py-[3rem] px-5 lg:px-[3rem] relative">
      <Toaster position="top-center" />
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
              <div>
                <div className="relative">
                  <span className="absolute left-3 top-[14px] text-gray-400">
                    <Image
                      src="/icons/user-icon.svg"
                      alt="Username Icon"
                      width={15}
                      height={15}
                    />
                  </span>
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    onBlur={() =>
                      setIsTouched((prev) => ({ ...prev, fullName: true }))
                    }
                    className={`w-full pl-9 py-3 rounded-md bg-gray-800 text-white focus:outline-none transition-all duration-300 ease-in-out ${
                      errors.fullName && isTouched.fullName
                        ? "ring-2 ring-red-500"
                        : "focus:ring-2 focus:ring-blue-500"
                    }`}
                  />
                </div>
                {errors.fullName && isTouched.fullName && (
                  <p className="text-sm text-red-500 mt-2">{errors.fullName}</p>
                )}
              </div>

              {/* Username Field */}
              <div>
                <div className="relative">
                  <span className="absolute left-3 top-[14px] text-gray-400">
                    <Image
                      src="/icons/user-icon.svg"
                      alt="Username Icon"
                      width={15}
                      height={15}
                    />
                  </span>
                  <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    onBlur={() =>
                      setIsTouched((prev) => ({ ...prev, username: true }))
                    }
                    className={`w-full pl-9 py-3 rounded-md bg-gray-800 text-white focus:outline-none transition-all duration-300 ease-in-out ${
                      errors.username && isTouched.username
                        ? "ring-2 ring-red-500"
                        : "focus:ring-2 focus:ring-blue-500"
                    }`}
                  />
                </div>
                {errors.username && isTouched.username && (
                  <p className="text-sm text-red-500 mt-2">{errors.username}</p>
                )}
              </div>
              {/* Email Field */}
              <div>
                <div className="relative">
                  <HiMail
                    size={20}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={() =>
                      setIsTouched((prev) => ({ ...prev, email: true }))
                    }
                    className={`w-full pl-10 py-3 rounded-md bg-gray-800 text-white focus:outline-none transition-all duration-300 ease-in-out ${
                      errors.email && isTouched.email
                        ? "ring-2 ring-red-500"
                        : "focus:ring-2 focus:ring-blue-500"
                    }`}
                  />
                </div>
                {errors.email && isTouched.email && (
                  <p className="text-sm text-red-500 mt-2">{errors.email}</p>
                )}
              </div>

              {/* Phone Field */}
              <div>
                <div className="relative">
                  <HiPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white" />
                  <input
                    type="tel"
                    placeholder="Phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    onBlur={() =>
                      setIsTouched((prev) => ({ ...prev, phone: true }))
                    }
                    className={`w-full pl-9 py-3 rounded-md bg-gray-800 text-white focus:outline-none transition-all duration-300 ease-in-out ${
                      errors.phone && isTouched.phone
                        ? "ring-2 ring-red-500"
                        : "focus:ring-2 focus:ring-blue-500"
                    }`}
                  />
                </div>
                {errors.phone && isTouched.phone && (
                  <p className="text-sm text-red-500 mt-2">{errors.phone}</p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
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
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  >
                    {showPassword ? (
                      <HiEyeOff size={20} />
                    ) : (
                      <HiEye size={20} />
                    )}
                  </button>
                </div>
                {errors.password && isTouched.password && (
                  <p className="text-sm text-red-500 mt-2">{errors.password}</p>
                )}
              </div>

              {/* Confirm Password Field */}
              <div>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
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
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  >
                    {showConfirmPassword ? (
                      <HiEyeOff size={20} />
                    ) : (
                      <HiEye size={20} />
                    )}
                  </button>
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
                <div className="flex w-full justify-center items-center gap-2">
                  <p>Signup</p>
                  {loading ? <LoadingDots /> : ""}
                </div>
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
