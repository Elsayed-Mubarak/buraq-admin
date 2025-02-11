"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { login } from "@/utils/auth";

const Page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const toastId = toast.loading("Logging in...");

    try {
      const result = await login(email, password);
      if (result?.ok) {
        toast.success("Login successful!", { id: toastId });
        router.push("/dashboard");
      } else {
        throw new Error("Login failed");
      }
    } catch {
      toast.error("Login failed. Please check your credentials.", { id: toastId });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-96 p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center">
          <span className="text-gray-800">Admin</span>
          <span className="text-teal-500">Portal</span>
        </h2>

        <form className="mt-6" onSubmit={handleSubmit}>
          <label className="block text-gray-600 text-sm font-semibold mb-1">
            EMAIL
          </label>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-400"
          />

          <label className="block mt-4 text-gray-600 text-sm font-semibold mb-1">
            PASSWORD
          </label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-400"
          />

          <button
            type="submit"
            className="w-full mt-6 bg-teal-500 text-white font-semibold py-3 rounded-full hover:bg-teal-600 transition"
          >
            Login
          </button>
        </form>

        <div className="text-center mt-4">
          <a href="#" className="text-blue-600 hover:underline font-semibold">
            Forgot Password?
          </a>
        </div>
      </div>
    </div>
  );
};

export default Page;
