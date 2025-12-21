import { useQueries, useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Payment = () => {
  const { _id } = useParams();
  console.log("Booking ID from params:", _id);
  const axiosSecure = useAxiosSecure();

  const { isLoading, data: booking } = useQuery({
    queryKey: ["bookings", _id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/bookings/${_id}`);
      return res.data;
    },
  });
  console.log('booking info:',booking);

  if (isLoading || !booking) {
    return (
      <div className="flex justify-center">
        <span className="loading loading-infinity loading-xl"></span>
      </div>
    );
  }

  const handlePayment = async () => {
    const paymentInfo = {
      cost: booking.cost,
      bookingId: booking._id,
      customerName: booking.userName,
      customerEmail: booking.userEmail,
      serviceName: booking.serviceTitle,
      serviceId: booking.serviceId,
    };
    console.log('paymentInfo:', paymentInfo);


    const res = await axiosSecure.post("/create-checkout-session", paymentInfo);

    console.log(res.data);

    window.location.href = res.data.url;
  };


  return (
    <div>
      <h2>
        Please Pay ${booking.cost/100} for : {booking.serviceId}{" "}
      </h2>
      <button onClick={handlePayment} className="btn btn-primary text-black">
        Pay
      </button>
    </div>
  );
};

export default Payment;
