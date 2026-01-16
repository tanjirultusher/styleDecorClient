import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Link } from "react-router";
import { FaStar, FaClock, FaUsers, FaArrowRight, FaCheckCircle, FaTag } from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loading from "../../components/Loading";

const Services = () => {
  const axiosSecure = useAxiosSecure();
  const { data: services = [], isLoading } = useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      const res = await axiosSecure.get("/services");
      return res.data;
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#062416] mb-4">
            Our <span className="text-yellow-500">Services</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Explore our comprehensive range of decoration services tailored to make your special moments unforgettable
          </p>
          <div className="flex items-center justify-center gap-8 mt-6 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <FaCheckCircle className="text-green-600" />
              <span>Professional Team</span>
            </div>
            <div className="flex items-center gap-2">
              <FaCheckCircle className="text-green-600" />
              <span>Quality Materials</span>
            </div>
            <div className="flex items-center gap-2">
              <FaCheckCircle className="text-green-600" />
              <span>On-Time Delivery</span>
            </div>
          </div>
        </motion.div>

        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-items-center">
          {services.map((service, index) => (
            <motion.div
              key={service._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-white w-full max-w-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden hover:-translate-y-2"
            >
              <div className="relative overflow-hidden">
                <figure className="relative h-64 overflow-hidden">
                  <img
                    src={service.images || "https://i.ibb.co/4pDNDk1/default.jpg"}
                    alt={service.serviceTitle}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute top-4 right-4 bg-yellow-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg flex items-center gap-1">
                    <FaTag className="text-xs" />
                    Featured
                  </div>
                </figure>

                <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-lg">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2 text-gray-700">
                        <FaUsers className="text-yellow-500" />
                        <span className="font-semibold">Expert Team</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-700">
                        <FaClock className="text-yellow-500" />
                        <span className="font-semibold">2-3 hrs</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className="text-yellow-500 text-sm" />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500 font-semibold">(4.9)</span>
                  <span className="ml-auto text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-semibold">
                    Available
                  </span>
                </div>

                <h2 className="text-xl font-bold text-[#062416] mb-3 group-hover:text-yellow-600 transition-colors duration-300 line-clamp-2">
                  {service.serviceTitle}
                </h2>

                {service.description && (
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed line-clamp-2">
                    {service.description}
                  </p>
                )}

                <div className="space-y-2 mb-4 pb-4 border-b border-gray-200">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 flex items-center gap-2">
                      <svg className="w-4 h-4 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      Setup Included
                    </span>
                    <span className="text-gray-600 flex items-center gap-2">
                      <svg className="w-4 h-4 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      Cleanup Service
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 flex items-center gap-2">
                      <svg className="w-4 h-4 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      Customizable
                    </span>
                    <span className="text-gray-600 flex items-center gap-2">
                      <svg className="w-4 h-4 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      Premium Quality
                    </span>
                  </div>
                </div>

                {service.cost && (
                  <div className="mb-4">
                    <p className="text-sm text-gray-500 mb-1">Starting from</p>
                    <p className="text-3xl font-bold text-[#062416]">
                      <span className="text-yellow-600">৳</span> {service.cost}
                    </p>
                  </div>
                )}

                <Link to={`/service/${service._id}`} className="block">
                  <button className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2 group/btn">
                    View Details
                    <FaArrowRight className="group-hover/btn:translate-x-1 transition-transform duration-300" />
                  </button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {services.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="bg-white rounded-2xl shadow-lg p-12 max-w-md mx-auto">
              <div className="text-6xl mb-4">🎨</div>
              <h3 className="text-2xl font-bold text-[#062416] mb-2">No Services Available</h3>
              <p className="text-gray-600">Check back soon for our amazing decoration services!</p>
            </div>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-16 bg-gradient-to-r from-[#062416] to-[#0a3520] rounded-2xl p-8 md:p-12 text-center shadow-2xl"
        >
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Need a Custom Package?
          </h3>
          <p className="text-gray-300 text-lg mb-6 max-w-2xl mx-auto">
            Can't find exactly what you're looking for? Our team can create a personalized decoration package tailored to your specific needs and budget.
          </p>
          <Link
            to="/consultation"
            className="inline-flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
          >
            Book Free Consultation
            <FaArrowRight />
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Services;
