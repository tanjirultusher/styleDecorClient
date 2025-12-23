import React from 'react';
import { useQuery } from '@tanstack/react-query'; 
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Loading from '../../../components/Loading'; 

const TopDecorators = () => {
  const { loading } = useAuth(); 
  const axiosSecure = useAxiosSecure();
  
  const {
    data: decorators = [],
    isLoading: decoratorsLoading,
  } = useQuery({
    queryKey: ["topDecorators"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/decorators`);
      return res.data || [];
    },
  });
  
  if (loading || decoratorsLoading) {
    return <Loading />;
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-[#062416] mb-8">Top Decorators</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {decorators.slice(0, 4).map((decorator) => (
          <div key={decorator._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="aspect-square bg-gray-200 flex items-center justify-center">
              <img src={decorator.photoURL ? decorator.photoURL : 'https://via.placeholder.com/150'} alt={decorator.name} className="w-full h-full object-cover" />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{decorator.name}</h3>
              <p className="text-sm text-gray-600 mb-2">Email: {decorator.email}</p>
              <p className="text-sm text-gray-500">Speciality: {decorator.specialty }</p>
            </div>
          </div>
        ))}
      </div>
      {decorators.length === 0 && (
        <p className="text-center text-gray-500 mt-8">No decorators found.</p>
      )}
    </div>
  );
};

export default TopDecorators;