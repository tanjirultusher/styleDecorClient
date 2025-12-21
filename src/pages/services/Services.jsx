import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Link } from "react-router";
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
    <div className="mb-10 px-6">
      <h2 className="text-4xl font-semibold text-center mt-6 mb-4">
        Our Services
      </h2>

      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-items-center p-2">
        {services.map((service) => (
          <div
            key={service._id}
            className="card bg-gray-300 w-96 shadow-sm hover:shadow-lg transition-all"
          >
            <figure className="px-10 pt-10">
              <img
                src={
                  service.images[0] || "https://i.ibb.co/4pDNDk1/default.jpg"
                }
                alt={service.serviceTitle}
                className="rounded-xl h-56 w-full object-cover"
              />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title">{service.serviceTitle}</h2>
              <Link to={`/service/${service._id}`}>
                <div className="card-actions mt-1">
                  <button className="bg-[#062416] hover:bg-purple-700 text-white px-5 py-2 rounded-lg text-sm font-medium transition">
                    View Details
                  </button>
                </div>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
