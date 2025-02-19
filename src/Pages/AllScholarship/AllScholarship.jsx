import React, { useContext, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import SectionTitle from '../../Shared/SectionTitle';
import Cover from './Cover';
import UseScholarships from '../../Hooks/UseScholarships';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import notFound from '../../assets/Not found/notFound.jpg'
import { AuthContext } from '../../Provider/AuthProvider';
import Swal from 'sweetalert2';

const AllScholarship = () => {
    const [scholarships] = UseScholarships();
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1); // Keep track of current page
    const [scholarshipsPerPage] = useState(6); // Number of scholarships to show per page
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useContext(AuthContext);

    const handleDetails = () => {
        Swal.fire({
            title: "Are you login?",
            text: "You won't be able to revert this!",
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

    // Filter scholarships based on the search query
    const filteredScholarships = scholarships.filter(scholarship => {
        const query = searchQuery.toLowerCase();
        return (
            scholarship.university_name.toLowerCase().includes(query) ||
            scholarship.scholarship_category.toLowerCase().includes(query) ||
            scholarship.subject_name.toLowerCase().includes(query)
        );
    });

    // Get current scholarships for the current page
    const indexOfLastScholarship = currentPage * scholarshipsPerPage;
    const indexOfFirstScholarship = indexOfLastScholarship - scholarshipsPerPage;
    const currentScholarships = filteredScholarships.slice(indexOfFirstScholarship, indexOfLastScholarship);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div>
            <Helmet>
                <title>Scholarship.com | All Scholarships</title>
            </Helmet>
            <Cover />
            <SectionTitle heading={'All Scholarships'} subHeading={'Choose your favorite scholarship'} />

            {/* Search Bar */}
            <div className="container mx-auto p-6">
                <div className="flex justify-center mb-6">
                    <input
                        type="text"
                        placeholder="Search by Scholarship, University, or Degree"
                        className="p-3 w-full md:w-1/3 border rounded-l-lg border-gray-300"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button className="p-3 bg-blue-500 text-white rounded-r-lg">Search</button>
                </div>
            </div>

            <div className="container mx-auto">
                {filteredScholarships.length === 0 ? (
                    <div className="text-center ">
                        <h2 className="text-3xl text-gray-700">No scholarships found</h2>
                        <p className="text-gray-500">We couldn't find any scholarships matching your search criteria. Try different keywords or browse through all available scholarships.</p>
                        <img
                            src={notFound}
                            alt="No results"
                            className="mx-auto "
                        />
                    </div>
                ) : (
                    <div>
                        {/* Scholarships Display */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {currentScholarships.map((scholarship, index) => (
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
                                    <div className="mt-auto  text-center ">
                                        {
                                            user?.email ? <Link
                                                to={`/scholarship/${scholarship._id}`}
                                                className="inline-block px-6 py-3 text-white bg-blue-500 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 mt-6"
                                            >
                                                View Details
                                            </Link> : <Link onClick={handleDetails}

                                                className="inline-block px-6 py-3 text-white bg-blue-500 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 mt-6"
                                            >
                                                login first
                                            </Link>
                                        }
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Pagination Controls */}
                        <div className="flex justify-center mt-8">
                            <nav>
                                <ul className="flex space-x-4">
                                    {[...Array(Math.ceil(filteredScholarships.length / scholarshipsPerPage))].map((_, index) => (
                                        <li key={index}>
                                            <button
                                                onClick={() => paginate(index + 1)}
                                                className={`px-4 py-2 border rounded-full ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                                            >
                                                {index + 1}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AllScholarship;
