import React from 'react';
import SectionTitle from '../../Shared/SectionTitle';

const SuccessStories = () => {
  return (
    <section className="py-12 bg-gray-100">
      <div className="max-w-7xl mx-auto text-center">
        <SectionTitle heading={'Success Stories'} subHeading={'See how our users found success in their scholarship journey!'}></SectionTitle>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Testimonial 1 */}
          <div className="card w-full bg-base-100 shadow-xl">
            <div className="card-body">
              <p className="text-lg text-gray-800">"Thanks to this platform, I was able to find the perfect scholarship for my engineering program! It helped me cover most of my tuition fees!"</p>
              <div className="card-actions justify-end">
                <div className="font-semibold text-gray-900">John Doe</div>
                <div className="text-gray-500">Engineering Student, Harvard University</div>
              </div>
            </div>
          </div>

          {/* Testimonial 2 */}
          <div className="card w-full bg-base-100 shadow-xl">
            <div className="card-body">
              <p className="text-lg text-gray-800">"This website made finding scholarships a breeze. I applied for multiple scholarships and got accepted into one that fully covered my tuition!"</p>
              <div className="card-actions justify-end">
                <div className="font-semibold text-gray-900">Jane Smith</div>
                <div className="text-gray-500">Medical Student, Stanford University</div>
              </div>
            </div>
          </div>

          {/* Testimonial 3 */}
          <div className="card w-full bg-base-100 shadow-xl">
            <div className="card-body">
              <p className="text-lg text-gray-800">"I never thought I’d find a scholarship opportunity for my specific field, but this platform made it happen. Highly recommended!"</p>
              <div className="card-actions justify-end">
                <div className="font-semibold text-gray-900">Mark Taylor</div>
                <div className="text-gray-500">Computer Science Student, MIT</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;
