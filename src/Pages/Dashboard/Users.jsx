import React from 'react';
import UseAxiosSecure from '../../Hooks/UseAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { FaTrash, FaUsers } from 'react-icons/fa';
import Swal from 'sweetalert2';

const Users = () => {
    const axiosSecure = UseAxiosSecure();

    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const result = await axiosSecure.get('/users');
            return result.data
        }
    })


    const handleMakeAdmin = (user,role) => {
        axiosSecure.patch(`/users/admin/${user._id}?role=${role}`)
        .then(res => {
            console.log(res.data);
            if(res.data.modifiedCount > 0){
                refetch()
                Swal.fire({
                    icon: "success",
                    title: `${user.name} is ${role} now!`,
                    showConfirmButton: false,
                    timer: 1500
                  });
            }
        })
     }


    const handleDelete = user => {
        console.log(user._id);
                Swal.fire({
                    title: "Are you sure?",
                    text: "You won't be able to revert this!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Yes, delete it!"
                }).then((result) => {
                    if (result.isConfirmed) {
        
                        axiosSecure.delete(`/users/${user._id}`)
                            .then(res => {
                                console.log(res.data);
                                if (res.data.deletedCount > 0) {
                                    refetch();
                                    Swal.fire({
                                        title: "Deleted!",
                                        text: "Your file has been deleted.",
                                        icon: "success"
                                    });
                                }
                            })
                    }
                });
            }
    return (
        <div>
            <div className='flex justify-around'>
                <h1 className='text-3xl'>All Users</h1>
                <h1 className='text-3xl'>Total users: {users.length}</h1>
            </div>

            {/* all users */}

            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                NO.
                            </th>
                            <th>Name</th>
                            <th>Job</th>
                            <th>Favorite Color</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            users.map((user, index) => <tr key={user._id}>
                                <th>
                                    {index + 1}
                                </th>
                                <td>
                                    <div className="flex items-center gap-3">

                                        <div>
                                            <div className="font-bold">{user.name}</div>
                                            
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {user.email}
                                </td>
                                <td>
                                {user.role === 'admin' ? 'Admin' : <button
                                        onClick={() => handleMakeAdmin(user,"admin")} className="btn btn-ghost btn-lg">Make Admin</button>}
                                </td>
                                <td>
                                {user.role === 'moderator' ? 'Moderator' : <button
                                        onClick={() => handleMakeAdmin(user,"moderator")} className="btn btn-ghost btn-lg">Make Moderator</button>}
                                </td>
                                <td>
                                    <button
                                        onClick={() => handleDelete(user)} className="btn btn-ghost btn-lg"><FaTrash className='text-red-600'></FaTrash></button>
                                </td>
                            </tr>)
                        }


                    </tbody>

                </table>
            </div>

        </div>
    );
};

export default Users;