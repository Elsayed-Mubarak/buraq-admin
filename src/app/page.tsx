"use client";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { getSession, signIn } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";

const Page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  redirect("/dashboard"); // Redirect if session exists
  // Check session on component mount
  useEffect(() => {
    const checkSession = async () => {
      const session = await getSession();
      if (session) {
      }
    };
    checkSession();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const toastId = toast.loading("Logging in..."); // Show loading toast

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false, // Disable automatic redirect
      callbackUrl: "/dashboard",
    });

    if (result?.error) {
      toast.error("Login failed. Please check your credentials.", {
        id: toastId,
      }); // Show error toast
    } else {
      toast.success("Login successful!", { id: toastId }); // Show success toast
      router.push("/dashboard"); // Redirect to dashboard
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-96 p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center">
          <span className="text-gray-800">Admin</span>
          <span className="text-teal-500">Portal</span>
        </h2>

        {error && <p className="text-red-500 text-center mt-2">{error}</p>}

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