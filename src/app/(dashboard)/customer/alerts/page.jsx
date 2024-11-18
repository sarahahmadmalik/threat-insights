'use client';

import { useState } from 'react';
import AlertCard from '@/components/AlertCard';
import Dropdown from '@/components/ui/Dropdown';

const AlertsPage = () => {
  const [selectedAlert, setSelectedAlert] = useState(null);
  const alerts = [
    { severity: 'CRITICAL', id: '1', date: 'TODAY', description: 'New Open ports detected on example.com' },
    { severity: 'HIGH', id: '2', date: 'YESTERDAY', description: 'New Open ports detected on example.com' },
    { severity: 'MEDIUM', id: '3', date: '2 DAYS AGO', description: 'New Open ports detected on example.com' },
    { severity: 'LOW', id: '4', date: '3 DAYS AGO', description: 'New Open ports detected on example.com' },
  ];

  return (
    <div className="p-6">
      {selectedAlert ? (
        <div className="p-4 border rounded bg-white shadow">
          <h2 className="text-xl font-bold">{selectedAlert.severity}</h2>
          <p className="text-sm">{selectedAlert.description}</p>
          <p className="text-sm mt-2">TCP PORTS: 3389, 1143</p>
          <button
            onClick={() => setSelectedAlert(null)}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
          >
            Back to Alerts
          </button>
        </div>
      ) : (
        <>
          <div className="flex gap-4 mb-6">
            <Dropdown
              options={[
                { label: 'Exposed Ports', value: 'exposed-ports' },
                { label: 'Other Alerts', value: 'other-alerts' },
              ]}
              placeholder="Alert Type"
            />
            <Dropdown
              options={[
                { label: 'Critical', value: 'critical' },
                { label: 'High', value: 'high' },
                { label: 'Medium', value: 'medium' },
                { label: 'Low', value: 'low' },
              ]}
              placeholder="Severity"
            />
            <Dropdown
              options={[
                { label: 'Open', value: 'open' },
                { label: 'Resolved', value: 'resolved' },
              ]}
              placeholder="Status"
            />
            <Dropdown
              options={alerts.map((alert) => ({ label: alert.id, value: alert.id }))}
              placeholder="ID"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {alerts.map((alert) => (
              <AlertCard
                key={alert.id}
                {...alert}
                onClick={() => setSelectedAlert(alert)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default AlertsPage;
