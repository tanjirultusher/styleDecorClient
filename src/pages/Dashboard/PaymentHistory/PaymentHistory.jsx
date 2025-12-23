import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';


const PaymentHistory = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: payments = [] } = useQuery({
        queryKey: ['payments', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments?email=${user.email}`)
            return res.data;
        }
    })

    return (
        <div className="max-w-7xl mx-auto p-2">
        <h2 className="text-3xl md:text-4xl font-bold text-[#062416] my-6">
          Payment History: {payments.length}
        </h2>
            <div className="overflow-x-auto shadow-lg rounded-xl">
                <table className="table table-zebra w-full text-center">
                    <thead className='bg-base-200 text-sm uppercase'>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Amount</th>
                            <th>Paid Time</th>
                            <th>Transaction Id</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            payments.map((payment, index) => <tr key={payment._id}>
                                <th>{index + 1}</th>
                                <td>Cy Ganderton</td>
                                <td>${payment.amount}</td>
                                <td>{payment.paidAt}</td>
                                <td>{payment.transactionId}</td>
                            </tr>)
                        }


                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PaymentHistory;