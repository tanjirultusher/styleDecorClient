import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const BookingSummaryAnalysis = () => {
  const axiosSecure = useAxiosSecure();

  const { data: bookings = [], isLoading, refetch } = useQuery({
    queryKey: ["my-bookings"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/bookings`);
      return res.data;
    },
  });

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  const totalBookings = bookings.length;

  const totalRevenue = bookings
    .filter((booking) => booking.paymentStatus === "paid")
    .reduce((sum, booking) => sum + booking.cost, 0);

  const pendingPayments = bookings
    .filter((booking) => booking.paymentStatus !== "paid")
    .reduce((sum, booking) => sum + booking.cost, 0);

  const confirmedBookings = bookings.filter((booking) => booking.BookingStatus === "confirmed").length;

  const serviceCountMap = {};
  bookings.forEach((booking) => {
    const title = booking.serviceTitle || "Unknown";
    serviceCountMap[title] = (serviceCountMap[title] || 0) + 1;
  });

  const serviceDemandData = Object.keys(serviceCountMap)
    .map((title) => ({
      service: title,
      bookings: serviceCountMap[title],
    }))
    .sort((a, b) => b.bookings - a.bookings);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-[#062416] text-center">Booking Summary Analysis</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-600">Total Bookings</h3>
          <p className="text-3xl font-bold text-blue-600 mt-4">{totalBookings}</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-600">Total Revenue (Paid)</h3>
          <p className="text-3xl font-bold text-green-600 mt-4">${totalRevenue.toLocaleString()}</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-600">Pending Payments</h3>
          <p className="text-3xl font-bold text-orange-600 mt-4">${pendingPayments.toLocaleString()}</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-600">Confirmed Bookings</h3>
          <p className="text-3xl font-bold text-purple-600 mt-4">{confirmedBookings}</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-[#062416] text-center">Service Demand Chart</h2>
        <p className="text-center text-gray-600 mb-8">Number of bookings per service (Histogram)</p>

        {serviceDemandData.length > 0 ? (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={serviceDemandData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="service" angle={-45} textAnchor="end" height={80} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="bookings" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-center text-gray-500">No booking data available for chart.</p>
        )}
      </div>
    </div>
  );
};

export default BookingSummaryAnalysis;