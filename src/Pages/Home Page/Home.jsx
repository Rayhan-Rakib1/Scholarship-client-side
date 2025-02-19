import React from 'react';
import Banner from './Banner';
import Resources from './Resources ';
import SuccessStories from './SuccessStories';
import { Helmet } from 'react-helmet-async';
import SixScholarship from './SixScholarship';

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Scholarship.com | Home</title>
                 
            </Helmet>
            <Banner></Banner>
            <SixScholarship></SixScholarship>
            <SuccessStories></SuccessStories>
            <Resources></Resources>
        </div>
    );
};

export default Home;