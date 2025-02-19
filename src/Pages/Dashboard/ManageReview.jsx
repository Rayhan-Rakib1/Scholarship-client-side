import React, { useState } from 'react';
import UseAxiosSecure from '../../Hooks/UseAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';
import Modal from '../../components/Modal';
 
const ManageReview = () => {
  const axiosSecure = UseAxiosSecure();

  const { data: reviews = [], refetch } = useQuery({
    queryKey: ['reviews'],
    queryFn: async () => {
      const result = await axiosSecure.get('/reviews')
      return result.data;
    }
  });

  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state
  const [modalDetails, setModalDetails] = useState(null); // Data to pass to the modal

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
        axiosSecure.delete(`/reviews/${id}`)
          .then(res => {
            console.log(res.data);
            if (res.data.deletedCount > 0) {
              refetch();
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
              });
            }
          });
      }
    });
  };

  const handleDetailsClick = (review) => {
    setModalDetails({
      university_name: review.universityName,
      degree: review.degree,  // Assuming this is the degree field in your review data
      scholarship_category: review.scholarship_category,
    });
    setIsModalOpen(true);
  };

  return (
    <div>
      <h1>Manage Review: {reviews.length}</h1>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>NO.</th>
              <th>Name</th>
              <th>Institute</th>
              <th>Date</th>
              <th>Rating</th>
              <th>Edit</th>
              <th>Details</th> {/* Add Details column */}
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((review, index) => (
              <tr key={review._id}>
                <th>{index + 1}</th>
                <td>
                  <div className="flex items-center gap-3">
                    <div>{review.userName}</div>
                    <div className="text-sm opacity-50">{review.userEmail}</div>
                  </div>
                </td>
                <td>
                  {review.universityName}
                  <br />
                  <span className="badge badge-ghost badge-sm">{review.scholarship_category}</span>
                </td>
                <td>{review.date}</td>
                <td>{review.rating}</td>
                <td>
                  <button className='btn btn-neutral'>
                    <Link to={`/scholarship/${review.scholarshipId}`}>
                      <FaEdit />
                    </Link>
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => handleDetailsClick(review)}
                    className="btn btn-info btn-sm"
                  >
                    Details
                  </button>
                </td>
                <td>
                  <button onClick={() => handleDelete(review._id)} className='btn btn-ghost btn-lg text-red-400'>
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      <Modal
        show={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        details={modalDetails}
      />
    </div>
  );
};

export default ManageReview;
