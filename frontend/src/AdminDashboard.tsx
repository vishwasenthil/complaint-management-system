import React, { useState, useEffect } from 'react';

type Complaint = {
  id: number;
  name: string;
  email: string;
  complaint: string;
  status: 'Pending' | 'Resolved';
  created_at: string;
};

export default function AdminDashboard() {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [filterStatus, setFilterStatus] = useState<'All' | 'Pending' | 'Resolved'>('All'); // Add filter state

  useEffect(() => {
    fetchComplaints();
  }, []);

  async function fetchComplaints() {
    const response = await fetch('http://localhost:8000/complaints');
    if(response.status === 403) {
      alert('You are not authorized to view this page.');
    }
    if (!response.ok) {
      throw new Error('Error fetching complaints');
    }
    const data = await response.json();
    setComplaints(data);
  }

  async function toggleStatus(id: number, currentStatus: 'Pending' | 'Resolved') {
    const newStatus = currentStatus === 'Pending' ? 'Resolved' : 'Pending';

    try {
      const response = await fetch(`http://localhost:8000/complaints/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      console.log(response);
      if (!response.ok) {
        throw new Error('Error updating status');
      }
      setComplaints(prev =>
        prev.map(c => (c.id === id ? { ...c, status: newStatus } : c))
      );
    } catch (error) {
      console.error('Error updating status');
    }
  }

  async function deleteComplaint(id: number) {
    try {
      const response = await fetch(`http://localhost:8000/complaints/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Error deleting complaint');
      }
      setComplaints(prev => prev.filter(c => c.id !== id));
    } catch (error) {
      console.error('Error deleting complaint');
    }
  }

  let filteredComplaints: Complaint[] = [];

  if(filterStatus === 'All') {
    filteredComplaints = complaints;
  } else {
    filteredComplaints = complaints.filter(c => c.status === filterStatus);
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <h1 className="text-3xl font-semibold mb-6 text-gray-900">Admin Dashboard</h1>
      <div className="mb-4 space-x-2">
      <label className="font-medium text-gray-700">
  Filter by Status
  <select
    value={filterStatus}
    onChange={(e) => setFilterStatus(e.target.value as 'All' | 'Pending' | 'Resolved')}
    className="w-full border px-3 py-2 text-sm"
  >
    <option value="All">All</option>
    <option value="Pending">Pending</option>
    <option value="Resolved">Resolved</option>
  </select>
</label>
    </div>
      <div className="overflow-x-auto rounded-lg shadow border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              {['Name', 'Email', 'Complaint', 'Date', 'Status', 'Actions'].map(header => (
                <th
                  key={header}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredComplaints.length > 0 ? (
              filteredComplaints.map(c => (
                <tr key={c.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-normal text-sm text-gray-900">{c.name}</td>
                  <td className="px-6 py-4 whitespace-normal text-sm text-gray-700">{c.email}</td>
                  <td className="px-6 py-4 whitespace-normal text-sm text-gray-700 max-w-xs">{c.complaint}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(c.created_at).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        c.status === 'Resolved'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {c.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button
                      onClick={() => toggleStatus(c.id, c.status)}
                      className="inline-flex items-center px-3 py-1 rounded-md bg-yellow-400 text-black hover:bg-yellow-500 transition"
                    >
                      Toggle Status
                    </button>
                    <button
                      onClick={() => deleteComplaint(c.id)}
                      className="inline-flex items-center px-3 py-1 rounded-md bg-red-600 text-white hover:bg-red-700 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center py-6 text-gray-500">
                  No complaints to display.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}