import React, { useState } from "react";
import UseAppliedApplication from "../../Hooks/UseAppliedApplication";
import SectionTitle from "../../Shared/SectionTitle";
import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";

const ManageAppliedApplication = () => {
  const [allApplication, refetch] = UseAppliedApplication();
  const axiosSecure = UseAxiosSecure();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);

  // Sorting & Filtering States
  const [searchQuery, setSearchQuery] = useState("");
  const [sortKey, setSortKey] = useState("userName");
  const [filterStatus, setFilterStatus] = useState("all");

  // Handle Sorting
  const sortedApplications = [...allApplication].sort((a, b) => {
    if (a[sortKey] < b[sortKey]) return -1;
    if (a[sortKey] > b[sortKey]) return 1;
    return 0;
  });

  // Handle Filtering
  const filteredApplications = sortedApplications.filter((application) => {
    const matchesSearch =
      application.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      application.userEmail.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      filterStatus === "all" || application.application_status === filterStatus;

    return matchesSearch && matchesStatus;
  });

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
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Application has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  const handleFeedback = (application) => {
    axiosSecure
      .patch(`/applyScholarships/feedback/${application._id}`)
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          refetch();
          Swal.fire({
            icon: "success",
            title: "Feedback submitted!",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };

  return (
    <div className="p-6">
      <SectionTitle heading={`All Applications: ${filteredApplications.length}`} />

      {/* Search & Filter Section */}
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search by Name or Email..."
          className="input input-bordered w-1/3"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <select
          className="select select-bordered w-1/4"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>

        <select
          className="select select-bordered w-1/4"
          value={sortKey}
          onChange={(e) => setSortKey(e.target.value)}
        >
          <option value="userName">Sort by Name</option>
          <option value="userEmail">Sort by Email</option>
          <option value="degree">Sort by Degree</option>
          <option value="application_status">Sort by Status</option>
        </select>
      </div>

      {/* Applications Table */}
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
              <th>Status</th>
              <th>Feedbacks</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {filteredApplications.map((application, index) => (
              <tr key={application._id} className="hover:bg-gray-200">
                <th>{index + 1}</th>
                <td>{application.userName}</td>
                <td>{application.userEmail}</td>
                <td>{application.phone}</td>
                <td>{application.degree}</td>
                <td>{application.university_name}</td>
                <td className={`font-semibold ${application.application_status === "approved" ? "text-green-500" : application.application_status === "rejected" ? "text-red-500" : "text-yellow-500"}`}>
                  {application.application_status}
                </td>
                <td>
                  {application.application_status === "approved" ? (
                    "Approved"
                  ) : (
                    <button
                      onClick={() => handleFeedback(application)}
                      className="btn btn-neutral"
                    >
                      Feedback
                    </button>
                  )}
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
    </div>
  );
};

export default ManageAppliedApplication;
