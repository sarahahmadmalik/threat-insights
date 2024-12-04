"use client";
import AdminLayout from "@/components/dashboard/admin/AdminLayout";
function mitre() {
  return (
    <AdminLayout>
      <div className="shadow rounded-lg py-6">
        <div className="p-4 flex justify-between items-center">
          <div className="flex justify-end w-full space-x-2">
            {/* Add Dropdown Button */}
            {/* <button
              onClick={handleAddDropdown}
              className="bg-[#8087C11F] flex items-center  justify-center text-white px-3 py-1 w-[45px] h-[45px] border-2 border-white rounded-full"
            >
              <Image src="/icons/add.svg" alt="Add" width={20} height={20} />
            </button> */}
          </div>
        </div>
        <div
          className="p-6 rounded-[15px] w-full flex justify-center items-center min-h-[400px]"
          style={{ backgroundColor: "#2F90B026" }}
              >
                  <p>To be implemented</p>
        </div>
      </div>
    </AdminLayout>
  );
}

export default mitre;
