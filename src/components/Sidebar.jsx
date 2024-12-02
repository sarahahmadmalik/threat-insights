import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname(); // Directly returns the current route string

  const menuItems = [
    { name: "USERS", href: "/admin/users" },
    { name: "ALERTS", href: "/admin/alerts" },
    { name: "CVE's", href: "/admin/cves" },
    { name: "Drop Downs", href: "/admin/dropdowns" },
    { name: "MITRE", href: "/admin/mitre" },
    { name: "SUPPORT TICKETS", href: "/admin/support-tickets" },
  ];

  return (
    <div className="bg-gray-900 hidden sm:min-w-[240px] lg:flex text-white w-64 items-center justify-center flex-col p-4">
      <ul className="space-y-8">
        {menuItems.map((item, index) => {
          // Check if the current route matches the menu item's href
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
  );
};

export default Sidebar;
