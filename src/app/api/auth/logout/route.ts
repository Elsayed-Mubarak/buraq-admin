import { NextResponse } from "next/server";
import axios, { AxiosError } from "axios";

export async function POST(): Promise<NextResponse> {
  try {
    await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/auth/logout`, // Ensure this is the correct URL
      {},
      {
        withCredentials: true, // Ensure cookies (auth_token) are sent with the request
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // Create a response object
    const nextResponse = NextResponse.json(
      { message: "Logout successful" },
      { status: 200 }
    );

    // Clear the cookies by setting them with an expiration date in the past
    nextResponse.cookies.set("auth_token", "", {
      expires: new Date(0), // Set expiration date to the past
      path: "/", // Ensure the path matches the one used when setting the cookie
    });

    // Optionally, clear other cookies if needed
    nextResponse.cookies.set("another_cookie", "", {
      expires: new Date(0),
      path: "/",
    });

    // Return the response with cleared cookies
    return nextResponse;

  } catch (error) {
    // Handle Axios errors specifically
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      return NextResponse.json(
        { message: "Logout failed", error: axiosError.message },
        { status: axiosError.response?.status || 500 }
      );
    }

    // Handle other types of errors
    return NextResponse.json({ message: "Logout failed" }, { status: 500 });
  }
}