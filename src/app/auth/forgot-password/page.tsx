/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email");
      return;
    }
    setLoading(true);

    try {
      const res = await axios.post("/api/forgot-password", { email });
      if(res.data.success) {
        toast.success(res.data.message || "Email sent successfully!");
        window.location.href = `/auth/forgot-password/email-verification?email=${email}`;
      }

    } catch (err: any) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="bg-gray-800/30 rounded-xl p-10 w-full max-w-md shadow-2xl">
        <h1 className="text-3xl font-bold mb-6 text-center text-white">
          Reset Password
        </h1>
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-md border border-gray-400 focus:outline-none focus:ring-2 focus:ring-black placeholder-gray-200 text-white"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-black text-white rounded-md hover:bg-gray-900 transition-colors font-semibold disabled:opacity-60 flex items-center justify-center gap-2 cursor-pointer"
          >
            {loading ? "Processing..." : "Proceed"}
          </button>
        </form>
      </div>
    </div>
  );
}
