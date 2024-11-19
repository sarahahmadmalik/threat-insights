import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const dashboardCards = [
    { title: "Alerts", icon: "/icons/alerts.svg", href: "/customer/alerts" },
    {
      title: "Intelligence",
      icon: "/icons/int.svg",
      href: "/customer/intelligence",
    },
    { title: "Reports", icon: "/icons/reports.svg", href: "/customer/reports" },
    { title: "News", icon: "/icons/news.svg", href: "/customer/news" },
    {
      title: "Configure",
      icon: "/icons/configure.svg",
      href: "/customer/configure",
    },
    { title: "Help", icon: "/icons/help.svg", href: "/customer/help" },
  ];

  return (
    <div className="w-full flex justify-center">
      <div className="grid z-20 bg-white bg-opacity-10 backdrop-blur-sm py-10 px-6 rounded-md grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dashboardCards.map((card, index) => (
          <Link
            key={index}
            href={card.href}
            className="flex flex-col items-center justify-center w-[170px] bg-white p-6 rounded-lg shadow hover:bg-slate-200 transition cursor-pointer"
          >
            <Image
              src={card.icon}
              alt={`${card.title} Icon`}
              width={70}
              height={70}
              className="mb-4"
            />
            <h3 className="text-[20px] text-black uppercase font-[400]">{card.title}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
}
