import { useQuery } from "@tanstack/react-query";
import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const DecoratorEarningSummary = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: bookings = [], isLoading, refetch } = useQuery({
    queryKey: ["my-bookings", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/bookings?email=${user.email}`);
      console.log(res.data);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const paidBookings = bookings.filter(
    (booking) =>
      booking.paymentStatus?.toLowerCase() === "paid" &&
      booking.decoratorEmail === user?.email
  );

  const totalEarnings = paidBookings.reduce(
    (sum, booking) => sum + (booking.cost * 0.8 || 0),
    0
  );

  const totalBookings = paidBookings.length;
  const avgEarning = totalBookings > 0 ? totalEarnings / totalBookings : 0;

  const pieData = [
    { name: "Your Earnings (80%)", value: totalEarnings },
    { name: "Company Share (20%)", value: totalEarnings / 4 },
  ];

  const COLORS = ["#4CAF50", "#FF6384"];

  if (isLoading) {
    return <div className="text-center py-10">Loading earnings summary...</div>;
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Decorator Earning Summary</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white shadow-lg rounded-xl p-6 text-center border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-600">Total Earnings</h3>
          <p className="text-4xl font-bold text-green-600 mt-2">
            BDT {totalEarnings.toLocaleString()}
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-xl p-6 text-center border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-600">Paid Bookings</h3>
          <p className="text-4xl font-bold text-blue-600 mt-2">{totalBookings}</p>
        </div>

        <div className="bg-white shadow-lg rounded-xl p-6 text-center border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-600">Avg. Earning per Booking</h3>
          <p className="text-4xl font-bold text-purple-600 mt-2">
            BDT {avgEarning.toLocaleString()}
          </p>
        </div>
      </div>

      <div className="bg-white shadow-lg rounded-xl p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Earnings Breakdown</h2>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(1)}%`}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `৳ ${value.toLocaleString()}`} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white shadow-lg rounded-xl overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-800">Recent Paid Bookings</h2>
        </div>
        {paidBookings.length === 0 ? (
          <div className="p-6 text-center text-gray-500">No paid bookings yet.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cost</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Your Earning</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paidBookings.slice(0, 5).map((booking) => (
                  <tr key={booking._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{booking.serviceTitle}</div>
                      <div className="text-sm text-gray-500">{booking.decoratorName}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(booking.eventDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      BDT {booking.cost.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-medium">
                      BDT {(booking.cost * 0.8).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default DecoratorEarningSummary;