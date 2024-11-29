import Sidebar from "./Sidebar";

const AdminLayout = ({ children }) => {
  return (
    <div className="w-full flex justify-center  items-stretch overflow-hidden">
      <div className="flex items-stretch bg-[#000000C2] sm:min-h-[600px] rounded-[15px] w-full h-full 2xl:max-w-[2000px]">
        <Sidebar />
        <div className="flex-1 flex flex-col justify-stretch p-8">{children}</div>
      </div>
    </div>
  );
};

export default AdminLayout;
