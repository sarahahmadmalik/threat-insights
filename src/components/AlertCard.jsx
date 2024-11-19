const AlertCard = ({ severity, id, date, description, onClick }) => {
    const severityColors = {
      CRITICAL: 'border-[#D8CBFD]',
      HIGH: 'border-[#F4B1B1]',
      MEDIUM: 'border-[#F0D88F]',
      LOW: 'border-[#BBEEA9]',
    };
  
    return (
      <div
        className={`border-l-8 ${severityColors[severity]} px-4 py-6 mb-4 bg-white shadow rounded cursor-pointer`}
        onClick={onClick}
      >
        <h3 className="text-lg font-bold">{severity}</h3>
        <p className="text-sm">{description}</p>
        <div className="text-xs text-gray-500 mt-2">
          <span>ID: {id}</span> | <span>DATE: {date}</span>
        </div>
      </div>
    );
  };
  
  export default AlertCard;
  