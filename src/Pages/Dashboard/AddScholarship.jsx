import React, { useState } from 'react';
import axios from 'axios'; // Ensure axios is installed for API requests
import UseAxiosSecure from '../../Hooks/UseAxiosSecure';
import { toast } from 'react-toastify';

const AddScholarship = () => {

    const axiosSecure = UseAxiosSecure();
  // State to hold form data
  const [formData, setFormData] = useState({
    university_name: '',
    university_logo: '',
    scholarship_category: '',
    university_location: {
      country: '',
      city: '',
      address: '',
    },
    application_deadline: '',
    subject_name: '',
    scholarship_description: '',
    stipend: '',
    post_date: '',
    service_charge: '',
    application_fees: '',
  });

 

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('university_location')) {
      const locationKey = name.split('.')[1];
      setFormData((prev) => ({
        ...prev,
        university_location: {
          ...prev.university_location,
          [locationKey]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make the API request to add the scholarship
      const response = await axiosSecure.post('/scholarships', formData);
      

      if (response.status === 200) {
        toast.success('Scholarship added successfully!');
        setFormData({
          university_name: '',
          university_logo: '',
          scholarship_category: '',
          university_location: { country: '', city: '', address: '' },
          application_deadline: '',
          subject_name: '',
          scholarship_description: '',
          stipend: '',
          post_date: '',
          service_charge: '',
          application_fees: '',
        }); // Reset form after successful submission
      }
    } catch (error) {
      toast.error('Error adding scholarship. Please try again.');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-center text-2xl font-bold uppercase">Add Scholarship</h1>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* University Name */}
        <div>
          <label htmlFor="university_name" className="block">University Name</label>
          <input
            type="text"
            id="university_name"
            name="university_name"
            value={formData.university_name}
            onChange={handleChange}
            className="w-full px-4 py-2 border"
            required
          />
        </div>

        {/* University Logo */}
        <div>
          <label htmlFor="university_logo" className="block">University Logo (URL)</label>
          <input
            type="text"
            id="university_logo"
            name="university_logo"
            value={formData.university_logo}
            onChange={handleChange}
            className="w-full px-4 py-2 border"
            required
          />
        </div>

        {/* Scholarship Category */}
        <div>
          <label htmlFor="scholarship_category" className="block">Scholarship Category</label>
          <input
            type="text"
            id="scholarship_category"
            name="scholarship_category"
            value={formData.scholarship_category}
            onChange={handleChange}
            className="w-full px-4 py-2 border"
            required
          />
        </div>

        {/* University Location */}
        <div>
          <label className="block">University Location</label>
          <div className="space-y-2">
            <input
              type="text"
              name="university_location.country"
              placeholder="Country"
              value={formData.university_location.country}
              onChange={handleChange}
              className="w-full px-4 py-2 border"
              required
            />
            <input
              type="text"
              name="university_location.city"
              placeholder="City"
              value={formData.university_location.city}
              onChange={handleChange}
              className="w-full px-4 py-2 border"
              required
            />
            <input
              type="text"
              name="university_location.address"
              placeholder="Address"
              value={formData.university_location.address}
              onChange={handleChange}
              className="w-full px-4 py-2 border"
              required
            />
          </div>
        </div>

        {/* Additional Fields */}
        <div>
          <label htmlFor="application_deadline" className="block">Application Deadline</label>
          <input
            type="date"
            id="application_deadline"
            name="application_deadline"
            value={formData.application_deadline}
            onChange={handleChange}
            className="w-full px-4 py-2 border"
            required
          />
        </div>

        <div>
          <label htmlFor="subject_name" className="block">Subject Name</label>
          <input
            type="text"
            id="subject_name"
            name="subject_name"
            value={formData.subject_name}
            onChange={handleChange}
            className="w-full px-4 py-2 border"
            required
          />
        </div>

        <div>
          <label htmlFor="scholarship_description" className="block">Scholarship Description</label>
          <textarea
            id="scholarship_description"
            name="scholarship_description"
            value={formData.scholarship_description}
            onChange={handleChange}
            className="w-full px-4 py-2 border"
            required
          />
        </div>

        <div>
          <label htmlFor="stipend" className="block">Stipend</label>
          <input
            type="text"
            id="stipend"
            name="stipend"
            value={formData.stipend}
            onChange={handleChange}
            className="w-full px-4 py-2 border"
            required
          />
        </div>

        <div>
          <label htmlFor="service_charge" className="block">Service Charge</label>
          <input
            type="text"
            id="service_charge"
            name="service_charge"
            value={formData.service_charge}
            onChange={handleChange}
            className="w-full px-4 py-2 border"
            required
          />
        </div>

        <div>
          <label htmlFor="application_fees" className="block">Application Fees</label>
          <input
            type="text"
            id="application_fees"
            name="application_fees"
            value={formData.application_fees}
            onChange={handleChange}
            className="w-full px-4 py-2 border"
            required
          />
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button type="submit" className="btn btn-primary mt-4">
            Add Scholarship
          </button>
        </div>
      </form>

      
    </div>
  );
};

export default AddScholarship;
