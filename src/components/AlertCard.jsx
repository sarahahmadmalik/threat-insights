const AlertCard = ({ severity, id, date, description, onClick }) => {
    const severityColors = {
      CRITICAL: 'border-purple-500',
      HIGH: 'border-red-500',
      MEDIUM: 'border-yellow-500',
      LOW: 'border-green-500',
    };
  
    return (
      <div
        className={`border-l-4 ${severityColors[severity]} p-4 mb-4 bg-white shadow rounded cursor-pointer`}
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
  