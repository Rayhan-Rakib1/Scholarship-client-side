import React, { useContext } from 'react';
import { AuthContext } from '../../Provider/AuthProvider'; // Assuming you have an AuthContext

const AdminProfile = () => {
  const { user } = useContext(AuthContext); // Fetch user from context
 

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex items-center space-x-4">
          {/* User Image */}
          <div>
            <img
              src={user.photoURL || 'default-image-url.jpg'} // Fallback to default image if no photoURL
              alt={user.displayName}
              className="w-24 h-24 rounded-full border-4 border-gray-300"
            />
          </div>
          
          {/* Admin Information */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">{user.displayName}</h2>
            <p className="text-gray-600">{user.email}</p>
            <p className="text-gray-600 mt-2">
              <strong>Role:</strong> Admin
            </p>
          </div>
        </div>

        {/* Admin Features */}
        <div className="mt-4">
          <h3 className="text-xl font-semibold text-gray-800">Admin Features</h3>
          <ul>
            <li className="text-gray-600">Manage Users</li>
            <li className="text-gray-600">Manage Scholarships</li>
            <li className="text-gray-600">View Reports</li>
            <li className="text-gray-600">System Settings</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
