import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateScholarship = () => {
    const axiosSecure = UseAxiosSecure();
    const scholarship = useLoaderData();
    console.log(scholarship);

    

    // State to store form values
    const [formData, setFormData] = useState({
        university_name: scholarship.university_name || "",
        scholarship_category: scholarship.scholarship_category || "",
        subject_name: scholarship.subject_name || "",
        stipend: scholarship.stipend || "",
        application_deadline: scholarship.application_deadline || "",
        application_fees: scholarship.application_fees || "",
        service_charge: scholarship.service_charge || "",
        scholarship_description: scholarship.scholarship_description || "",
    });

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axiosSecure.patch(`/scholarships/${scholarship._id}`, formData);

            if (response.status === 200) {
                toast.success("Scholarship updated successfully!", {
                    position: "top-right",
                    autoClose: 3000,
                });
            } else {
                toast.error("Failed to update scholarship.", {
                    position: "top-right",
                    autoClose: 3000,
                });
            }
        } catch (error) {
            console.error("Error updating scholarship:", error);
            toast.error("An error occurred while updating.", {
                position: "top-right",
                autoClose: 3000,
            });
        }
    };

    return (
        <div className="p-6 max-w-2xl mx-auto bg-white rounded-xl shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Update Scholarship</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-700">University Name</label>
                    <input
                        type="text"
                        name="university_name"
                        value={formData.university_name}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    />
                </div>

                <div>
                    <label className="block text-gray-700">Scholarship Category</label>
                    <input
                        type="text"
                        name="scholarship_category"
                        value={formData.scholarship_category}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    />
                </div>

                <div>
                    <label className="block text-gray-700">Subject Name</label>
                    <input
                        type="text"
                        name="subject_name"
                        value={formData.subject_name}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    />
                </div>

                <div>
                    <label className="block text-gray-700">Stipend</label>
                    <input
                        type="text"
                        name="stipend"
                        value={formData.stipend}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    />
                </div>

                <div>
                    <label className="block text-gray-700">Application Deadline</label>
                    <input
                        type="date"
                        name="application_deadline"
                        value={formData.application_deadline}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    />
                </div>

                <div>
                    <label className="block text-gray-700">Application Fees</label>
                    <input
                        type="text"
                        name="application_fees"
                        value={formData.application_fees}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    />
                </div>

                <div>
                    <label className="block text-gray-700">Service Charge</label>
                    <input
                        type="text"
                        name="service_charge"
                        value={formData.service_charge}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    />
                </div>

                <div>
                    <label className="block text-gray-700">Scholarship Description</label>
                    <textarea
                        name="scholarship_description"
                        value={formData.scholarship_description}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    />
                </div>

                <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
                    Update Scholarship
                </button>
            </form>
        </div>
    );
};

export default UpdateScholarship;
