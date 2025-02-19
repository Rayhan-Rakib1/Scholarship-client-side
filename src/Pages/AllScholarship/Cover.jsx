import React from 'react';
import coverImg from '../../assets/Banner/banner2.jpg'

const Cover = () => {
    return (
        <div>
            <div
                className="hero h-[600px]"
                style={{
                    backgroundImage: `url(${ coverImg })`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}>
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content text-neutral-content text-center">
                    <div className="max-w-md">
                        <h1 className="mb-5 text-5xl font-bold">Scholarship</h1>
                        <p className="mb-5">
                           Define your future
                        </p>
                        
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cover;