import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { CheckCircle2 } from 'lucide-react';

const PaymentSuccess = () => {
    const [searchParams] = useSearchParams();
    const [paymentInfo, setPaymentInfo] = useState({});
    const sessionId = searchParams.get('session_id');
    const axiosSecure = useAxiosSecure();

    console.log(sessionId);

    useEffect(() => {
        if (sessionId) {
            axiosSecure.patch(`/payment-success?session_id=${sessionId}`)
                .then(res => {
                    console.log('sdsdd',res.data)
                    setPaymentInfo({
                        transactionId: res.data.transactionId,
                        trackingId : res.data.trackingId
                    })
                })
        }
    }, [sessionId, axiosSecure])

    return (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
    <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
      <div className="mx-auto mb-6">
        <CheckCircle2 className="w-24 h-24 text-green-500 mx-auto" />
      </div>

      <h2 className="text-4xl font-bold text-gray-800 mb-4">
        Payment Successful!
      </h2>

      <div className="space-y-4 text-left bg-gray-50 rounded-xl p-6">
        <p className="text-lg text-gray-700">
          <span className="font-semibold">Transaction ID:</span><br />
          <span className="text-green-600 font-mono">{paymentInfo.transactionId}</span>
        </p>
        <p className="text-lg text-gray-700">
          <span className="font-semibold"> Tracking ID:</span><br />
          <span className="text-green-600 font-mono">{paymentInfo.trackingId}</span>
        </p>
      </div>

    </div>
  </div>
);
};

export default PaymentSuccess;