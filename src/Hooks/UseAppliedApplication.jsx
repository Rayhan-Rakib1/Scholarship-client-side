import React from 'react';
import UseAxiosSecure from './UseAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const UseAppliedApplication = () => {
    const axiosSecure = UseAxiosSecure();

    const {data: allApplication = [], refetch} = useQuery({
        queryKey: ['allApplication'],
        queryFn: async() => {
            const res = await axiosSecure.get('/applyScholarship')
            return res.data
        }
    })
    return [allApplication, refetch]
};

export default UseAppliedApplication;