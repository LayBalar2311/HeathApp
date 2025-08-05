import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import { setUsers, deleteUser } from './features/authSlice';

const API_URL = 'http://localhost:5000/api';

export default function AdminPanel() {
  const dispatch = useDispatch();
  const { user, isAuthenticated, token, users } = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Redirect if not admin
  if (!isAuthenticated || user?.role !== 'admin') {
    return <Navigate to="/login" />;
  }

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(`${API_URL}/admin/users`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log('Fetched users:', res.data);
        dispatch(setUsers(res.data));
        setError(null);
      } catch (err) {
        const errorMessage = err.response?.data?.message || 'Failed to fetch users';
        console.error('Error fetching users:', err.response || err.message);
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    if (token) {
      fetchUsers();
    } else {
      setError('Please log in as an admin');
      setIsLoading(false);
    }
  }, [dispatch, token]);

  const handleDeleteUser = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;

    try {
      await axios.delete(`${API_URL}/admin/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch(deleteUser(id));
    } catch (err) {
      alert('Delete failed: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="w-full">
      <h2 className="text-2xl font-semibold mb-6">All Users</h2>

      {isLoading ? (
        <p className="text-center p-6">Loading users...</p>
      ) : error ? (
        <p className="text-center p-6 text-red-500">{error}</p>
      ) : (
        <div className="overflow-x-auto w-full">
          <table className="min-w-full bg-white rounded-lg shadow-md">
            <thead className="bg-blue-100 text-gray-700">
              <tr>
                <th className="p-4 text-left">Name</th>
                <th className="p-4 text-left">Email</th>
                <th className="p-4 text-left">Role</th>
                <th className="p-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((u) => (
                  <tr key={u._id} className="border-b hover:bg-gray-50">
                    <td className="p-4">{u.name}</td>
                    <td className="p-4">{u.email}</td>
                    <td className="p-4">{u.role}</td>
                    <td className="p-4 text-center">
                      <button
                        onClick={() => handleDeleteUser(u._id)}
                        className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="text-center p-6 text-gray-500">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}