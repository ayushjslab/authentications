/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";

const OtpVerification: React.FC = () => {
  const [otp, setOtp] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const [timeLeft, setTimeLeft] = useState(300);
  const [isResending, setIsResending] = useState(false);

  const handleOtpChange = (value: string) => {
    setOtp(value);
    setError("");
  };

  useEffect(() => {
    if (timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  const handleVerify = async () => {
    if (otp.length !== 6) {
      setError("Please enter all 6 digits");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const res = await axios.post("/api/reset-email-verification", { otp, email });

      if (res.data.success) {
        toast.success(res.data.message);
        window.location.href = `/auth/forgot-password/reset?email=${email}`;
      } else {
        setError(res.data.message || "Invalid OTP");
      }
    } catch (error: any) {
      setError("Verification failed. Please try again.");
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const handleResendOtp = async () => {
    if (!email) return;

    setIsResending(true);
    try {
      const res = await axios.post("/api/send-email", {
        to: email,
        subject: "Verify you email",
      });
      if (res.data.success) {
        toast.success("New OTP sent to your email");
        setTimeLeft(300);
        setOtp("");
        setError("");
      } else {
        toast.error(res.data.message || "Failed to resend OTP");
      }
    } catch {
      toast.error("Error sending OTP. Please try again.");
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4">
      <div className="bg-gray-800/30 text-white p-8 rounded-2xl shadow-2xl w-full max-w-md text-center border border-gray-700">
        <div className="mb-6">
          <h2 className="text-3xl font-bold mb-2">OTP For Reset Password</h2>
          <p className="text-gray-400">
            Enter the 6-digit OTP sent to your email
          </p>
        </div>

        <div className="space-y-6">
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

          <div className="text-gray-300 text-sm mt-2">
            {timeLeft > 0 ? (
              <>
                OTP will expire in{" "}
                <span className="font-semibold">{formatTime(timeLeft)}</span>
              </>
            ) : (
              <button
                onClick={handleResendOtp}
                disabled={isResending}
                className="mt-2 text-blue-400 hover:text-blue-300 font-semibold underline cursor-pointer"
              >
                {isResending ? "Sending OTP..." : "Resend OTP"}
              </button>
            )}
          </div>

          <button
            onClick={handleVerify}
            disabled={isLoading || otp.length !== 6}
            className="w-full py-3 bg-white text-gray-900 hover:bg-gray-200 disabled:bg-gray-600 disabled:text-gray-400 rounded-lg font-semibold transition-all duration-200"
          >
            {isLoading ? "Verifying..." : "Verify OTP"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OtpVerification;
