"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import LoadingDots from "@/components/ui/LoadingDots";
import { HiEye, HiEyeOff } from "react-icons/hi";
import Cookies from "js-cookie";

export default function LoginPage() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ identifier: "", password: "" });
  const [isTouched, setIsTouched] = useState({
    identifier: false,
    password: false,
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const validateIdentifier = () => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    if (!identifier) {
      setErrors((prev) => ({
        ...prev,
        identifier: "Username or Email is required.",
      }));
    } else if (
      !emailRegex.test(identifier) &&
      identifier.trim().includes(" ")
    ) {
      setErrors((prev) => ({
        ...prev,
        identifier: "Invalid username or email.",
      }));
    } else {
      setErrors((prev) => ({ ...prev, identifier: "" }));
    }
  };

  const validatePassword = () => {
    if (!password) {
      setErrors((prev) => ({ ...prev, password: "Password is required." }));
    } else if (password.length < 6) {
      setErrors((prev) => ({
        ...prev,
        password: "Password must be at least 6 characters.",
      }));
    } else {
      setErrors((prev) => ({ ...prev, password: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsTouched({
      identifier: true,
      password: true,
    });

    validateIdentifier();
    validatePassword();

    if (!identifier || !password || errors.identifier || errors.password) {
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ emailOrUsername: identifier, password }),
        }
      );

      const data = await res.json();

      if (data.success) {
        toast.success("Login Successful!");
        Cookies.set("auth_token", data.token, { expires: 3, secure: false });
        console.log("cookies", Cookies.get("auth_token"));

        // Redirect based on role
        const role = data.user.role;
        role === "admin"
          ? router.push(`/${role}/users`)
          : router.push(`/${role}/home`);
      } else {
        toast.error(data.error || "Something went wrong!");
      }
    } catch (error) {
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
          <div className="w-full max-w-lg py-8 px-6 lg:p-8 space-y-6 bg-white bg-opacity-10 backdrop-blur-md rounded-xl shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-6 py-5">
              <div>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Username or Email"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    onBlur={() =>
                      setIsTouched((prev) => ({ ...prev, identifier: true }))
                    }
                    className={`w-full px-9 py-3 rounded-md bg-gray-800 text-white focus:outline-none transition-all duration-300 ease-in-out ${
                      errors.identifier && isTouched.identifier
                        ? "ring-2 ring-red-500"
                        : "focus:ring-2 focus:ring-blue-500"
                    }`}
                  />
                  <span className="absolute left-3 top-[14px] text-gray-400">
                    <Image
                      src="/icons/user-icon.svg"
                      alt="Identifier Icon"
                      width={15}
                      height={15}
                    />
                  </span>
                </div>
                {errors.identifier && isTouched.identifier && (
                  <p className="text-sm text-red-500 mt-2 ">
                    {errors.identifier}
                  </p>
                )}
              </div>
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
                  <p className="text-sm text-red-500 mt-2 ">
                    {errors.password}
                  </p>
                )}
              </div>
              <div className="flex items-center justify-between">
                <label className="flex items-center text-gray-400">
                  <input type="checkbox" className="mr-2" />
                  Remember me
                </label>
                <Link
                  href="/forgot-password"
                  className="text-blue-500 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 !mt-7 text-lg font-[500] text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-400 focus:ring-opacity-50 transition-transform transform hover:scale-105 active:scale-95"
              >
                <div className="flex w-full justify-center items-center gap-2">
                  <p>Sign in</p>
                  {loading ? <LoadingDots /> : ""}
                </div>
              </button>
            </form>
            <div className="text-center text-gray-400">
              <p>
                Don&apos;t have an account?{" "}
                <Link href="/signup" className="text-blue-500 hover:underline">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
