import React, { useContext } from 'react';
import { FaGoogle } from 'react-icons/fa';
import { AuthContext } from '../../../Provider/AuthProvider';
import { useNavigate } from 'react-router-dom';
import UseAxiosPublic from '../../../Hooks/UseAxiosPublic';

const SocialLogin = () => {
    const { signInWithGoogle, setUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const axiosPublic = UseAxiosPublic();

    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then(res => {
                const user = res.user;
                console.log(user);
                setUser(user);

                const userInfo = {
                    name: res.user?.displayName,
                    email: res.user?.email,
                    photo: res.user?.photoURL
                }
                navigate('/')
                axiosPublic.post('/users', userInfo)
                .then(res => {
                    console.log(res.user);
                })
            })
          
    }

    return (
        <div className='p-5'>
            <button onClick={handleGoogleSignIn}
                className="btn flex items-center justify-center w-full bg-gray-100 text-gray-700 rounded-2xl  hover:bg-gray-300 border-2 font-bold"
            >
                <FaGoogle className="mr-2 " />
                Login with Google
            </button>
        </div>
    );
};

export default SocialLogin;