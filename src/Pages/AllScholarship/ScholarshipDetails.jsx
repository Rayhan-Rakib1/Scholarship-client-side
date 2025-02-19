import React, { useContext } from 'react';
import { Link, useLoaderData, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Provider/AuthProvider';
import Swal from 'sweetalert2';
import UseAxiosSecure from '../../Hooks/UseAxiosSecure';
import UseApplyScholarship from '../../Hooks/UseApplyScholarship';
import { useQuery } from '@tanstack/react-query';

const ScholarshipDetails = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const axiosSecure = UseAxiosSecure();
    const [, refetch] = UseApplyScholarship();

    const scholarship = useLoaderData();
    const { _id, university_name, university_logo, scholarship_category, university_location, subject_name, application_deadline, scholarship_description, stipend, post_date, service_charge, application_fees } = scholarship;
 console.log(_id);

    //  const {data: review = [] } = useQuery({
    //     queryKey: ['review'],
    //     queryFn: async () => {
    //         const result = await axiosSecure.get(`/reviews/${_id}`)
    //         return result.data
    //     }
    // })

    const handleAddToApply = () => {
        if (user && user?.email) {

            const applyScholarship = {
                scholarshipId: _id,
                email: user.email,
                university_name, 
                university_logo,
                application_fees,
                university_location,
                subject_name, 
                scholarship_category,
                service_charge,
                application_status : 'pending',
                application_feedback: 'pending '


            }

            axiosSecure.post('/ ', applyScholarship)
            .then(res => {
                console.log(res.data);
                if(res.data.insertedId){
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Your work has been saved",
                        showConfirmButton: false,
                        timer: 1500
                      });
                    //   to update the cart item
                      refetch();
                }
            })
        }
        else {
            Swal.fire({
                title: "Please login first?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, Login!"
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login', { state: { from: location } })

                }
            });
        }
    }
    return (
       <>
        <div className="max-w-3xl pt-20 mx-auto p-8 bg-gray-50 rounded-lg shadow-xl">
            {/* <h1>review: {review.length}</h1> */}
            <div className="flex items-center mb-8 border-b pb-6 border-gray-300">
                <img src={university_logo} alt={`${university_name} Logo`} className="w-20 h-20 rounded-full mr-6" />
                <div>
                    <h1 className="text-3xl font-semibold text-gray-800">{university_name}</h1>
                    <p className="text-lg font-medium text-gray-600">{scholarship_category} Scholarship</p>
                </div>
            </div>

            <div className="mb-6">
                <h2 className="text-2xl font-semibold text-gray-800">Scholarship Overview</h2>
                <p className="mt-2 text-gray-600"><strong>Subject:</strong> {subject_name}</p>
                <p className="mt-2 text-gray-600"><strong>Location:</strong> {university_location?.city}, {university_location?.country}</p>
                <p className="mt-2 text-gray-600"><strong>Address:</strong> {university_location?.address}</p>
                <p className="mt-2 text-gray-600"><strong>Application Deadline:</strong> {application_deadline}</p>
                <p className="mt-2 text-gray-600"><strong>Post Date:</strong> {post_date}</p>
            </div>

            <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-800">About the Scholarship</h3>
                <p className="mt-2 text-gray-600">{scholarship_description}</p>
            </div>

            <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-800">Financial Details</h3>
                <p className="mt-2 text-gray-600"><strong>Stipend:</strong> {stipend}</p>
                <p className="mt-2 text-gray-600"><strong>Service Charge:</strong> {service_charge}</p>
                <p className="mt-2 text-gray-600"><strong>Application Fees:</strong> {application_fees}</p>
            </div>

            <div className="mt-6">
                <Link  to={`/dashboard/payment/${_id}`} className="btn w-full py-3 bg-gray-800 text-white font-semibold rounded-md hover:bg-gray-700 transition duration-200">
                    Apply Now
                </Link>
            </div> 
        </div>


        
       </>
    );
};

export default ScholarshipDetails;
