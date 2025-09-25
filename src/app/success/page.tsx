"use client";

import React from "react";
import { CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";

const VerificationSuccess: React.FC = () => {
  const router = useRouter();

  const handleContinue = () => {
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="bg-gray-900/90 text-white p-10 rounded-2xl shadow-2xl max-w-md w-full text-center border border-gray-700">
        <div className="flex flex-col items-center space-y-6">
          <CheckCircle className="w-16 h-16 text-green-500" />
          <h2 className="text-3xl font-bold">Verification Successful!</h2>
          <p className="text-gray-400">
            Your email has been successfully verified. You can now continue to your account.
          </p>
          <button
            onClick={handleContinue}
            className="mt-4 w-full py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-colors"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerificationSuccess;
