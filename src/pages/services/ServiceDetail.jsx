import { Link, useParams } from "react-router";
import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loading from "../../components/Loading";

const ServiceDetail = () => {
  const { user } = useAuth();
  const { _id } = useParams();
  const axiosSecure = useAxiosSecure();

  const {
    data: service,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["service", _id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/services/${_id}`);
      return res.data;
    },
  });
  console.log(service);

  if (isLoading) {
    return <Loading />;
  }
  if (!service) {
    return (
      <div className="text-center text-lg font-medium p-6">
        Service not found.
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-4 text-[#062416]">
        {service.serviceTitle}
      </h1>

      <p className="text-gray-700 text-justify mx-auto mb-10 leading-relaxed">
        {service.description}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {service.images?.map((img, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition"
          >
            <img
              src={img}
              alt={`service-${index}`}
              className="w-full h-72 object-cover"
            />

            <div className="p-5 flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Starting From</p>
                <p className="text-xl font-semibold text-[#062416]">
                  ৳ {service.cost?.[index]}
                </p>
              </div>

              <Link
                to="/booking"
                state={{
                  serviceTitle: service.serviceTitle,
                  serviceId: service.serviceId[index],
                  cost: service.cost[index],
                  image: service.images[index],
                }}
              >
                <button className="bg-yellow-500 text-black px-5 py-2 rounded-lg">
                  Booking Now
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceDetail;
