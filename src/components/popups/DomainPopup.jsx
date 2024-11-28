const DomainPopup = ({ domains, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-96 max-w-full shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-gray-800">
            Monitored Domains
          </h2>
        </div>
        <div className="max-h-64 overflow-auto">
          {domains.length === 0 ? (
            <p className="text-gray-500">No domains listed</p>
          ) : (
            <ul className="space-y-3 list-disc">
              {domains.map((domain, idx) => (
                <li
                  key={idx}
                  className="text-gray-700 list-disc hover:text-gray-900 cursor-pointer transition-colors"
                >
                  {domain}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="mt-4 text-center">
          <button
            onClick={onClose}
            className="bg-[#2F90B0] text-white px-4 py-2 rounded-lg hover:bg-[#1a7292] transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default DomainPopup;
