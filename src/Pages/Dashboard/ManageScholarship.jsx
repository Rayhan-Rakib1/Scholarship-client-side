import { useQuery } from '@tanstack/react-query';
import React from 'react';
import UseAxiosSecure from '../../Hooks/UseAxiosSecure';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const ManageScholarship = () => {
  const axiosSecure = UseAxiosSecure();

  const { data: scholarships = [], isLoading: loading, refetch } = useQuery({
    queryKey: ['scholarships'],
    queryFn: async () => {
      const result = await axiosSecure.get('/scholarships');
      return result.data;
    }
  });

  // Function to handle delete action
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
        axiosSecure.delete(`/scholarships/${id}`)
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
      <h1>Manage Scholarship: {scholarships.length}</h1>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table table-xs">
          <thead>
            <tr>
              <th>NO.</th>
              <th>Name</th>
              <th>Job</th>
              <th>Company</th>
              <th>Location</th>
              <th>Last Login</th>
              <th>Favorite Color</th>
            </tr>
          </thead>
          <tbody>
            {/* Loop through scholarships */}
            {scholarships.map((scholarship, index) => {
              return (
                <tr key={scholarship._id}>
                  <th>{index + 1}</th>
                  <td>{scholarship.subject_name}</td>
                  <td>{scholarship._id}</td>
                  <td>{scholarship.university_name}</td>
                  <td>{scholarship.subject_name}</td>
                  <td>{scholarship.application_fees}</td>
                  <td>
                    <button className='btn btn-neutral'>
                      <Link to={`/scholarship/${scholarship._id}`}>Details</Link>
                    </button>
                  </td>
                  <td>
                       <Link to={`/dashboard/manageScholarship/update/${scholarship._id}`} className='btn btn-ghost'><FaEdit></FaEdit></Link>
                   </td>
                  <td>
                    <button onClick={() => handleDelete(scholarship._id)} className="btn btn-ghost btn-lg text-red-400">
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

export default ManageScholarship;
