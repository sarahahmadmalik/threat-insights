const DeleteUserPopup = ({ isOpen, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-[400px] md:w-[400px]  shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-gray-800">Delete User</h2>
        </div>
        <p className="text-gray-700 mb-4">
          Are you sure you want to delete this user?
        </p>
        <div className="flex justify-around pt-5">
          <button
            onClick={onCancel}
            className="bg-[#2F90B04D] text-slate-600 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
          >
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteUserPopup;
