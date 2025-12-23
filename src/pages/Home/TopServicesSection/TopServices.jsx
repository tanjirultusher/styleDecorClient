import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { Link } from 'react-router';
import Loading from '../../../components/Loading';

const TopServices = () => {
  const axiosSecure = useAxiosSecure();

  const { data: services = [], isLoading } = useQuery({
    queryKey: ['services'],
    queryFn: async () => {
      const res = await axiosSecure.get('/services');
      return res.data;
    },
  });

  const topServices = services.slice(0, 6);

  if (isLoading) {
    return <Loading />;
  }

  if (topServices.length === 0) {
    return (
      <div className="text-center text-xl font-semibold py-10">
        No services available right now.
      </div>
    );
  }

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-[#062416] mb-12">
          Our Top Services
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {topServices.map((service) => (
            <div
              key={service._id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 flex flex-col"
            >
              <img
                src={service.images}
                alt={service.serviceTitle}
                className="w-full h-56 object-cover"
              />

              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-semibold text-[#062416] mb-3">
                  {service.serviceTitle}
                </h3>

                <p className="text-gray-600 mb-4 flex-grow">
                  {service.description.length > 100
                    ? `${service.description.substring(0, 100)}...`
                    : service.description}
                </p>

                <div className="flex justify-between items-center mt-auto">
                  <p className="text-lg font-bold text-green-700">
                    BDT {service.cost}
                  </p>

                  <Link
                    to={`/service/${service._id}`}
                    className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium px-5 py-2 rounded-lg transition"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopServices;