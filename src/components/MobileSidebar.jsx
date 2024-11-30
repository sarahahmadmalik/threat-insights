"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = ({ isOpen, closeSidebar }) => {
  const pathname = usePathname();

  const menuItems = [
    { name: "USERS", href: "/admin/users" },
    { name: "ALERTS", href: "/admin/alerts" },
    { name: "CVE's", href: "/admin/cves" },
    { name: "Drop Downs", href: "/admin/drop-downs" },
    { name: "MITRE", href: "/admin/mitre" },
    { name: "SUPPORT TICKETS", href: "/admin/support-tickets" },
  ];

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 sm:hidden"
          onClick={closeSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full z-50 bg-gray-900 text-white w-64 p-4 space-y-8 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out sm:relative sm:translate-x-0`}
      >
        <div className="w-full flex justify-end">
          <button
            className="sm:hidden text-white text-lg mb-4"
            onClick={closeSidebar}
          >
            ✕
          </button>
        </div>

        <ul className="space-y-8">
          {menuItems.map((item, index) => {
            const isActive = pathname === item.href;

            return (
              <li
                key={index}
                className={`transition-all cursor-pointer ${
                  isActive
                    ? "text-[#2F90B0] underline underline-offset-4"
                    : "hover:text-[#2F90B0] hover:underline hover:underline-offset-4"
                }`}
              >
                <Link href={item.href}>{item.name}</Link>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
