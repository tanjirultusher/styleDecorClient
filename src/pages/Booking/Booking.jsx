import { useState } from "react";
import { useLoaderData, useLocation } from "react-router";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loading from "../../components/Loading";
import Swal from "sweetalert2";

const Booking = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const location = useLocation();
  const serviceCenters = useLoaderData();

  const regionsDuplicate = serviceCenters.map((c) => c.region);
  const regions = [...new Set(regionsDuplicate)];

  const getDistrictsByRegion = (region) => {
    if (!region) return [];
    const filtered = serviceCenters.filter((c) => c.region === region);
    const districts = filtered.map((d) => d.district);
    return [...new Set(districts)];
  };

  const { serviceTitle, serviceId, cost, image } = location.state || {};

  const [eventDate, setEventDate] = useState("");
  const [region, setRegion] = useState("");
  const [district, setDistrict] = useState("");
  const [address, setAddress] = useState("");

  if (!serviceId) {
    return <Loading />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const bookingData = {
      userId: user?._id || user?.uid,
      userName: user?.displayName,
      userEmail: user?.email,

      serviceTitle,
      serviceId,
      cost,
      designImage: image,

      eventDate,
      region,
      district,
      location: {
        addressLine: address,
        region,
        district,
      },
    };
    try {
      const res = await axiosSecure.post("/bookings", bookingData);
      console.log(res.data);
      Swal.fire({
        title: "Success!",
        text: "Your booking has been successfully completed!",
        icon: "success",
        confirmButtonText: "OK",
        confirmButtonColor: "#28a745",
        timer: 3000,
        timerProgressBar: true,
        showClass: {
          popup: "animate__animated animate__fadeInDown",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutUp",
        },
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Error!",
        text:
          error.response?.data?.message || "Booking failed. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
        confirmButtonColor: "#dc3545",
        showClass: {
          popup: "animate__animated animate__shakeX",
        },
      });
    }
  };

  return (
    <div className="max-w-6xl mx-auto my-12 px-4">
      <form onSubmit={handleSubmit}>
        <div className="card lg:card-side bg-base-100 shadow-xl">
          <figure className="lg:w-1/2">
            <img
              src={image}
              alt="Service Design"
              className="h-full w-full object-cover"
            />
          </figure>

          <div className="card-body">
            <h2 className="card-title text-2xl text-[#062416]">
              Booking Summary
            </h2>

            <div className="space-y-1 text-sm">
              <p>
                <span className="font-semibold">Name:</span> {user?.displayName}
              </p>
              <p>
                <span className="font-semibold">Email:</span> {user?.email}
              </p>
            </div>

            <div className="divider"></div>

            <div className="space-y-1">
              <p>
                <span className="font-semibold">Service ID:</span> {serviceId}
              </p>
              <p className="text-green-600 font-bold text-lg">
                Cost: Bdt {cost}
              </p>
              <p className="text-sm text-gray-500 break-all"></p>
            </div>

            <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <input
                  type="date"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                  className="input input-bordered w-full"
                  required
                />
              </div>

              <div>
                <select
                  value={region}
                  onChange={(e) => {
                    setRegion(e.target.value);
                    setDistrict("");
                  }}
                  className="select select-bordered w-full"
                  required
                >
                  <option value="" disabled>
                    Select Region
                  </option>
                  {regions.map((r, i) => (
                    <option key={i} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <select
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="select select-bordered w-full"
                  required
                  disabled={!region || !eventDate}
                >
                  <option value="" disabled>
                    {!region ? "First select a Region" : "Select District"}
                  </option>
                  {region &&
                    eventDate &&
                    getDistrictsByRegion(region).map((dist, i) => (
                      <option key={i} value={dist}>
                        {dist}
                      </option>
                    ))}
                </select>
              </div>

              <div className="lg:col-span-2">
                <textarea
                  placeholder="Detailed Service Location Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="textarea textarea-bordered w-full"
                  required
                />
              </div>
            </div>

            <div className="card-actions justify-end mt-6">
              <button
                type="submit"
                className="btn bg-yellow-500 text-white hover:bg-[#062416]"
              >
                Confirm Booking
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Booking;
