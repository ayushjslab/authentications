"use client";

import React, { useState, useEffect } from "react";
import {
  Github,
  ShieldCheck,
  Zap,
  Lock,
  Users,
  Code,
  ChevronRight,
} from "lucide-react";

export default function HomePage() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        ></div>
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-12">
        <div
          className={`max-w-4xl w-full text-center transition-all duration-1000 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="mb-16">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-white to-gray-300 mb-8 shadow-2xl">
              <ShieldCheck size={40} className="text-black" />
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              AyushJsLab
              <span className="block text-4xl md:text-6xl bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                Authentication System
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              A powerful backend authentication system that handles{" "}
              <span className="text-white font-semibold">all edge cases</span>,
              ensuring secure and reliable user authentication for modern
              applications.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12 max-w-3xl mx-auto">
            <div className="group bg-gray-900 bg-opacity-50 p-8 rounded-2xl border border-gray-800 hover:border-gray-600 transition-all duration-300 hover:transform hover:scale-105">
              <div className="w-12 h-12 rounded-xl bg-white bg-opacity-10 flex items-center justify-center mb-4 group-hover:bg-opacity-20 transition-all">
                <Zap size={24} className="text-black" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Fast & Reliable
              </h3>
              <p className="text-gray-400 text-sm">
                Optimized performance with robust error handling
              </p>
            </div>

            <div className="group bg-gray-900 bg-opacity-50 p-8 rounded-2xl border border-gray-800 hover:border-gray-600 transition-all duration-300 hover:transform hover:scale-105">
              <div className="w-12 h-12 rounded-xl bg-white bg-opacity-10 flex items-center justify-center mb-4 group-hover:bg-opacity-20 transition-all">
                <Lock size={24} className="text-black" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Secure</h3>
              <p className="text-gray-400 text-sm">
                Enterprise-grade security with JWT and encryption
              </p>
            </div>

            <div className="group bg-gray-900 bg-opacity-50 p-8 rounded-2xl border border-gray-800 hover:border-gray-600 transition-all duration-300 hover:transform hover:scale-105">
              <div className="w-12 h-12 rounded-xl bg-white bg-opacity-10 flex items-center justify-center mb-4 group-hover:bg-opacity-20 transition-all">
                <Code size={24} className="text-black" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Developer First
              </h3>
              <p className="text-gray-400 text-sm">
                Clean APIs with comprehensive documentation
              </p>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-8 mb-12 text-center">
            <div className="bg-black bg-opacity-30 px-6 py-4 rounded-xl border border-gray-800">
              <div className="text-2xl font-bold text-white">100%</div>
              <div className="text-sm text-gray-400">Edge Cases Covered</div>
            </div>
            <div className="bg-black bg-opacity-30 px-6 py-4 rounded-xl border border-gray-800">
              <div className="text-2xl font-bold text-white flex items-center justify-center gap-1">
                <Users size={20} />
                1K+
              </div>
              <div className="text-sm text-gray-400">Developers</div>
            </div>
            <div className="bg-black bg-opacity-30 px-6 py-4 rounded-xl border border-gray-800">
              <div className="text-2xl font-bold text-white flex items-center justify-center gap-1">
                <Github size={20} />
                Open
              </div>
              <div className="text-sm text-gray-400">Source</div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-gray-900 to-black p-8 rounded-2xl border border-gray-700 mb-8 max-w-2xl mx-auto">
            <p className="text-gray-300 mb-4 text-lg">
              Ready to implement bulletproof authentication?
            </p>
            <p className="text-gray-400 mb-6">
              Check out the complete source code on GitHub:
              <br />
              <span className="font-mono text-white">
                ayushjslab/authentications
              </span>
            </p>

            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <a
                href="https://github.com/ayushjslab/authentications"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-semibold rounded-xl shadow-lg hover:shadow-2xl hover:bg-gray-100 transition-all duration-300 hover:transform hover:scale-105"
              >
                <Github size={24} />
                <span>Get Started</span>
                <ChevronRight
                  size={20}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </a>

              <a
                href="/auth"
                className="inline-flex items-center justify-center px-8 py-4 bg-black text-white border border-gray-700 rounded-xl shadow-lg hover:bg-gray-800 hover:border-gray-500 transition-all duration-300"
              >
                <ShieldCheck size={20} className="mr-2" />
                Start Testing Authentication
              </a>
            </div>
          </div>

          <div className="text-center text-gray-500 text-sm">
            Built with ❤️ for developers who care about security
          </div>
        </div>
      </div>

      <div className="absolute top-20 left-10 w-2 h-2 bg-white opacity-20 rounded-full animate-pulse"></div>
      <div
        className="absolute top-40 right-20 w-1 h-1 bg-gray-400 opacity-30 rounded-full animate-pulse"
        style={{ animationDelay: "1s" }}
      ></div>
      <div
        className="absolute bottom-32 left-1/4 w-1 h-1 bg-white opacity-10 rounded-full animate-pulse"
        style={{ animationDelay: "2s" }}
      ></div>
    </div>
  );
}
