import React, { useEffect, useState } from 'react';

const UseScholarships = () => {
   const [scholarships, setScholarships] = useState([]);
const [loading, setLoading] = useState(true)
   useEffect(() => {
     fetch('https://rayhan-scholarship-server.vercel.app/scholarships')
     .then(res => res.json())
     .then(data => {
        setScholarships(data), 
        setLoading(false)
     })
   }, [])
   return [scholarships, loading]

};

export default UseScholarships;