"use client";
import React from "react";
import { Profile } from "../auth/profile";

export default function Appbar({
  image,
  name,
}: {
  image?: string;
  name: string;
}) {
  return (
    <nav className="py-2 px-6 flex justify-between items-center bg-white shadow-sm">
      <h1 className="text-xl md:text-2xl font-extrabold">Chat-App</h1>
      <div className="flex items-center space-x-2 md:space-x-6 text-gray-700">
        < Profile name={name} image={image} />
      </div>
    </nav>
  );
}