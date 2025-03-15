import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch all users from the Laravel API endpoint
    axios.get('/api/list')
      .then(response => {
        // Assuming the API returns an array of users directly
        setUsers(response.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError('Error fetching users');
        setLoading(false);
      });
  }, []);

  // Function to delete a user
  const deleteUser = (id) => {
    axios.delete(`/api/users/${id}`)
      .then(response => {
        setUsers(users.filter(user => user.id !== id));
        setSuccess('User deleted successfully!');
        // Clear the success message after 3 seconds
        setTimeout(() => setSuccess(null), 3000);
      })
      .catch(err => {
        console.error(err);
        setError('Error deleting user');
        // Clear the error message after 3 seconds
        setTimeout(() => setError(null), 3000);
      });
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Users List</h1>
      {/* Alert messages for errors and success */}
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      <table border="1" cellPadding="5" cellSpacing="0">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th> {/* New column for actions */}
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <button onClick={() => navigate('/add-users', { state: { user } })}>Edit</button>
                <button onClick={() => deleteUser(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersList;