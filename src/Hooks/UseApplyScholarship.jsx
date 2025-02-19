import React, { useContext } from 'react';
import UseAxiosSecure from './UseAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../Provider/AuthProvider';

const UseApplyScholarship = () => {
    const {user} = useContext(AuthContext);
   
    const axiosSecure = UseAxiosSecure();
    const {data: applyScholarship = [], refetch} = useQuery({
        queryKey: ['applyScholarship', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/applyScholarship?email=${user?.email}`);
            return res.data
        }
    }) 

    return  [applyScholarship, refetch]
};

export default UseApplyScholarship;