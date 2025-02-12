// components/shared/SectionTitle.tsx
"use client";
import React from "react";

interface SectionTitleProps {
  title: string;
}

export function SectionTitle({ title }: SectionTitleProps) {
  return <h4 className="font-medium">{title}</h4>;
}