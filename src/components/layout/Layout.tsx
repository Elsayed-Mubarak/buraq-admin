"use client";

import React from "react";
import Sidebar from "@/components/layout/Sidebar";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen">
      <Sidebar />
      <main className="pl-10 min-h-screen">{children}</main>
    </div>
  );
}
