import { useQuery } from "@tanstack/react-query";
import React, { useRef, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AssignDecorators = () => {
  const [selectedBooking, setSelectedBooking] = useState(null);
  const axiosSecure = useAxiosSecure();
  const decoratorModalRef = useRef();

  const { data: bookings = [], refetch: bookingsRefetch } = useQuery({
    queryKey: ["bookings", "pending-decorator"],
    queryFn: async () => {
      const res = await axiosSecure.get("/bookings?paymentStatus=paid");
      return res.data;
    },
  });

  const { data: decorators = [], isLoading: loadingDecorators } = useQuery({
    queryKey: ["decorators", "available", selectedBooking?.serviceDistrict],
    enabled: !!selectedBooking,
    queryFn: async () => {
      const district = selectedBooking?.serviceDistrict;
      const region = selectedBooking?.serviceRegion;

      let url = `/decorators?status=approved&workStatus=available`;
      if (district) url += `&district=${encodeURIComponent(district)}`;
      if (region) url += `&region=${encodeURIComponent(region)}`;

      const res = await axiosSecure.get(url);
      console.log("Fetched decorators:", res.data);
      return res.data;
    },
  });

  const openAssignDecoratorModal = (booking) => {
    setSelectedBooking(booking);
    decoratorModalRef.current.showModal();
  };

  const handleAssignDecorator = (decorator) => {
    const assignInfo = {
      decoratorId: decorator._id,
      decoratorName: decorator.name,
      decoratorEmail: decorator.email,
      trackingId: selectedBooking.trackingId || selectedBooking._id, // adjust if trackingId field is different
    };

    axiosSecure
      .patch(`/bookings/${selectedBooking._id}/assign-decorator`, assignInfo)
      .then((res) => {
        if (res.data.success) {
          decoratorModalRef.current.close();
          bookingsRefetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Decorator has been assigned successfully!",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((err) => {
        console.error(err);
        Swal.fire({
          icon: "error",
          title: "Failed to assign decorator",
          text: err.response?.data?.error || "Something went wrong",
        });
      });
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl md:text-4xl font-bold text-[#062416] my-6">
        Assign Decorators: {bookings.length} Pending
      </h2>
      

      <div className="overflow-x-auto shadow-lg rounded-xl">
        <table className="table table-zebra w-full text-center">
          <thead className="bg-base-200 text-sm uppercase">
            <tr>
              <th>#</th>
              <th>Booking ID / Name</th>
              <th>Cost</th>
              <th>Event Date</th>
              <th>Payment Status</th>
              <th>Service District</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, index) => (
              <tr key={booking._id}>
                <th>{index + 1}</th>
                <td>{booking.bookingName || booking._id.slice(-6)}</td>
                <td>{booking.totalCost || booking.cost}</td>
                <td>
                  {new Date(
                    booking.eventDate || booking.createdAt
                  ).toLocaleDateString()}
                </td>
                <td>{booking.paymentStatus || "pending"}</td>
                <td>{booking.district}</td>
                <td>
                  {booking?.paymentStatus === "paid" ? (
                    booking?.decoratorId ? (
                      <button className="btn bg-yellow-300 btn-sm" disabled>
                        Assigned
                      </button>
                    ) : (
                      <button
                        onClick={() => openAssignDecoratorModal(booking)}
                        className="btn bg-yellow-300 btn-sm"
                      >
                        Assign Decorators
                      </button>
                    )
                  ) : (
                    <button className="btn bg-yellow-300 btn-sm" disabled>
                      Payment Pending
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <dialog
        ref={decoratorModalRef}
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box">
          <h3 className="font-bold text-xl mb-4">
            Available Decorators: {decorators.length}
            {selectedBooking && (
              <span className="text-sm font-normal block">
                (For {selectedBooking.serviceDistrict},{" "}
                {selectedBooking.serviceRegion})
              </span>
            )}
          </h3>

          {loadingDecorators ? (
            <div className="text-center py-8">Loading decorators...</div>
          ) : decorators.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No available decorators in this area.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="table table-zebra">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>District</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {decorators.map((decorator, i) => (
                    <tr key={decorator._id}>
                      <th>{i + 1}</th>
                      <td>{decorator.name}</td>
                      <td>{decorator.email}</td>
                      <td>{decorator.phone || "N/A"}</td>
                      <td>{decorator.district}</td>
                      <td>
                        <button
                          onClick={() => handleAssignDecorator(decorator)}
                          className="btn btn-success btn-sm"
                        >
                          Assign
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default AssignDecorators;
