import React from 'react';
import { FaAd, FaBook, FaCalendar, FaHome, FaList, FaSearch, FaUsers, FaUtensils } from 'react-icons/fa';
import { NavLink, Outlet } from 'react-router-dom';
import UseApplyScholarship from '../Hooks/UseApplyScholarship';
import UseAdmin from '../Hooks/UseAdmin';
import { useQuery } from '@tanstack/react-query';
import UseModerator from '../Hooks/UseModerator';

const Dashboard = () => {
    const [applyScholarship, refetch,] = UseApplyScholarship();
    const [isAdmin] = UseAdmin();
    const [isModerator] = UseModerator();
    

    return (
        <div className='flex'>
            <div className='w-64 min-h-full bg-orange-200'>
                <ul className='menu'>


                {
    isAdmin ? (
        <>
            <li>
                <NavLink to='/dashboard/adminProfile'><FaHome /> Admin Profile</NavLink>
            </li>
            <li>
                <NavLink to='/dashboard/addScholarship'><FaUtensils /> Add Scholarship</NavLink>
            </li>
            <li>
                <NavLink to='/dashboard/manageScholarship'>
                    <FaList /> Manage Scholarship
                </NavLink>
            </li>
            <li>
                <NavLink to='/dashboard/manageAppliedApplication'>
                    <FaBook /> Manage Applied Application
                </NavLink>
            </li>
            <li>
                <NavLink to='/dashboard/users'>
                    <FaUsers /> Manage Users
                </NavLink>
            </li>
            <li>
                <NavLink to='/dashboard/manageReview'>
                    <FaUsers /> Manage Review
                </NavLink>
            </li>
        </>
    ) : isModerator ? (
        <>
            <li>
                <NavLink to='/dashboard/moderatorProfile'><FaHome /> My Profile</NavLink>
            </li>
            <li>
                <NavLink to='/dashboard/moderatorAddScholarship'><FaUtensils /> Add Scholarship</NavLink>
            </li>
            <li>
                <NavLink to='/dashboard/moderatorManageScholarship'>
                    <FaList /> Manage Scholarship
                </NavLink>
            </li>
            <li>
                <NavLink to='/dashboard/moderatorManageAppliedScholarship'>
                    <FaBook /> Manage Applied Application
                </NavLink>
            </li>
            <li>
                <NavLink to='/dashboard/moderatorManageReview'>
                    <FaUsers /> Manage Review
                </NavLink>
            </li>
        </>
    ) : (
        <>
            <li>
                <NavLink to='/dashboard/userHome'><FaHome /> Home</NavLink>
            </li>
            <li>
                <NavLink to='/dashboard/myApplication'>
                    <FaCalendar /> My Application ({applyScholarship.length})
                </NavLink>
            </li>
            <li>
                <NavLink to='/dashboard/myReview'>
                    <FaAd /> Review
                </NavLink>
            </li>
        </>
    )
}


                    <div className="divider"></div>

                    <li>

                        <NavLink to='/'><FaHome></FaHome>  Home</NavLink>
                    </li>
                    <li>

                        <NavLink to='/allScholarship'><FaSearch></FaSearch>  All application</NavLink>
                    </li>


                </ul>
            </div>
            <div className='flex-1 p-8'>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;