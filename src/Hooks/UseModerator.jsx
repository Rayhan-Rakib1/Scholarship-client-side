import React, { useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import UseAxiosSecure from './UseAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const UseModerator = () => {
    const {user} = useContext(AuthContext);
    console.log(user?.email);
    const axiosSecure = UseAxiosSecure();

    const {data: isModerator = []} = useQuery({
        queryKey: [user?.email, 'isModerator'],
        queryFn: async() =>{
            const res = await axiosSecure.get(`/users/moderator/${user?.email}`)
             return res.data?.moderator
        },
        enabled: !!user?.email
    })
    return  [isModerator]
};

export default UseModerator;