import React, { useContext, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { AuthContext } from '../../../Provider/AuthProvider';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import SocialLogin from './SocialLogin';
import UseAxiosPublic from '../../../Hooks/UseAxiosPublic';

const SignUp = () => {
    const { setUser, createUser, updateUserProfile, user } = useContext(AuthContext);
    const navigate = useNavigate();
    const axiosPublic = UseAxiosPublic();
     const formRef = useRef(null); 

    const handleSubmit = e => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const photo = form.photo.value;
        const email = form.email.value;
        const password = form.password.value;
        const validatePassword = (password) => {
            const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d@$!%*?&]{6,}$/;
            return passwordRegex.test(password);
        };

        if (!validatePassword(password)) {
            toast.error('Password must have an uppercase, a lowercase, a spacial characters and at least 6 characters.');
            return;
        }

        console.log({ name, photo, email, password });

        createUser(email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                setUser(user);
                updateUserProfile({ displayName: name, photoURL: photo })
                    .then(res => {
                        // create user entry in database
                        const userInfo = {
                            name: name,
                            email: email,
                            photo: photo
                        }
                        axiosPublic.post('/users', userInfo)
                            .then(res => {
                                if (res.data.insertedId) {
                                    console.log('user added successfully!');

                                    if (formRef.current) formRef.current.reset();
                                    Swal.fire({
                                        position: "top-center",
                                        icon: "success",
                                        title: "User Sign up successfully",
                                        showConfirmButton: false,
                                        timer: 1500
                                    });
                                    navigate('/')
                                }
                            })

                       
                    })
            })
            .catch(error => {
                console.log('error', error.message);
            })
    }

    return (
        <>
            <Helmet>
                <title>Scholarship.com | Sign up</title>

            </Helmet>
            <div className="hero bg-base-200   p-16">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    {/* Card Section */}
                    <div className="card bg-gray-200 w-full max-w-xl shrink-0 shadow-xl">
                        <h1 className="text-5xl font-bold text-center my-4">Sign up Now!</h1>

                        <form onSubmit={handleSubmit} className="card-body">
                            {/* Name Input */}
                            <div className="form-control mb-4">
                                <label className="label">
                                    <span className="label-text">Your Name</span>
                                </label>
                                <input
                                    type="text"
                                    name='name'
                                    placeholder="Enter your name"
                                    className="input input-bordered"
                                    required
                                />
                            </div>
                            {/* photo Input */}
                            <div className="form-control mb-4">
                                <label className="label">
                                    <span className="label-text">Your photo url</span>
                                </label>
                                <input
                                    type="url"
                                    name='photo'
                                    placeholder="Enter your Photo URL"
                                    className="input input-bordered"
                                    required
                                />
                            </div>

                            {/* Email Input */}
                            <div className="form-control flex flex-col mb-4">
                                <label className="label">
                                    <span className="label-text"> Your  Email</span>
                                </label>
                                <input
                                    type="email"
                                    name='email'
                                    placeholder="Enter your email"
                                    className="input input-bordered"
                                    required
                                />
                            </div>

                            {/* Password Input */}
                            <div className="form-control mb-4">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input
                                    type="password"
                                    name='password'
                                    placeholder="Enter your password"
                                    className="input input-bordered"
                                    required
                                />

                            </div>

                            {/* Sign In Button */}
                            <div className="form-control mt-6">
                                <button
                                    type="submit"
                                    className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-400 to-blue-600 text-white font-bold hover:from-blue-500 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    Sign In
                                </button>
                            </div>
                        </form>
                        <div className='flex flex-col items-center'>
                            <p>Already have an account? <Link className='text-blue-600 underline' to='/login'>Login</Link></p>
                        </div>
                        <div className="divider my-4 text-gray-500">OR</div>
                        <div>
                            <SocialLogin></SocialLogin>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
};

export default SignUp;
