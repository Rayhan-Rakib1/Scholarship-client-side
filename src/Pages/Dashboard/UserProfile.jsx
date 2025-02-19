import React, { useContext } from 'react';
import { AuthContext } from '../../Provider/AuthProvider'; // Assuming you have an AuthContext

const UserProfile = () => {
  const { user } = useContext(AuthContext); // Fetch user from context

  if (!user) {
    return <div>Please log in to view your profile.</div>;
  }

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
          
          {/* User Information */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">{user.displayName}</h2>
            <p className="text-gray-600">{user.email}</p>

            {/* Show role only if user is an admin */}
            {user.role && user.role !== 'regular' && (
              <p className="text-gray-600 mt-2">
                <strong>Role:</strong> {user.role}
              </p>
            )}
          </div>
        </div>

        {/* Optionally, you can add more information here */}
        <div className="mt-4">
          <h3 className="text-xl font-semibold text-gray-800">Additional Info</h3>
          {/* Add more user-specific information here */}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
