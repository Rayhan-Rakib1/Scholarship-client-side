import React, { useContext, useRef, useState } from 'react';
import { AuthContext } from '../../../Provider/AuthProvider';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import SocialLogin from './SocialLogin';

const Login = () => {
  const [error, setError] = useState('');
  const { signIn, setUser, loading, resetPassword } = useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const emailRef = useRef();


  const handleLogin = e => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;



    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d@$!%*?&]{6,}$/;

    // Password validation logic
    if (!passwordRegex.test(password)) {
      toast.error('Password must be at least 6 characters long, contain at least one capital letter, and include a special character.');
      return;
    }


    signIn(email, password)
      .then(res => {
        const user = res.user;
        console.log(user);
        setUser(user)
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "User Login successfully",
          showConfirmButton: false,
          timer: 1500
        });
        navigate(from, { replace: true })
      })
    console.log({ password, email });

  }

  const forgetPassword = () => {
    const email = emailRef.current.value
   
    if (!email) {
        toast.error('Please provide a valid email')
    }
    else (
        resetPassword(email)
            .then(res => {
                toast.success('Email send please check your email')
            })
            .catch(error => {
            })
    )
}
  return (
    <div>
      <Helmet>
        <title>Scholarship.com | Login</title>

      </Helmet>
      <div className="hero bg-base-200 p-24">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">


          </div>
          <div className="card bg-gray-200 w-full max-w-sm shrink-0 shadow-2xl">
            <h1 className="text-5xl text-center font-bold">Login now!</h1>
            <form onSubmit={handleLogin} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-bold">Email</span>
                </label>
                <input name='email' ref={emailRef} type="email" placeholder="email" className="input input-bordered" required />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-bold">Password</span>
                </label>
                <input name='password' type="password" placeholder="password" className="input input-bordered" required />
                <div className="mt-2 text-right">

                  <Link onClick={forgetPassword}
                    href="#"
                    className="text-sm text-gray-500 hover:text-gray-700 underline font-bold"

                  >
                    Forgot password?
                  </Link>

                </div>
                {error && <p className="text-red-500 text-sm">{error}</p>}
              </div>
              <div className="form-control mt-6">
                <button
                  type="submit"
                  className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-400 to-blue-600 text-white font-bold hover:from-blue-500 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Sign In
                </button>
              </div>
            </form>
            <div className='text-center'>
              <p><small>New here? <Link to='/signUp' className='text-blue-600 underline'>Create an account</Link></small></p>
            </div>
            <div className="divider my-4 text-gray-500">OR</div>
            <div>
              <SocialLogin></SocialLogin>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;