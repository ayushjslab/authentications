"use client";

import React, { useState, useEffect } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

const OtpVerification: React.FC = () => {
  const [otp, setOtp] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [resendTimer, setResendTimer] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (resendTimer > 0) {
      interval = setInterval(() => setResendTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [resendTimer]);

  const handleOtpChange = (value: string) => {
    setOtp(value);
    setError("");
  };

  const handleVerify = async () => {
    if (otp.length !== 6) {
      setError("Please enter all 6 digits");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      if (otp === "123456") {
        alert(`OTP Verified Successfully! Code: ${otp}`);
      } else {
        setError("Invalid OTP. Please try again.");
      }
    } catch {
      setError("Verification failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    setResendTimer(30);
    setError("");

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      alert("New OTP sent to your email!");
    } catch {
      setError("Failed to resend OTP. Please try again.");
      setResendTimer(0);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4">
      <div className="bg-gray-800/30 text-white p-8 rounded-2xl shadow-2xl w-full max-w-md text-center border border-gray-700">
        <div className="mb-6">
          <h2 className="text-3xl font-bold mb-2">OTP Verification</h2>
          <p className="text-gray-400">
            Enter the 6-digit OTP sent to your email
          </p>
        </div>

        <div className="space-y-6">
          <div className="space-y-4">
            <InputOTP
              maxLength={6}
              value={otp}
              onChange={handleOtpChange}
              disabled={isLoading}
            >
              <InputOTPGroup className="flex items-center justify-center gap-3">
                {[0, 1, 2].map((i) => (
                  <InputOTPSlot
                    key={i}
                    index={i}
                    className="w-12 h-12 text-center rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-white focus:border-white text-white text-lg font-semibold transition-all duration-200 disabled:opacity-50"
                  />
                ))}
              </InputOTPGroup>

              <InputOTPSeparator className="text-gray-500" />

              <InputOTPGroup className="flex items-center justify-center gap-3">
                {[3, 4, 5].map((i) => (
                  <InputOTPSlot
                    key={i}
                    index={i}
                    className="w-12 h-12 text-center rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-white focus:border-white text-white text-lg font-semibold transition-all duration-200 disabled:opacity-50"
                  />
                ))}
              </InputOTPGroup>
            </InputOTP>

            {error && <div className="text-red-400 text-sm mt-2">{error}</div>}
          </div>

          <button
            onClick={handleVerify}
            disabled={isLoading || otp.length !== 6}
            className="w-full py-3 bg-white text-gray-900 hover:bg-gray-200 disabled:bg-gray-600 disabled:text-gray-400 rounded-lg font-semibold transition-all duration-200"
          >
            {isLoading ? "Verifying..." : "Verify OTP"}
          </button>
        </div>

        <div className="mt-6 text-gray-400 text-sm">
          <p>
            Didn&apos;t receive OTP?{" "}
            {resendTimer > 0 ? (
              <span className="text-gray-500">Resend in {resendTimer}s</span>
            ) : (
              <button
                onClick={handleResend}
                className="text-white font-semibold hover:underline cursor-pointer transition-colors duration-200"
              >
                Resend OTP
              </button>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OtpVerification;
