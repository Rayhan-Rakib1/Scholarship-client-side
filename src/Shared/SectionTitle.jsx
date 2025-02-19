import React from 'react';

const SectionTitle = ({heading, subHeading}) => {
    return (
        <div className='mx-auto text-center md:w-7/12'>
            <h3 className='text-4xl uppercase border-b-2 py-4 mb-5'>{heading}</h3>
            <p className='text-yellow-700'>{subHeading}</p>
        </div>
    );
};

export default SectionTitle;