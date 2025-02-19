import React, { useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import SectionTitle from '../../Shared/SectionTitle';
 import UseScholarships from '../../Hooks/UseScholarships';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import notFound from '../../assets/Not found/notFound.jpg'
import { AuthContext } from '../../Provider/AuthProvider';
import Swal from 'sweetalert2';

const SixScholarship = () => {
    const [scholarships] = UseScholarships();
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useContext(AuthContext);

    const handleDetails = () => {
        Swal.fire({
            title: "Are you logged in?",
            text: "You need to log in to view details!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Login!"
        }).then((result) => {
            if (result.isConfirmed) {
                navigate('/login', { state: { from: location } });
            }
        });
    };

    // Show only six scholarships
    const topScholarships = scholarships.slice(0, 6);

    return (
        <div>
            <Helmet>
                <title>Scholarship.com | Top Scholarships</title>
            </Helmet>
             <SectionTitle heading={'Top Scholarships'} subHeading={'Explore the best scholarships available'} />

            <div className="container mx-auto">
                {topScholarships.length === 0 ? (
                    <div className="text-center">
                        <h2 className="text-3xl text-gray-700">No scholarships available</h2>
                        <p className="text-gray-500">Please check back later.</p>
                        <img src={notFound} alt="No results" className="mx-auto" />
                    </div>
                ) : (
                    <div>
                        {/* Scholarships Display */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {topScholarships.map((scholarship, index) => (
                                <div
                                    key={index}
                                    className="card bg-gray-300 p-6 rounded-lg shadow-md transition duration-300 hover:shadow-xl"
                                >
                                    <div className="flex justify-center mb-4">
                                        <img
                                            src={scholarship.university_logo}
                                            alt={scholarship.university_name}
                                            className="w-24 h-24 rounded-full border-4 border-gray-300"
                                        />
                                    </div>
                                    <h2 className="text-2xl font-semibold text-center text-gray-800 mb-2">
                                        {scholarship.university_name}
                                    </h2>
                                    <h3 className="text-lg text-gray-600 text-center mb-4">
                                        {scholarship.scholarship_category} Scholarship
                                    </h3>

                                    <div className="text-gray-700 mb-4">
                                        <p>
                                            <strong>Subject:</strong> {scholarship.subject_name}
                                        </p>
                                        <p>
                                            <strong>Location:</strong>{' '}
                                            {scholarship.university_location
                                                ? `${scholarship.university_location.city}, ${scholarship.university_location.country}`
                                                : 'Location Not Available'}
                                        </p>
                                        <p>
                                            <strong>Deadline:</strong> {scholarship.application_deadline}
                                        </p>
                                    </div>

                                    {/* Link to Details Page */}
                                    <div className="mt-auto text-center">
                                        {user?.email ? (
                                            <Link
                                                to={`/scholarship/${scholarship._id}`}
                                                className="inline-block px-6 py-3 text-white bg-blue-500 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 mt-6"
                                            >
                                                View Details
                                            </Link>
                                        ) : (
                                            <button
                                                onClick={handleDetails}
                                                className="inline-block px-6 py-3 text-white bg-blue-500 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 mt-6"
                                            >
                                                Login First
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Show All Scholarships Button */}
                        <div className="flex justify-center mt-8">
                            <Link
                                to="allScholarship"
                                className="px-6 py-3 text-white bg-green-500 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
                            >
                                View All Scholarships
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SixScholarship;
