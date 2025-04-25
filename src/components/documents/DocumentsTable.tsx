
import React from 'react';
import { Badge } from '@/components/ui/badge';

interface Document {
  id: string;
  name: string;
  category: string;
  status: 'Active' | 'Expiring' | 'Pending';
  expiry: string;
}

const documents: Document[] = [
  {
    id: '1',
    name: 'Quality Management Policy',
    category: 'Policies',
    status: 'Active',
    expiry: 'Aug 15, 2025',
  },
  {
    id: '2',
    name: 'Public Liability Insurance',
    category: 'Certificates',
    status: 'Expiring',
    expiry: 'Apr 25, 2025',
  },
  {
    id: '3',
    name: 'Worker Screening Check - J. Smith',
    category: 'Screening',
    status: 'Pending',
    expiry: 'May 10, 2025',
  },
  {
    id: '4',
    name: 'Certification Audit Report',
    category: 'Audits',
    status: 'Active',
    expiry: 'Jan 30, 2026',
  },
  {
    id: '5',
    name: 'Risk Management Framework',
    category: 'Policies',
    status: 'Active',
    expiry: 'Sep 05, 2025',
  },
  {
    id: '6',
    name: 'Information Security Policy',
    category: 'Policies',
    status: 'Active',
    expiry: 'Oct 15, 2025',
  },
  {
    id: '7',
    name: 'Business Continuity Plan',
    category: 'Policies',
    status: 'Active',
    expiry: 'Nov 20, 2025',
  },
  {
    id: '8',
    name: 'Employee Background Check - A. Johnson',
    category: 'Screening',
    status: 'Active',
    expiry: 'Dec 05, 2025',
  },
  {
    id: '9',
    name: 'Professional Indemnity Insurance',
    category: 'Certificates',
    status: 'Active',
    expiry: 'Mar 15, 2026',
  },
  {
    id: '10',
    name: 'Data Protection Impact Assessment',
    category: 'Audits',
    status: 'Pending',
    expiry: 'Feb 28, 2026',
  },
];

const StatusBadge = ({ status }: { status: Document['status'] }) => {
  const statusColors = {
    Active: 'bg-green-100 text-green-800',
    Expiring: 'bg-red-100 text-red-800',
    Pending: 'bg-yellow-100 text-yellow-800',
  };

  return (
    <Badge className={`${statusColors[status]} hover:${statusColors[status]}`}>
      {status}
    </Badge>
  );
};

const DocumentsTable = () => {
  return (
    <div className="mt-6 bg-white rounded-lg overflow-hidden shadow">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Document Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Category
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Expiry
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {documents.map((doc) => (
            <tr 
              key={doc.id}
              className="hover:bg-gray-50 cursor-pointer"
            >
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">{doc.name}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500">{doc.category}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <StatusBadge status={doc.status} />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className={`text-sm ${
                  doc.status === 'Expiring' ? 'text-red-600' : 'text-gray-500'
                }`}>
                  {doc.expiry}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="px-6 py-3 flex justify-center">
        <nav className="flex items-center">
          <button className="px-3 py-1 text-sm">1</button>
          <button className="px-3 py-1 text-sm">2</button>
          <button className="px-3 py-1 text-sm">3</button>
          <span className="text-sm text-gray-500">...</span>
        </nav>
      </div>
    </div>
  );
};

export default DocumentsTable;
