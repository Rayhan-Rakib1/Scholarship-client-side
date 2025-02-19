import React, { useContext, useState } from 'react';
import UseApplyScholarship from '../../Hooks/UseApplyScholarship';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import UseAxiosSecure from '../../Hooks/UseAxiosSecure';
import Swal from 'sweetalert2';
import { AuthContext } from '../../Provider/AuthProvider';
import { Link } from 'react-router-dom';

const MyApplication = () => {
    const[applyScholarship, refetch, ] = UseApplyScholarship();
    const axiosSecure = UseAxiosSecure();
    const {user} = useContext(AuthContext);
 

    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

    const [reviewData, setReviewData] = useState({
        rating: '',
        comment: '',
        date: '',
        scholarshipName: '',
        universityName: '',
        universityId: '',
        userName: '',
        userImage: '', // Optional
        userEmail: ''
    });

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {
            if (result.isConfirmed) {
              
                axiosSecure.delete(`/applyScholarships/${id}`)
                .then(res => {
                    console.log(res.data);
                    if(res.data.deletedCount > 0){
                        refetch();
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success"
                          });
                    }
                })
            }
          });
    }

    const handleReview = (scholarship) => {
        setReviewData({
            ...reviewData,
            scholarshipId: scholarship._id,
            universityName: scholarship.university_name,
            scholarship_category: scholarship.scholarship_category,
            userName: user?.displayName,
            userImage: user?.photoURL, // Optional
            userEmail: user?.email, // Get from logged-in user's context
            date: new Date().toISOString() // Current date
        });
        setIsReviewModalOpen(true);
    };

    const handleReviewSubmit = async () => {
        const response = await axiosSecure.post('/reviews', reviewData);
        console.log(response.data);
        if (response.data.insertedId) {
            Swal.fire({
                title: 'Review Submitted!',
                text: 'Your review has been successfully submitted.',
                icon: 'success'
            });
            refetch(); // Refetch the data after review submission
            setIsReviewModalOpen(false); // Close the modal
        } else {
            Swal.fire({
                title: 'Error!',
                text: 'There was an error submitting your review.',
                icon: 'error'
            });
        }
    };

    return (
        <div>
            <h1>my application : {applyScholarship.length}</h1>

            {/* table */}

            <div className="overflow-x-auto">
        <table className="table table-xs">
          <thead>
            <tr>
              <th>NO.</th>
              <th>Name</th>
              <th>Location</th>
              <th>Feedback</th>
              <th>Subject</th>
              <th>Fee</th>
              <th>Feedback</th>
              <th>Details</th>
              <th>Review</th>
              <th>delete</th>
            </tr>
          </thead>
          <tbody>
          {
        applyScholarship.map((scholarship, index) => 
            <tr key={scholarship._id}>
        <th>{index + 1}</th>
        <td>{scholarship.userName}</td>
        <td>{scholarship.address}</td>
        <td>{scholarship.degree}</td>     
        <td>{scholarship.stipend}</td>
        <td>{scholarship.application_fees}</td>
        <td>{scholarship.status}</td>
        <td>
            <button className='btn btn-neutral'>
                <Link to={`/scholarship/${scholarship.scholarshipId}`}>Details</Link>
            </button>
        </td>
        <td>
            
        <button onClick={ () => handleReview(scholarship) } className='btn btn-neutral'>Review</button>
        </td>
        <td>
            <button onClick={() => handleDelete(scholarship._id)} className='btn btn-ghost btn-lg text-red-400'>
                <FaTrashAlt></FaTrashAlt>
            </button>
            
        </td>

        
      </tr>
            )}
             
              
          </tbody>
          {/* <tfoot>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Job</th>
              <th>company</th>
              <th>location</th>
              <th>Last Login</th>
              <th>Favorite Color</th>
            </tr>
          </tfoot> */}
        </table>
      </div>

        {/* Modal for Adding Review */}
        {isReviewModalOpen && (
                <div className="modal modal-open">
                    <div className="modal-box">
                        <h2 className="text-xl font-bold">Add Your Review</h2>
                        <form onSubmit={(e) => { e.preventDefault(); handleReviewSubmit(); }}>
                            <div className="mb-4">
                                <label htmlFor="rating" className="block text-sm font-medium">Rating (1-5)</label>
                                <input
                                    id="rating"
                                    type="number"
                                    value={reviewData.rating}
                                    onChange={(e) => setReviewData({ ...reviewData, rating: e.target.value })}
                                    className="input input-bordered w-full"
                                    min="1"
                                    max="5"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="comment" className="block text-sm font-medium">Review Comment</label>
                                <textarea
                                    id="comment"
                                    value={reviewData.comment}
                                    onChange={(e) => setReviewData({ ...reviewData, comment: e.target.value })}
                                    className="textarea textarea-bordered w-full"
                                    rows="4"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <button type="submit" className="btn btn-primary w-full">Submit Review</button>
                            </div>
                        </form>
                        <div className="modal-action">
                            <button onClick={() => setIsReviewModalOpen(false)} className="btn">Cancel</button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default MyApplication;