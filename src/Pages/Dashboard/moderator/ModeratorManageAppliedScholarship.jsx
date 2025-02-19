import React, { useState } from "react";
 import { Link } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import UseAppliedApplication from "../../../Hooks/UseAppliedApplication";
import SectionTitle from "../../../Shared/SectionTitle";
 
const ModeratorManageAppliedScholarship = () => {
  const [allApplication, refetch] = UseAppliedApplication();
  const axiosSecure = UseAxiosSecure();
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const [selectedApplication, setSelectedApplication] = useState(null); // Application details

  


  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/applyScholarships/${id}`).then((res) => {
          console.log(res.data);
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  const handleDetails = (application) => {
    setSelectedApplication(application); // Set the selected application details
    setIsModalOpen(true); // Open modal
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close modal
    setSelectedApplication(null); // Clear selected application details
  };



   const handleFeedback = (application) => {
          axiosSecure.patch(`/applyScholarships/feedback/${application._id}`)
          .then(res => {
              console.log(res.data);
              if(res.data.modifiedCount > 0){
                  refetch()
                  Swal.fire({
                      icon: "success",
                      title: `${user.name} is ${role} now!`,
                      showConfirmButton: false,
                      timer: 1500
                    });
              }
          })
       }

  return (
    <div className="p-6">
      <SectionTitle heading={`All Applications: ${allApplication.length}`} />

      <div className="overflow-x-auto bg-gray-100 p-4 rounded-lg shadow-md">
        <table className="table table-xs w-full">
          <thead>
            <tr className="bg-gray-700 text-white">
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Degree</th>
              <th>University</th>
              <th>Details</th>
              <th>Feedback</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {allApplication.map((application, index) => (
              <tr key={application._id} className="hover:bg-gray-200">
                <th>{index + 1}</th>
                <td>{application.userName}</td>
                <td>{application.userEmail}</td>
                <td>{application.phone}</td>
                <td>{application.degree}</td>
                <td>{application.university_name}</td>
                <td>
                  <button
                    onClick={() => handleDetails(application)} // Open modal with details
                    className="btn btn-neutral"
                  >
                    Details
                  </button>
                </td>
                <td>
                  {application.status === 'success' ? 'Success' : <button onClick={() =>handleFeedback(application)}  className="btn btn-neutral">Feedback</button>}
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(application._id)}
                    className="btn btn-ghost btn-lg text-red-400"
                  >
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-96">
            <h3 className="text-xl font-semibold mb-4">Application Details</h3>
            <p><strong>University:</strong> {selectedApplication?.university_name}</p>
            <p><strong>Degree:</strong> {selectedApplication?.degree}</p>
            <p><strong>Scholarship Category:</strong> {selectedApplication?.category}</p>
            <div className="mt-4 flex justify-end">
              <button
                onClick={closeModal} // Close modal
                className="btn btn-neutral"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModeratorManageAppliedScholarship;
