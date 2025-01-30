'use client';

import React from 'react';
import Sidebar from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar />
      <main className="pl-16 min-h-screen">
        <div className="py-6">
          {children}
        </div>
      </main>
    </div>
  );
}
