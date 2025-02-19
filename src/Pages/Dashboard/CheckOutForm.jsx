import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import UseAxiosSecure from '../../Hooks/UseAxiosSecure';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Provider/AuthProvider';
import SectionTitle from '../../Shared/SectionTitle';

const CheckOutForm = () => {
  const [clientSecret, setClientSecret] = useState();
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    phone: '',
    photo: '',
    address: '',
    gender: '',
    degree: '',
    sscResult: '',
    hscResult: '',
    studyGap: '',
  });

  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = UseAxiosSecure();
  const { user } = useContext(AuthContext);
  const { _id: scholarshipId, stipend, university_name,
    university_logo,
    subject_name,} = useLoaderData();
  const stipendAmount = parseInt(stipend, 10);

  useEffect(() => {
    axiosSecure.post('/create-payment-intent', { price: stipendAmount })
      .then(res => {
        setClientSecret(res.data.clientSecret);
      });
  }, [axiosSecure, stipendAmount]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card
    });

    if (error) {
      toast.error(error.message);
      return;
    }

    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: card,
        billing_details: {
          email: user?.email || 'anonymous',
          name: user?.displayName || 'anonymous'
        }
      }
    });

    if (confirmError) {
      toast.error(confirmError.message);
    } else {
      toast.success('Payment Successful');
      setPaymentSuccess(true);
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleApply = async (e) => {
    e.preventDefault();
    const applicationData = {
      ...formData,
      userName: user?.displayName,
      userEmail: user?.email,
      scholarshipId,
      university_name,
      university_logo,
      stipend,
      subject_name,
      appliedDate: new Date().toISOString(),
      application_status: 'pending',
      application_feedback: 'pending '
    };

    try {
      const res = await axiosSecure.post('/applyScholarships', applicationData);
      console.log(res.data);
      if (res.data.insertedId) {
        toast.success('Application Submitted Successfully');
        navigate('/dashboard/myApplication')
      } else {
        toast.error('Failed to Submit Application');
        console.log(error.message);
      }
    } catch (error) {
      toast.error('Error submitting application');
      console.log(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-xl  ">
      <div className="bg-gray-200 p-6 rounded-xl shadow-lg w-full max-w-lg">
        {!paymentSuccess ? (
          <div>
            <SectionTitle heading='payment'></SectionTitle>

            <form onSubmit={handleSubmit} className="space-y-4">

              <CardElement className="p-3 border rounded-lg bg-gray-50 shadow-sm" />
              <button className="w-full bg-gray-700 text-white py-2 rounded-lg hover:bg-gray-900 transition" type="submit" disabled={!stripe || !clientSecret}>
                Pay
              </button>
            </form>
          </div>
        ) : (
          <div>
            <SectionTitle heading='Apply form'></SectionTitle>

            <form onSubmit={handleApply} className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800 text-center">Scholarship Application</h2>

              <input type="text" name="phone" placeholder="Phone Number" onChange={handleFormChange} required className="w-full p-3 border rounded-lg bg-gray-50 shadow-sm focus:ring-2 focus:ring-gray-500" />

              <input type="text" name="photo" placeholder="Photo URL" onChange={handleFormChange} required className="w-full p-3 border rounded-lg bg-gray-50 shadow-sm focus:ring-2 focus:ring-gray-500" />

              <input type="text" name="address" placeholder="Address (Village, District, Country)" onChange={handleFormChange} required className="w-full p-3 border rounded-lg bg-gray-50 shadow-sm focus:ring-2 focus:ring-gray-500" />

              <select name="gender" onChange={handleFormChange} required className="w-full p-3 border rounded-lg bg-gray-50 shadow-sm focus:ring-2 focus:ring-gray-500">
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>

              <select name="degree" onChange={handleFormChange} required className="w-full p-3 border rounded-lg bg-gray-50 shadow-sm focus:ring-2 focus:ring-gray-500">
                <option value="">Select Degree</option>
                <option value="Diploma">Diploma</option>
                <option value="Bachelor">Bachelor</option>
                <option value="Masters">Masters</option>
              </select>

              <input type="text" name="sscResult" placeholder="SSC Result" onChange={handleFormChange} required className="w-full p-3 border rounded-lg bg-gray-50 shadow-sm focus:ring-2 focus:ring-gray-500" />

              <input type="text" name="hscResult" placeholder="HSC Result" onChange={handleFormChange} required className="w-full p-3 border rounded-lg bg-gray-50 shadow-sm focus:ring-2 focus:ring-gray-500" />

              <select name="studyGap" onChange={handleFormChange} className="w-full p-3 border rounded-lg bg-gray-50 shadow-sm focus:ring-2 focus:ring-gray-500">
                <option value="">Study Gap (if any)</option>
                <option value="1 Year">1 Year</option>
                <option value="2 Years">2 Years</option>
                <option value="3+ Years">3+ Years</option>
              </select>

                 

              <button type="submit" className="w-full bg-gray-700 text-white py-2 rounded-lg hover:bg-gray-900 transition">
                Apply
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckOutForm;
