import React, { useContext } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
import UseAxiosSecure from '../../Hooks/UseAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';

const MyReview = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = UseAxiosSecure();

    const { data: reviews = [], refetch } = useQuery({
        queryKey: ['reviews'],
        queryFn: async () => {
            const result = await axiosSecure.get(`/reviews/myReviews?email=${user?.email}`);
            return result.data;
        }
    });

    // Define handleDelete function (if needed)
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
                    })
            }
        });
    };

    return (
        <div>
            <h1>My Review: {reviews.length}</h1>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="table table-xs">
                    <thead>
                        <tr>
                            <th>NO.</th>
                            <th>Name</th>
                            <th>Comment</th>
                            <th>Company</th>
                            <th>Location</th>
                            <th>Last Login</th>
                         </tr>
                    </thead>
                    <tbody>
                        {/* Loop through reviews */}
                        {reviews.map((review, index) => {
                            return (
                                <tr key={review._id}>
                                    <th>{index + 1}</th>
                                    <td>{review.universityName}</td>
                                    <td>{review.scholarship_category}</td>
                                    <td>{review.comment}</td>
                                    <td>{review.rating}</td>
                                    <td>{review.date}</td>
                                    <td>
                                        <button onClick={() => handleEdit(review._id)} className="btn btn-ghost btn-lg text-red-400">
                                            <FaEdit></FaEdit>
                                        </button>
                                    </td>
                                    <td>
                                        <button onClick={() => handleDelete(review._id)} className="btn btn-ghost btn-lg text-red-400">
                                            <FaTrashAlt />
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyReview;
