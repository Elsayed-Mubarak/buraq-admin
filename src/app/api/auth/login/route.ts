import { NextResponse } from "next/server";
import axios, { AxiosError, AxiosResponse } from "axios";

// Define interfaces for request and response
interface LoginRequest {
  email: string;
  password: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  // Add other user properties as needed
}

interface LoginResponse {
  user: User | null;
  error: string | null;
}

interface BackendLoginResponse {
  user: User;
  // Add other backend-specific fields if needed
}

export async function POST(req: Request): Promise<NextResponse<LoginResponse>> {
  try {
    // Check if the backend URL is configured
    if (!process.env.NEXT_PUBLIC_BASE_URL) {
      return NextResponse.json(
        { user: null, error: "Backend URL is not configured" },
        { status: 500 }
      );
    }

    // Parse the request body
    const { email, password }: LoginRequest = await req.json();

    // Validate the request body
    if (!email || !password) {
      return NextResponse.json(
        { user: null, error: "Email and password are required" },
        { status: 400 }
      );
    }

    // Send a login request to the backend
    const response: AxiosResponse<BackendLoginResponse> = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/auth/login`,
      { email, password },
      { withCredentials: true }
    );

    // Handle successful login
    if (response.status === 200) {
      const headers = new Headers();
      if (response.headers["set-cookie"]) {
        const cookies: string[] = response.headers["set-cookie"];
        cookies.forEach((cookie) => {
          headers.append("Set-Cookie", cookie);
        });
      }
   
      return NextResponse.json(
        { user: response.data.user, error: null },
        { status: 200, headers }
      );
    }

    // Handle unexpected response status
    return NextResponse.json(
      { user: null, error: "Login failed" },
      { status: 400 }
    );
  } catch (error: unknown) {
    // Handle errors
    console.error("Error during login:", error);

    // Type guard for AxiosError
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<{ message?: string }>;
      const errorMessage =
        axiosError.response?.data?.message || "An error occurred during login";
      return NextResponse.json(
        { user: null, error: errorMessage },
        { status: axiosError.response?.status || 500 }
      );
    }

    // Handle non-Axios errors
    return NextResponse.json(
      { user: null, error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}