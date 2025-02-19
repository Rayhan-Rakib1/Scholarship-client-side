import {
  createBrowserRouter,
} from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home Page/Home";
import AllScholarship from "../Pages/AllScholarship/AllScholarship";
import ScholarshipDetails from "../Pages/AllScholarship/ScholarshipDetails";
import Login from "../Pages/login/signIn/Login";
import SignUp from "../Pages/login/signIn/SignUp";
import Dashboard from "../Layout/Dashboard";
import MyApplication from "../Pages/Dashboard/MyApplication";
import Users from "../Pages/Dashboard/Users";
import AddScholarship from "../Pages/Dashboard/AddScholarship";
import ManageReview from "../Pages/Dashboard/ManageReview";
import AdminProfile from "../Pages/Dashboard/AdminProfile";
import ManageAppliedApplication from "../Pages/Dashboard/ManageAppliedApplication";

import MyReview from "../Pages/Dashboard/MyReview"
import ManageScholarship from "../Pages/Dashboard/ManageScholarship";
import AdminRoute from "./AdminRoute";
import PrivateRoute from "./PrivateRoute";
import UpdateScholarship from "../Pages/Dashboard/UpdateScholarship";
import Payment from "../Pages/Dashboard/Payment";
import UserProfile from "../Pages/Dashboard/UserProfile";
import ModeratorProfile from "../Pages/Dashboard/ModaratotProfile";
import ModeratorAddScholarship from "../Pages/Dashboard/moderator/ModeratorAddScholarship";
import ModeratorManageScholarship from "../Pages/Dashboard/moderator/ModeratorManageScholarShip";
import ModeratorManageAppliedScholarship from "../Pages/Dashboard/moderator/ModeratorManageAppliedScholarship";
import ModeratorManageRevew from "../Pages/Dashboard/moderator/ModeratorManageReview";
import CheckOutForm from "../Pages/Dashboard/CheckOutForm";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: 'allScholarship',
        element: <AllScholarship></AllScholarship>
      },
      {
        path: 'scholarship/:id',
        element: <ScholarshipDetails></ScholarshipDetails>,
        loader: ({ params }) => fetch(`https://rayhan-scholarship-server.vercel.app/scholarships/${params.id}`)
      },
      {
        path: '/login',
        element: <Login></Login>
      },
      {
        path: '/signUp',
        element: <SignUp></SignUp>
      }
    ]
  },
  {
    path: 'dashboard',
    element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
    children: [
      {
        path: '/dashboard/myApplication',
        element: <MyApplication></MyApplication>
      },
      {
        path: '/dashboard/userHome',
        element: <UserProfile></UserProfile>
      },
      {
        path: '/dashboard/myReview',
        element: <MyReview></MyReview>
      },
      {
        path: '/dashboard/payment/:id',
        element: <Payment><CheckOutForm></CheckOutForm></Payment>,
        loader: ({params}) => fetch(`https://rayhan-scholarship-server.vercel.app/scholarships/${params.id}`)
      },

      // admin routes
      {
        path: '/dashboard/users',
        element: <AdminRoute> <Users></Users> </AdminRoute>
      },
      
      {
        path: '/dashboard/addScholarship',
        element: <AdminRoute> <AddScholarship></AddScholarship></AdminRoute>
      },
      
      {
        path: '/dashboard/adminProfile',
        element: <AdminRoute><AdminProfile></AdminProfile></AdminRoute>
      },
      {
        path: '/dashboard/manageReview',
        element: <AdminRoute><ManageReview></ManageReview></AdminRoute>
      },
      {
        path: '/dashboard/manageAppliedApplication',
        element: <AdminRoute><ManageAppliedApplication></ManageAppliedApplication></AdminRoute>
      },
      {
        path: '/dashboard/manageScholarship',
        element: <AdminRoute><ManageScholarship></ManageScholarship></AdminRoute>
      },
      {
        path: '/dashboard/manageScholarship/update/:id',
        element:  <UpdateScholarship></UpdateScholarship> ,
        loader: ({ params }) => fetch(`https://rayhan-scholarship-server.vercel.app/scholarships/${params.id}`)
      },

      // moderator routes
      {
        path: '/dashboard/moderatorAddScholarship',
        element:   <ModeratorAddScholarship></ModeratorAddScholarship> 
      },
      {
        path: '/dashboard/moderatorProfile',
        element: <ModeratorProfile></ModeratorProfile>
      },
      {
        path: '/dashboard/moderatorManageScholarship',
        element:  <ModeratorManageScholarship></ModeratorManageScholarship>
      },
      {
        path: '/dashboard/manageScholarship/update/:id',
        element: <UpdateScholarship></UpdateScholarship> ,
        loader: ({ params }) => fetch(`https://rayhan-scholarship-server.vercel.app/scholarships/${params.id}`)
      },
      {
        path: '/dashboard/moderatorManageAppliedScholarship',
        element: <ModeratorManageAppliedScholarship></ModeratorManageAppliedScholarship>
      },
      {
        path: '/dashboard/moderatorManageReview',
        element: <ModeratorManageRevew></ModeratorManageRevew>
      },

    ]
  }
]);