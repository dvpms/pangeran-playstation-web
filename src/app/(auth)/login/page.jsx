// src/app/(admin)/login/page.jsx
"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FaIdBadge, FaKey, FaShieldAlt } from "react-icons/fa";
import { MdOutlineSecurity } from "react-icons/md";
import { BiDialpadAlt, BiLogIn } from "react-icons/bi";
import { GoEyeClosed } from "react-icons/go";

export default function AdminLogin() {
  const router = useRouter();
  const [adminId, setAdminId] = useState("");
  const [securityPin, setSecurityPin] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Ganti dengan handler login kamu (misal NextAuth)
    const res = await signIn("credentials", {
      redirect: false,
      email: adminId,
      password: securityPin,
    });

    if (res?.error) {
      setError("ID atau PIN salah.");
      setIsLoading(false);
    } else {
      router.push("/dashboard");
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen py-5 flex flex-col justify-center items-center text-on-surface bg-surface relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-primary-fixed-dim rounded-full blur-[120px] opacity-40 -z-10"></div>
      <div className="absolute bottom-[-10%] right-[-5%] w-[50%] h-[50%] bg-primary-fixed rounded-full blur-[100px] opacity-30 -z-10"></div>
      <main className="w-full max-w-md px-6 z-10 grow flex flex-col justify-center">
        <div className="glass-card rounded-xl p-8 md:p-12 border border-outline-variant/20 relative bg-white/90 backdrop-blur-lg shadow-[0_24px_48px_-12px_rgba(0,102,138,0.08)]">
          {/* Header */}
          <div className="text-center mb-10 mt-4">
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tighter text-primary mb-2">
              PANGERAN
            </h1>
            <p className="text-lg font-semibold text-on-surface-variant tracking-wide">
              Console Admin Access
            </p>
          </div>
          {/* Error */}
          {error && (
            <div className="mb-6 p-3 bg-error-container text-on-error-container text-sm rounded-xl font-bold text-center">
              {error}
            </div>
          )}
          {/* Login Form */}
          <form className="space-y-6" onSubmit={handleSubmit} method="POST">
            <div>
              <label
                className="block text-sm font-semibold text-on-surface mb-2"
                htmlFor="admin_id"
              >
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FaIdBadge className="text-primary" />
                </div>
                <input
                  className="block w-full pl-11 pr-4 py-3.5 bg-surface-container-low border border-outline-variant/20 rounded-lg text-on-surface placeholder-outline focus:ring-0 focus:border-primary focus:bg-surface-container-lowest transition-colors"
                  id="admin_id"
                  name="admin_id"
                  placeholder="Enter credentials"
                  type="text"
                  value={adminId}
                  onChange={(e) => setAdminId(e.target.value)}
                  required
                />
              </div>
            </div>
            <div>
              <label
                className="block text-sm font-semibold text-on-surface mb-2"
                htmlFor="security_pin"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <BiDialpadAlt className="text-primary" />
                </div>
                <input
                  className="block w-full pl-11 pr-4 py-3.5 bg-surface-container-low border border-outline-variant/20 rounded-lg text-on-surface placeholder-outline focus:ring-0 focus:border-primary focus:bg-surface-container-lowest transition-colors"
                  id="security_pin"
                  name="security_pin"
                  placeholder="••••••••"
                  type="password"
                  value={securityPin}
                  onChange={(e) => setSecurityPin(e.target.value)}
                  required
                />
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center cursor-pointer">
                  <span className="material-symbols-outlined text-outline hover:text-on-surface transition-colors">
                    <GoEyeClosed />
                  </span>
                </div>
              </div>
            </div>
            <button
              className="w-full py-4 mt-8 bg-secondary-container hover:bg-[#ebd06b] text-on-secondary-container font-bold text-base rounded-full tracking-wide transition-all duration-300 shadow-sm active:scale-[0.98] flex justify-center items-center gap-2"
              type="submit"
              disabled={isLoading}
            >
              <BiLogIn />
              {isLoading ? "Memverifikasi..." : "Login"}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
