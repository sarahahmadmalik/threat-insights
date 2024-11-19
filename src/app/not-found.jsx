// pages/404.js
"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

const NotFoundPage = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-white text-black px-6">
      <Image src="/not-found.svg" alt="404" width={120} height={120} />
      <h1 className="text-4xl font-bold mt-6">404 - Page Not Found</h1>
      <p className="mt-4 text-gray-600 text-center">
        Oops! The page you&apos;re looking for doesn&apos;t exist.
      </p>

      <button
        onClick={() => router.push("/")}
        className="mt-6 bg-[#2F90B0] text-white px-6 py-2 rounded hover:bg-[#246e85] transition-all duration-300"
      >
        Go Back Home
      </button>
    </div>
  );
};

export default NotFoundPage;
