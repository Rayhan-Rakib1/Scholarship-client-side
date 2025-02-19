import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import banner1 from '../../assets/Banner/banner1.png'
import banner2 from '../../assets/Banner/banner2.jpg'
import banner3 from '../../assets/Banner/banner3.jpg'

const Banner = () => {
    return (
        <div>
            <Carousel>
                <div>
                    <img src={banner3} />
                 </div>
                <div>
                    <img src={banner2} />
                 </div>
                <div>
                    <img src={banner1} />
                 </div>
            </Carousel>
        </div>
    );
};

export default Banner;